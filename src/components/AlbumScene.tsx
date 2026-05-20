"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ALBUM } from "@/content/album";

type Phase = "idle" | "opening" | "revealed" | "playing";
type Side  = "A" | "B";

// Approximate visual position of the record center after the case opens (viewport %)
const REC_CX     = 53;
const REC_CY     = 50;
const REC_RADIUS = 17; // viewport %

// Approximate viewport aspect ratio used to de-stretch y when computing fan angles
const APPROX_ASPECT = 16 / 9;

// All labels on the right — case swings left after opening
const A_POSITIONS: [number, number][] = [
  [78, 12],  // 0  Looking Glass
  [81, 23],  // 1  See Tracks Think Train
  [83, 34],  // 2  Song For The Trees
  [83, 45],  // 3  Phone Call / Voicemail
  [82, 56],  // 4  Graduation Song
  [80, 67],  // 5  Losing Meaning
  [77, 78],  // 6  Nonexistent Interlude
];

const B_POSITIONS: [number, number][] = [
  [79, 22],  // 0  Homeswitcher
  [82, 38],  // 1  Graduation Song (Disuko)
  [81, 54],  // 2  Glowing Screens
  [79, 70],  // 3  Moving Out
];

// Groove radii as fraction of REC_RADIUS — outer track first, innermost last
const A_RADII = [0.92, 0.80, 0.69, 0.58, 0.48, 0.39, 0.36];
const B_RADII = [0.88, 0.72, 0.57, 0.43];

// Fan from the groove edge at the angle pointing toward each label.
// De-stretch y by APPROX_ASPECT so the angle is computed in pixel space.
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

  const [phase,       setPhase]       = useState<Phase>("idle");
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [side,        setSide]        = useState<Side>("A");

  const phaseRef       = useRef<Phase>("idle");
  const activeTrackRef = useRef<number | null>(null);
  const sideRef        = useRef<Side>("A");
  const flipRef        = useRef({ current: 0, target: 0 });

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
      const [THREE, { GLTFLoader }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
      ]);
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

      const onPointerDown = (e: PointerEvent) => { ptrDownX = e.clientX; ptrDownY = e.clientY; };

      const onPointerUp = (e: PointerEvent) => {
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
      canvas.addEventListener("pointerup",   onPointerUp);

      // ── Resize ────────────────────────────────────────────────────────────
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
          recordPivot.rotation.y += delta * Math.PI * 0.8;
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

  const isOpen    = phase === "revealed" || phase === "playing";
  const tracks    = side === "A" ? ALBUM.tracks : ALBUM.bonusTracks;
  const positions = side === "A" ? A_POSITIONS : B_POSITIONS;

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
        style={{ cursor: phase === "idle" ? "pointer" : "default" }}
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

      {/* ── SVG lines ────────────────────────────────────────────────── */}
      {isOpen && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
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
            const [lx, ly] = positions[i];
            const [sx, sy] = lineStart(i, side, lx, ly);
            const isActive = activeTrack === i;
            const ex = lx - 5;
            const ey = ly;
            return (
              <line
                key={`${side}-${i}`}
                x1={`${sx}%`} y1={`${sy}%`}
                x2={`${ex}%`} y2={`${ey}%`}
                stroke={isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)"}
                strokeWidth={isActive ? 3 : 1.5}
                strokeLinecap="round"
                filter={isActive ? "url(#line-glow)" : undefined}
                pathLength="1"
                style={{
                  strokeDasharray:  1,
                  strokeDashoffset: 0,
                  animation: `draw-line 0.55s cubic-bezier(.4,0,.2,1) ${i * 0.07}s both`,
                }}
              />
            );
          })}
        </svg>
      )}

      {/* ── Song labels ──────────────────────────────────────────────── */}
      {isOpen &&
        tracks.map((t, i) => {
          const [lx, ly] = positions[i];
          const isActive = activeTrack === i;

          return (
            /* Zero-height anchor at (lx%, ly%) — content stacks upward from here */
            <div
              key={`${side}-${t.title}`}
              style={{
                position:  "absolute",
                left:      `${lx}%`,
                top:       `${ly}%`,
                height:    0,
                animation: `fade-up 0.4s ease-out ${i * 0.07 + 0.35}s both`,
              }}
            >
              {/* Stack grows upward: description → artists → title (bottom) */}
              <div
                style={{
                  position:  "absolute",
                  bottom:    0,
                  right:     0,
                  transform: "translateX(calc(-100% - 40px))",
                  width:     "200px",
                  textAlign: "right",
                }}
              >
                {/* Description — fixed-width, independent of title */}
                {isActive && t.description && (
                  <div
                    style={{
                      fontSize:   "11px",
                      lineHeight: "1.6",
                      color:      "rgba(0,0,0,0.42)",
                      animation:  "fade-up 0.3s ease-out both",
                      marginBottom: "3px",
                    }}
                  >
                    {t.description}
                  </div>
                )}

                {/* Artists — above title */}
                {t.artists && t.artists.length > 0 && (
                  <div
                    style={{
                      fontSize:      "11px",
                      letterSpacing: "0.04em",
                      color:         isActive ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
                      transition:    "color 0.15s",
                      marginBottom:  "2px",
                    }}
                  >
                    {t.artists.join(", ")}
                  </div>
                )}

                {/* Title — bottommost, always anchored at ly% */}
                <button
                  onClick={() => handleSongClick(i)}
                  className="focus:outline-none"
                  style={{ display: "block", width: "100%", textAlign: "right" }}
                >
                  <span
                    style={{
                      display:    "block",
                      fontSize:   "14px",
                      fontWeight: 600,
                      lineHeight: "1.2",
                      color:      isActive ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.55)",
                      transition: "color 0.15s",
                    }}
                  >
                    {t.title}
                  </span>
                </button>
              </div>
            </div>
          );
        })}

      {/* ── Flip button — fixed at bottom center ─────────────────────── */}
      {isOpen && (
        <button
          onClick={handleFlip}
          className="absolute left-1/2 text-[10px] tracking-widest uppercase transition-colors duration-200 hover:text-black/60"
          style={{
            bottom:    "28px",
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
