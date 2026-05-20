"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ALBUM } from "@/content/album";

type Phase = "idle" | "opening" | "revealed" | "playing";
type Side  = "A" | "B";

// Fixed label-rail x-positions (viewport %) — empirically correct for desktop.
// Mobile uses a pill list instead, so these only apply at md+ breakpoints.
const RAIL_A = 79;
const RAIL_B = 77;

// Y-positions per track (viewport %)
const A_Y: number[] = [12, 23, 34, 45, 56, 67, 78];
const B_Y: number[] = [22, 38, 54, 70];

// Visual centre and radius of the record on a desktop viewport (viewport %)
const REC_CX     = 53;
const REC_CY     = 50;
const REC_RADIUS = 17;

// Viewport aspect ratio used to de-stretch y when computing fan angles
const APPROX_ASPECT = 16 / 9;

// Groove radii as fraction of REC_RADIUS — outer track first.
// Pushed close to 1.0 so lines appear to touch the record's visual edge.
const A_RADII = [0.97, 0.90, 0.81, 0.72, 0.63, 0.52, 0.43];
const B_RADII = [0.96, 0.83, 0.68, 0.53];

/**
 * Compute where a line should leave the groove edge.
 * All coords are in viewport-%; APPROX_ASPECT de-stretches y so the angle is
 * computed in pixel space rather than %-space.
 */
function lineStart(idx: number, side: Side, labelX: number, labelY: number): [number, number] {
  const radii = side === "A" ? A_RADII : B_RADII;
  const r     = (radii[idx] ?? 0.5) * REC_RADIUS;
  const dx    = labelX - REC_CX;
  const dy    = (labelY - REC_CY) / APPROX_ASPECT;
  const len   = Math.sqrt(dx * dx + dy * dy) || 1;
  return [
    REC_CX + r * (dx / len),
    REC_CY + r * (dy / len) * APPROX_ASPECT,
  ];
}

export default function AlbumScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const audioRef     = useRef<HTMLAudioElement>(null);

  const [phase,        setPhase]        = useState<Phase>("idle");
  const [activeTrack,  setActiveTrack]  = useState<number | null>(null);
  const [side,         setSide]         = useState<Side>("A");
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);

  const phaseRef       = useRef<Phase>("idle");
  const activeTrackRef = useRef<number | null>(null);
  const sideRef        = useRef<Side>("A");
  const flipRef        = useRef({ current: 0, target: 0 });
  // Scratch state — tracks whether the user is dragging the spinning record
  const scratchRef     = useRef({ active: false, lastX: 0, velocity: 0 });

  const commitPhase = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const commitSide = useCallback((s: Side) => {
    sideRef.current = s;
    setSide(s);
  }, []);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let disposed = false;
    let frame    = 0;
    let cleanup: (() => void) | undefined;

    (async () => {
      if (disposed) return;

      // ── Renderer ──────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      // ── Scene & camera ────────────────────────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 100);
      camera.position.set(0, 0, 5);

      const resize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      // ── Lights ────────────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 1.4));
      const key = new THREE.DirectionalLight(0xffffff, 2.8);
      key.position.set(2, 4, 3);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.7);
      fill.position.set(-3, 1, -2);
      scene.add(fill);

      // ── Model group ───────────────────────────────────────────────────────
      const modelGroup = new THREE.Group();
      scene.add(modelGroup);
      modelGroup.rotation.x =  0;
      modelGroup.rotation.y = -Math.PI / 2;
      modelGroup.rotation.z = -Math.PI / 2;

      // ── Load GLBs ─────────────────────────────────────────────────────────
      const loader = new GLTFLoader();
      const MODEL_PATHS = [
        "/album/model/Parts/record.glb",
        `/album/model/Parts/recordCase.glb?v=${Date.now()}`,
        "/album/model/Parts/recordBag.glb",
      ];

      type GLTF = { scene: THREE.Object3D; animations: THREE.AnimationClip[] };
      const gltfs: GLTF[] = await Promise.all(
        MODEL_PATHS.map(
          (path) =>
            new Promise<GLTF>((resolve) =>
              loader.load(path, resolve as (g: unknown) => void)
            )
        )
      );
      if (disposed) return;

      const mixers:         THREE.AnimationMixer[]  = [];
      const openingActions: THREE.AnimationAction[] = [];
      let   finishedCount = 0;
      let   totalActions  = 0;
      const allObjects: THREE.Object3D[] = [];
      let   recordPivot: THREE.Group | null = null;

      gltfs.forEach((gltf) => {
        modelGroup.add(gltf.scene);
        allObjects.push(gltf.scene);

        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.loop              = THREE.LoopOnce;
            action.clampWhenFinished = true;
            openingActions.push(action);
            totalActions++;
          });
          mixer.addEventListener("finished", () => {
            finishedCount++;
            if (finishedCount >= totalActions && phaseRef.current === "opening") {
              commitPhase("revealed");
            }
          });
          mixers.push(mixer);
        }
      });

      // Make record double-sided so the B-side flip shows geometry
      gltfs[0].scene.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => { m.side = THREE.DoubleSide; });
      });

      // ── Centre the assembled model at the origin ───────────────────────────
      const box    = new THREE.Box3().setFromObject(modelGroup);
      const centre = box.getCenter(new THREE.Vector3());
      modelGroup.position.sub(centre);

      // ── Build a pivot group centred on the record's bounding box ───────────
      modelGroup.updateWorldMatrix(true, true);
      const recWorldBox    = new THREE.Box3().setFromObject(gltfs[0].scene);
      const recWorldCenter = recWorldBox.getCenter(new THREE.Vector3());
      const recLocalCenter = modelGroup.worldToLocal(recWorldCenter.clone());

      recordPivot = new THREE.Group();
      recordPivot.position.copy(recLocalCenter);
      modelGroup.add(recordPivot);

      modelGroup.remove(gltfs[0].scene);
      gltfs[0].scene.position.sub(recLocalCenter);
      recordPivot.add(gltfs[0].scene);

      // ── Raycasting ────────────────────────────────────────────────────────
      const raycaster = new THREE.Raycaster();
      const ptrNDC    = new THREE.Vector2();
      let   ptrDownX  = 0;
      let   ptrDownY  = 0;

      const collectMeshes = (): THREE.Object3D[] => {
        const out: THREE.Object3D[] = [];
        allObjects.forEach((obj) =>
          obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) out.push(child);
          })
        );
        return out;
      };

      const onPointerDown = (e: PointerEvent) => {
        ptrDownX = e.clientX;
        ptrDownY = e.clientY;

        // Any click while playing activates scratch — capture pointer so
        // moves outside the canvas boundary still fire on this element
        if (phaseRef.current === "playing") {
          scratchRef.current = { active: true, lastX: e.clientX, velocity: 0 };
          canvas.setPointerCapture(e.pointerId);
          canvas.style.cursor = "grabbing";
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!scratchRef.current.active) return;
        const dx = e.clientX - scratchRef.current.lastX;
        scratchRef.current.lastX    = e.clientX;
        scratchRef.current.velocity = dx;

        // Rotate record in the drag direction
        if (recordPivot) {
          recordPivot.rotation.y += dx * 0.05;
        }

        // Map drag velocity to playback rate.
        // ±25 px/event ≈ ±1× speed change; clamped 0.1–3.0
        const audio = audioRef.current;
        if (audio) {
          audio.playbackRate = Math.max(0.1, Math.min(3.0, 1 + dx / 25));
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        // End scratch mode — release pointer capture and restore grab cursor
        if (scratchRef.current.active) {
          scratchRef.current.active = false;
          canvas.releasePointerCapture(e.pointerId);
          canvas.style.cursor = "grab";
          // playbackRate decays back to 1× in the tick loop
        }

        // Open-case click — only when idle and not a drag
        if (phaseRef.current !== "idle") return;
        const dx = e.clientX - ptrDownX;
        const dy = e.clientY - ptrDownY;
        if (Math.sqrt(dx * dx + dy * dy) > 8) return;

        const rect = canvas.getBoundingClientRect();
        ptrNDC.set(
          ((e.clientX - rect.left) / rect.width)  *  2 - 1,
          ((e.clientY - rect.top)  / rect.height) * -2 + 1
        );
        raycaster.setFromCamera(ptrNDC, camera);

        if (raycaster.intersectObjects(collectMeshes()).length > 0) {
          commitPhase("opening");
          if (openingActions.length === 0) {
            setTimeout(() => commitPhase("revealed"), 500);
          } else {
            openingActions.forEach((a) => a.play());
          }
        }
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup",   onPointerUp);

      // ── Resize (called once here; also wired to ResizeObserver below) ──────
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      // ── Render loop ───────────────────────────────────────────────────────
      const clock = new THREE.Clock();

      const tick = () => {
        if (disposed) return;
        frame = requestAnimationFrame(tick);
        const delta = clock.getDelta();

        mixers.forEach((m) => m.update(delta));

        if (phaseRef.current === "playing" && recordPivot) {
          if (!scratchRef.current.active) {
            recordPivot.rotation.y += delta * Math.PI * 0.8;
          }
        }

        // Smoothly restore playback rate to 1× after scratch ends
        const tickAudio = audioRef.current;
        if (tickAudio && !scratchRef.current.active && Math.abs(tickAudio.playbackRate - 1) > 0.01) {
          tickAudio.playbackRate += (1 - tickAudio.playbackRate) * Math.min(delta * 6, 0.3);
          if (Math.abs(tickAudio.playbackRate - 1) < 0.01) tickAudio.playbackRate = 1;
        }

        if (recordPivot) {
          const fp = flipRef.current;
          const diff = fp.target - fp.current;
          if (Math.abs(diff) > 0.001) {
            fp.current += diff * Math.min(delta * 4, 0.2);
            recordPivot.rotation.z = fp.current;
          }
        }

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        ro.disconnect();
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup",   onPointerUp);
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, [commitPhase]);

  // ── Song click ─────────────────────────────────────────────────────────────
  const handleSongClick = useCallback(
    (idx: number) => {
      const audio = audioRef.current;

      if (phaseRef.current === "playing" && activeTrackRef.current === idx) {
        audio?.pause();
        activeTrackRef.current = null;
        setActiveTrack(null);
        commitPhase("revealed");
        return;
      }

      activeTrackRef.current = idx;
      setActiveTrack(idx);
      commitPhase("playing");

      const tracks = sideRef.current === "A" ? ALBUM.tracks : ALBUM.bonusTracks;
      const track  = tracks[idx];
      if (audio) {
        audio.pause();
        if (track.src) {
          audio.src = track.src;
          audio.load();
          audio.play().catch(() => {});
        } else {
          audio.src = "";
        }
      }
    },
    [commitPhase]
  );

  // ── Auto-advance to next track when the current one ends ──────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const idx = activeTrackRef.current;
      if (idx === null) return;
      const list = sideRef.current === "A" ? ALBUM.tracks : ALBUM.bonusTracks;
      const nextIdx = (idx + 1) % list.length;
      handleSongClick(nextIdx);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [handleSongClick]);

  // ── Flip ───────────────────────────────────────────────────────────────────
  const handleFlip = useCallback(() => {
    const next: Side = sideRef.current === "A" ? "B" : "A";
    flipRef.current.target = next === "B" ? Math.PI : 0;
    commitSide(next);
    audioRef.current?.pause();
    activeTrackRef.current = null;
    setActiveTrack(null);
    if (phaseRef.current === "playing") commitPhase("revealed");
  }, [commitPhase, commitSide]);

  const isOpen  = phase === "revealed" || phase === "playing";
  const tracks  = side === "A" ? ALBUM.tracks : ALBUM.bonusTracks;
  const yCoords = side === "A" ? A_Y : B_Y;
  const rail    = side === "A" ? RAIL_A : RAIL_B;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100dvh - 56px)" }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />

      {/* ── Canvas ────────────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: phase === "idle" ? "pointer" : phase === "playing" ? "grab" : "default" }}
      />

      {/* ── Hints ────────────────────────────────────────────────────── */}
      {phase === "idle" && (
        <p
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase select-none pointer-events-none"
          style={{ color: "rgba(0,0,0,0.35)", animation: "hint-pulse 2.4s ease-in-out infinite" }}
        >
          click to open
        </p>
      )}
      {phase === "opening" && (
        <p
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase select-none pointer-events-none"
          style={{ color: "rgba(0,0,0,0.25)" }}
        >
          opening…
        </p>
      )}

      {/* ── SVG lines — desktop only ──────────────────────────────────── */}
      {isOpen && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="line-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {tracks.map((_, i) => {
            const ly       = yCoords[i];
            const [sx, sy] = lineStart(i, side, rail, ly);
            const isActive  = activeTrack === i;
            const isHovered = hoveredTrack === i && !isActive;
            return (
              <line
                key={`${side}-${i}`}
                x1={`${sx}%`}         y1={`${sy}%`}
                x2={`${rail - 1.2}%`} y2={`${ly}%`}
                stroke={
                  isActive  ? "rgba(255,255,255,0.95)" :
                  isHovered ? "rgba(255,255,255,0.85)" :
                              "rgba(255,255,255,0.45)"
                }
                strokeWidth={isActive ? 3 : isHovered ? 2 : 1.5}
                strokeLinecap="round"
                filter={isActive || isHovered ? "url(#line-glow)" : undefined}
                pathLength="1"
                style={{
                  strokeDasharray:  1,
                  strokeDashoffset: 0,
                  transition:       "stroke 0.15s, stroke-width 0.15s",
                  animation: `draw-line 0.55s cubic-bezier(.4,0,.2,1) ${i * 0.07}s both`,
                }}
              />
            );
          })}
        </svg>
      )}

      {/* ── Song labels — desktop only ────────────────────────────────── */}
      {isOpen && (
        <div className="hidden md:block">
          {tracks.map((t, i) => {
            const ly       = yCoords[i];
            const isActive = activeTrack === i;
            return (
              <div
                key={`${side}-${t.title}`}
                style={{
                  position:    "absolute",
                  left:        `${rail}%`,
                  top:         `${ly}%`,
                  transform:   "translateY(-50%)",
                  paddingLeft: "10px",
                  animation:   `fade-up 0.4s ease-out ${i * 0.07 + 0.35}s both`,
                }}
              >
                <button
                  onClick={() => handleSongClick(i)}
                  onMouseEnter={() => setHoveredTrack(i)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  className="focus:outline-none block"
                  style={{ textAlign: "left" }}
                >
                  <span
                    style={{
                      display:    "block",
                      fontSize:   "13px",
                      fontWeight: 600,
                      lineHeight: "1.25",
                      color:
                        isActive          ? "rgba(0,0,0,0.9)"  :
                        hoveredTrack === i ? "rgba(0,0,0,0.85)" :
                                            "rgba(0,0,0,0.45)",
                      transition: "color 0.15s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.title}
                  </span>
                </button>

                {t.artists && t.artists.length > 0 && (
                  <div
                    style={{
                      fontSize:      "10px",
                      letterSpacing: "0.05em",
                      color:         isActive ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.28)",
                      transition:    "color 0.15s",
                      marginTop:     "1px",
                      whiteSpace:    "nowrap",
                    }}
                  >
                    {t.artists.join(", ")}
                  </div>
                )}

                {isActive && t.description && (
                  <div
                    style={{
                      fontSize:   "12px",
                      lineHeight: "1.6",
                      color:      "rgba(0,0,0,0.45)",
                      animation:  "fade-up 0.3s ease-out both",
                      marginTop:  "5px",
                      maxWidth:   "200px",
                    }}
                  >
                    {t.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Mobile track list — small screens only ────────────────────── */}
      {isOpen && (
        <div className="md:hidden absolute bottom-4 left-0 right-0 flex flex-col items-center gap-3">
          {/* Horizontal scrolling pill strip */}
          <div
            className="w-full flex gap-2 overflow-x-auto px-4 pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tracks.map((t, i) => {
              const isActive = activeTrack === i;
              return (
                <button
                  key={`mob-${side}-${i}`}
                  onClick={() => handleSongClick(i)}
                  className="flex-none rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors"
                  style={{
                    background:          isActive ? "rgba(0,0,0,0.78)" : "rgba(255,255,255,0.72)",
                    color:               isActive ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.6)",
                    border:              isActive ? "none" : "1px solid rgba(0,0,0,0.12)",
                    backdropFilter:      "blur(8px)",
                    WebkitBackdropFilter:"blur(8px)",
                  }}
                >
                  {t.title}
                </button>
              );
            })}
          </div>

          {/* Active track description */}
          {activeTrack !== null && tracks[activeTrack]?.description && (
            <p
              className="px-6 text-xs leading-relaxed text-center"
              style={{ color: "rgba(0,0,0,0.45)", animation: "fade-up 0.3s ease-out both" }}
            >
              {tracks[activeTrack].description}
            </p>
          )}

          {/* Flip button (mobile) */}
          <button
            onClick={handleFlip}
            className="text-[10px] tracking-widest uppercase transition-colors duration-200"
            style={{ color: "rgba(0,0,0,0.32)" }}
          >
            {side === "A" ? "↓ B-Side" : "↑ A-Side"}
          </button>
        </div>
      )}

      {/* ── Flip button — desktop only ────────────────────────────────── */}
      {isOpen && (
        <button
          onClick={handleFlip}
          className="hidden md:block absolute left-1/2 text-[10px] tracking-widest uppercase transition-colors duration-200 hover:text-black/60"
          style={{
            bottom:    "48px",
            transform: "translateX(-50%)",
            color:     "rgba(0,0,0,0.32)",
            animation: "fade-up 0.4s ease-out 0.6s both",
          }}
        >
          {side === "A" ? "↓ B-Side" : "↑ A-Side"}
        </button>
      )}
    </div>
  );
}
