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

// Scratch physics constants — must stay in sync with the tick-loop spin rate
const NORMAL_SPIN     = Math.PI * 0.8; // rad/s: the record's autonomous spin speed
const DRAG_TO_RAD     = 0.05;          // px → rad conversion (visual only)
const SCRATCH_1X_PX_S = 280;          // cursor px/s that equals 1× playback rate

// Build a reversed copy of an AudioBuffer for backward scratch playback
function reverseBuffer(ctx: AudioContext, buf: AudioBuffer): AudioBuffer {
  const out = ctx.createBuffer(buf.numberOfChannels, buf.length, buf.sampleRate);
  for (let c = 0; c < buf.numberOfChannels; c++) {
    const src = buf.getChannelData(c);
    const dst = out.getChannelData(c);
    for (let n = 0; n < buf.length; n++) dst[n] = src[buf.length - 1 - n];
  }
  return out;
}

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
  // Scratch state — visual (angularVel) and audio (audioRate) tracked independently
  const scratchRef = useRef({
    active:        false,
    lastX:         0,
    lastTimestamp: 0,
    angularVel:    NORMAL_SPIN, // rad/s — drives visual spin + inertia
    audioRate:     1.0,         // audio-time / real-time ratio (+ = fwd, - = back)
  });

  // Web Audio scratch engine — buffers loaded in background when a track starts
  const audioCtxRef    = useRef<AudioContext | null>(null);
  const fwdBufRef      = useRef<AudioBuffer | null>(null);
  const revBufRef      = useRef<AudioBuffer | null>(null);
  const scratchSrcRef  = useRef<AudioBufferSourceNode | null>(null);
  const scratchGainRef = useRef<GainNode | null>(null);
  const scratchPosRef  = useRef(0);         // playhead in audio-seconds
  const scratchDirRef  = useRef<1 | -1>(1); // direction of current source node
  const loadedForRef   = useRef("");         // URL whose buffer is in fwdBufRef/revBufRef

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
      const bagActions      = new Set<THREE.AnimationAction>();
      let   finishedCount = 0;
      let   totalActions  = 0;
      const allObjects: THREE.Object3D[] = [];
      let   recordPivot: THREE.Group | null = null;

      gltfs.forEach((gltf, gltfIdx) => {
        modelGroup.add(gltf.scene);
        allObjects.push(gltf.scene);

        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.loop              = THREE.LoopOnce;
            action.clampWhenFinished = true;
            openingActions.push(action);
            if (gltfIdx === 2) bagActions.add(action); // index 2 = recordBag.glb
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

      // Only the record geometry — used to gate scratch so UI buttons still work
      const collectRecordMeshes = (): THREE.Object3D[] => {
        const out: THREE.Object3D[] = [];
        recordPivot?.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) out.push(child);
        });
        return out;
      };

      // ── Web Audio scratch helpers ─────────────────────────────────────────
      const stopScratchSrc = () => {
        const s = scratchSrcRef.current;
        if (s) { try { s.stop(0); } catch {} s.disconnect(); scratchSrcRef.current = null; }
      };

      // Start an AudioBufferSourceNode at |pos| seconds in the original audio.
      // dir=1 plays forward, dir=-1 plays backward (reversed buffer).
      const playScratchFrom = (pos: number, dir: 1 | -1, rate: number) => {
        const ctx  = audioCtxRef.current;
        const fwd  = fwdBufRef.current;
        const rev  = revBufRef.current;
        const gain = scratchGainRef.current;
        if (!ctx || !fwd || !rev || !gain) return;
        if (ctx.state === "suspended") ctx.resume();
        stopScratchSrc();
        const buf    = dir === 1 ? fwd : rev;
        const offset = dir === 1 ? pos : Math.max(0, fwd.duration - pos);
        const src    = ctx.createBufferSource();
        src.buffer   = buf;
        src.playbackRate.value = Math.max(0.01, rate);
        src.connect(gain);
        src.start(0, Math.min(buf.duration - 0.001, Math.max(0, offset)));
        scratchSrcRef.current = src;
        scratchDirRef.current = dir;
      };

      const onPointerDown = (e: PointerEvent) => {
        ptrDownX = e.clientX;
        ptrDownY = e.clientY;

        if (phaseRef.current === "playing" && e.pointerType !== "touch") {
          // Touch input is excluded — mobile uses the pill list; scratch doesn't
          // translate well to touch and conflicts with scrolling gestures.
          // Only activate scratch when the pointer is actually over the record —
          // this prevents pointer capture from swallowing clicks on UI buttons.
          const rect = canvas.getBoundingClientRect();
          ptrNDC.set(
            ((e.clientX - rect.left) / rect.width)  *  2 - 1,
            ((e.clientY - rect.top)  / rect.height) * -2 + 1,
          );
          raycaster.setFromCamera(ptrNDC, camera);
          if (raycaster.intersectObjects(collectRecordMeshes()).length === 0) return;

          // Confirmed hit on the record — take over playback
          scratchPosRef.current            = audioRef.current?.currentTime ?? 0;
          audioRef.current?.pause();
          scratchRef.current.active        = true;
          scratchRef.current.lastX         = e.clientX;
          scratchRef.current.lastTimestamp = performance.now();
          scratchRef.current.angularVel    = 0;
          scratchRef.current.audioRate     = 0;
          canvas.setPointerCapture(e.pointerId);
          canvas.style.cursor = "grabbing";
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!scratchRef.current.active || !recordPivot) return;

        const now = performance.now();
        const dt  = (now - scratchRef.current.lastTimestamp) / 1000;
        const dx  = e.clientX - scratchRef.current.lastX;

        if (dt > 0 && dt < 0.1) {
          // Visual angular velocity (rad/s) — used for inertia after release
          const rawAngVel = (dx * DRAG_TO_RAD) / dt;
          scratchRef.current.angularVel =
            scratchRef.current.angularVel * 0.5 + rawAngVel * 0.5;

          // Audio rate — calibrated independently from visual rotation
          const rawRate = dx / (dt * SCRATCH_1X_PX_S);
          scratchRef.current.audioRate =
            scratchRef.current.audioRate * 0.5 + rawRate * 0.5;

          // Advance tracked playhead
          scratchPosRef.current = Math.max(
            0,
            scratchPosRef.current + scratchRef.current.audioRate * dt,
          );
        }

        scratchRef.current.lastX         = e.clientX;
        scratchRef.current.lastTimestamp = now;

        // Visual: record follows cursor directly
        recordPivot.rotation.y += dx * DRAG_TO_RAD;

        // Audio
        const rate    = scratchRef.current.audioRate;
        const absRate = Math.abs(rate);
        const newDir: 1 | -1 = rate >= 0 ? 1 : -1;

        if (audioCtxRef.current && fwdBufRef.current) {
          // Web Audio path — real forward AND backward playback
          if (!scratchSrcRef.current || newDir !== scratchDirRef.current) {
            playScratchFrom(scratchPosRef.current, newDir, absRate);
          } else {
            scratchSrcRef.current.playbackRate.value = Math.max(0.01, absRate);
          }
          // Mute when near-stopped (record held still)
          const gain = scratchGainRef.current;
          if (gain) {
            gain.gain.setTargetAtTime(
              absRate < 0.06 ? 0 : 1,
              audioCtxRef.current.currentTime,
              0.025,
            );
          }
        } else {
          // Fallback: HTMLAudio rate-change (forward only, no reverse)
          const audio = audioRef.current;
          if (audio) {
            if (audio.paused && rate > 0.06) audio.play().catch(() => {});
            audio.playbackRate = Math.max(0.05, Math.min(3, absRate));
          }
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        if (scratchRef.current.active) {
          scratchRef.current.active = false;
          stopScratchSrc();

          // Hand playhead back to HTMLAudio and let tick loop ramp rate to 1×
          const audio = audioRef.current;
          if (audio && phaseRef.current === "playing") {
            const dur = audio.duration;
            const pos = isFinite(dur)
              ? Math.min(scratchPosRef.current, dur - 0.05)
              : scratchPosRef.current;
            audio.currentTime = Math.max(0, pos);
            audio.play().catch(() => {});
            // audioRate is intentionally retained — tick loop inertia returns it to 1×
          }

          canvas.releasePointerCapture(e.pointerId);
          canvas.style.cursor = "grab";
        }

        // Open-case click — only when idle and not a drag
        if (phaseRef.current !== "idle") return;
        const dx = e.clientX - ptrDownX;
        const dy = e.clientY - ptrDownY;
        if (Math.sqrt(dx * dx + dy * dy) > 8) return;

        // Any non-drag click on the canvas opens the album when idle
        commitPhase("opening");
        if (openingActions.length === 0) {
          setTimeout(() => commitPhase("revealed"), 500);
        } else {
          openingActions.forEach((a) => {
            a.timeScale = 1;
            a.play();
          });
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
            // Visual inertia: angularVel returns to NORMAL_SPIN (motor re-engaging)
            const vDiff = NORMAL_SPIN - scratchRef.current.angularVel;
            if (Math.abs(vDiff) > 0.001) {
              scratchRef.current.angularVel += vDiff * Math.min(delta * 4.5, 0.28);
            } else {
              scratchRef.current.angularVel = NORMAL_SPIN;
            }
            recordPivot.rotation.y += scratchRef.current.angularVel * delta;

            // Audio inertia: audioRate returns to 1× after scratch
            const aDiff = 1 - scratchRef.current.audioRate;
            if (Math.abs(aDiff) > 0.01) {
              scratchRef.current.audioRate += aDiff * Math.min(delta * 4.5, 0.28);
            } else {
              scratchRef.current.audioRate = 1;
            }
            const tickAudio = audioRef.current;
            if (tickAudio && !tickAudio.paused) {
              // audioRate may still be negative coming out of a backward scratch;
              // clamp to 0.1 floor so HTMLAudio doesn't receive an invalid rate
              const r = scratchRef.current.audioRate;
              tickAudio.playbackRate = r >= 0.99 && r <= 1.01 ? 1 : Math.max(0.1, Math.min(2, r));
            }
          }
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
        stopScratchSrc();
        audioCtxRef.current?.close().catch(() => {});
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, [commitPhase]);

  // ── Background-load a track's audio into Web Audio buffers for scratch ──────
  const loadScratchBuffer = useCallback(async (src: string) => {
    if (loadedForRef.current === src) return;
    loadedForRef.current = src;
    fwdBufRef.current = null;
    revBufRef.current = null;
    try {
      // AudioContext must be created synchronously within a user-gesture call stack
      if (!audioCtxRef.current) {
        const ctx  = new AudioContext();
        const gain = ctx.createGain();
        gain.connect(ctx.destination);
        audioCtxRef.current = ctx;
        scratchGainRef.current = gain;
      }
      const ctx = audioCtxRef.current;
      const res = await fetch(src);
      if (loadedForRef.current !== src) return; // track changed while fetching
      const ab  = await res.arrayBuffer();
      if (loadedForRef.current !== src) return;
      const buf = await ctx.decodeAudioData(ab);
      fwdBufRef.current = buf;
      revBufRef.current = reverseBuffer(ctx, buf);
    } catch { /* non-fatal: scratch falls back to HTMLAudio rate-change only */ }
  }, []);

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
          loadScratchBuffer(track.src); // background-decode for Web Audio scratch
        } else {
          audio.src = "";
        }
      }
    },
    [commitPhase, loadScratchBuffer]
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

  // ── Auto-advance to next track when the current one ends ──────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const idx = activeTrackRef.current;
      if (idx === null) return;
      const list = sideRef.current === "A" ? ALBUM.tracks : ALBUM.bonusTracks;

      if (idx === list.length - 1) {
        // End of a side — flip to the other side and start its first track
        handleFlip();
        setTimeout(() => handleSongClick(0), 400); // wait for flip animation
      } else {
        handleSongClick(idx + 1);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [handleSongClick, handleFlip]);

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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm tracking-widest uppercase select-none pointer-events-none"
          style={{ color: "rgba(0,0,0,0.40)", animation: "hint-pulse 2.4s ease-in-out infinite" }}
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
                      fontSize:   "15px",
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
                      fontSize:      "12px",
                      letterSpacing: "0.05em",
                      color:         isActive ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.28)",
                      transition:    "color 0.15s",
                      marginTop:     "2px",
                      whiteSpace:    "nowrap",
                    }}
                  >
                    {t.artists.join(", ")}
                  </div>
                )}

                {isActive && t.description && (
                  <div
                    style={{
                      fontSize:   "13px",
                      lineHeight: "1.6",
                      color:      "rgba(0,0,0,0.45)",
                      animation:  "fade-up 0.3s ease-out both",
                      marginTop:  "5px",
                      maxWidth:   "220px",
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
            className="text-[10px] tracking-widest uppercase transition-colors duration-200 text-black/30 hover:text-black/70"
          >
            {side === "A" ? "↓ B-Side" : "↑ A-Side"}
          </button>
        </div>
      )}

      {/* ── Flip button — desktop only ────────────────────────────────── */}
      {isOpen && (
        <button
          onClick={handleFlip}
          className="hidden md:block absolute left-1/2 text-xs tracking-widest uppercase transition-all duration-200 text-black/30 hover:text-black/75 hover:tracking-[0.32em]"
          style={{
            bottom:    "48px",
            transform: "translateX(-50%)",
            animation: "fade-up 0.4s ease-out 0.6s both",
          }}
        >
          {side === "A" ? "↓ B-Side" : "↑ A-Side"}
        </button>
      )}
    </div>
  );
}
