"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ModelViewer from "@/components/ModelViewer";
import { ALBUM, type AlbumTrack } from "@/content/album";

type Phase = "idle" | "animating" | "revealed" | "playing";

function TrackItem({
  track,
  number,
  isActive,
  delay,
  onSelect,
}: {
  track: AlbumTrack;
  number: number | null;
  isActive: boolean;
  delay: number;
  onSelect: () => void;
}) {
  return (
    <li
      className="animate-fadeInUp flex items-baseline gap-3 py-2.5 cursor-pointer group select-none"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onSelect}
    >
      {number !== null ? (
        <span
          className={`tabular-nums text-xs shrink-0 w-5 text-right transition-colors duration-300 ${
            isActive ? "text-white/60" : "text-white/25"
          }`}
        >
          {String(number).padStart(2, "0")}
        </span>
      ) : (
        <span className="shrink-0 w-5 text-center text-white/25 text-xs">·</span>
      )}
      <div className="min-w-0 flex-1">
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            isActive
              ? "text-white"
              : "text-white/65 group-hover:text-white/90"
          }`}
        >
          {track.title}
        </span>
        {track.artists && track.artists.length > 0 && (
          <span
            className={`ml-2 text-xs transition-colors duration-300 ${
              isActive ? "text-white/45" : "text-white/28 group-hover:text-white/40"
            }`}
          >
            {track.artists.join(", ")}
          </span>
        )}
      </div>
      {/* Diegetic line extending toward the model */}
      <div
        className={`self-center h-px w-16 shrink-0 transition-all duration-300 ${
          isActive
            ? "bg-white/50"
            : "bg-white/12 group-hover:bg-white/25"
        }`}
      />
    </li>
  );
}

export default function AlbumExperience() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const idleModelRef = useRef<HTMLElement | null>(null);
  const revealedModelRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const allTracks: AlbumTrack[] = [...ALBUM.tracks, ...ALBUM.bonusTracks];
  const activeTrack = activeIdx !== null ? allTracks[activeIdx] : null;
  const isInteractive = phase === "revealed" || phase === "playing";
  const isDark = phase !== "idle";

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function handleModelClick() {
    if (phase !== "idle") return;
    setPhase("animating");

    const el = idleModelRef.current as any;

    const reveal = () =>
      setPhase((p) => (p === "animating" ? "revealed" : p));

    // Safety timeout in case the finished event never fires
    const fallback = setTimeout(reveal, 12000);

    if (!el) {
      setTimeout(reveal, 3500);
      return;
    }

    el.addEventListener(
      "finished",
      () => {
        clearTimeout(fallback);
        reveal();
      },
      { once: true }
    );

    try {
      el.play({ repetitions: 1 });
    } catch {
      // model-viewer not ready yet; retry after it loads
      el.addEventListener(
        "load",
        () => {
          try {
            el.play({ repetitions: 1 });
          } catch {
            reveal();
          }
        },
        { once: true }
      );
    }
  }

  function handleTrackSelect(globalIdx: number) {
    if (!isInteractive) return;

    const el = revealedModelRef.current as any;

    if (activeIdx === globalIdx) {
      setActiveIdx(null);
      setPhase("revealed");
      audioRef.current?.pause();
      el?.removeAttribute("auto-rotate");
      return;
    }

    setActiveIdx(globalIdx);
    setPhase("playing");

    // Spin the record
    if (el) {
      el.setAttribute("auto-rotate", "");
      el.setAttribute("rotation-per-second", "28deg");
    }

    // Audio
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.pause();

    const track = allTracks[globalIdx];
    if (track.src) {
      audioRef.current.src = track.src;
      audioRef.current.play().catch(() => {});
    }
  }

  return (
    <div
      className="min-h-screen transition-colors duration-1000"
      style={{ background: isDark ? "#1c1814" : "#d9d3c8" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-6">
        <Link
          href="/"
          className={`text-sm transition-colors duration-700 ${
            isDark
              ? "text-white/40 hover:text-white/70"
              : "text-black/50 hover:text-black"
          }`}
        >
          ← Back
        </Link>
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.32em] transition-opacity duration-700 ${
            isInteractive ? "opacity-100" : "opacity-0"
          } ${isDark ? "text-white/30" : "text-black/30"}`}
        >
          {ALBUM.title}
        </p>
      </header>

      {/* ── Idle / Animating: centered model ── */}
      {!isInteractive && (
        <div
          className="flex flex-col items-center justify-center"
          style={{ minHeight: "calc(100vh - 60px)" }}
        >
          <div
            className={phase === "idle" ? "cursor-pointer" : "cursor-default"}
            onClick={handleModelClick}
          >
            <ModelViewer
              ref={idleModelRef}
              src="/album/model/recordAnimation.glb"
              alt="Art is an Offer – click to reveal"
              cameraControls={false}
              disableZoom
              orientation="90deg 180deg 0deg"
              cameraOrbit="25deg 75deg 90%"
              fieldOfView="30deg"
              reveal="auto"
              interactionPrompt="none"
              className="h-[480px] w-[480px] max-w-[min(480px,80vw)]"
              style={{
                animation:
                  phase === "idle"
                    ? "floaty 6s ease-in-out infinite"
                    : undefined,
              }}
            />
          </div>
          {phase === "idle" && (
            <p className="mt-5 text-sm text-black/35 select-none animate-fadeIn">
              Click to open
            </p>
          )}
        </div>
      )}

      {/* ── Revealed / Playing: two-column diegetic layout ── */}
      {isInteractive && (
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-24 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start animate-fadeIn">

          {/* Left: tracklist */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/30 mb-4">
              Tracklist
            </p>
            <ol className="divide-y divide-white/5">
              {ALBUM.tracks.map((track, i) => (
                <TrackItem
                  key={track.title}
                  track={track}
                  number={i + 1}
                  isActive={activeIdx === i}
                  delay={i * 55}
                  onSelect={() => handleTrackSelect(i)}
                />
              ))}
            </ol>

            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/30 mt-10 mb-4">
              Bonus Tracks
            </p>
            <ul className="divide-y divide-white/5">
              {ALBUM.bonusTracks.map((track, i) => {
                const globalI = ALBUM.tracks.length + i;
                return (
                  <TrackItem
                    key={track.title}
                    track={track}
                    number={null}
                    isActive={activeIdx === globalI}
                    delay={(globalI + 1) * 55}
                    onSelect={() => handleTrackSelect(globalI)}
                  />
                );
              })}
            </ul>
          </div>

          {/* Right: model + info card */}
          <div className="lg:sticky lg:top-8">
            <ModelViewer
              ref={revealedModelRef}
              src="/album/model/ALBUM.glb"
              alt="Art is an Offer"
              cameraControls
              disableZoom={false}
              orientation="90deg 180deg 0deg"
              cameraOrbit="25deg 75deg 90%"
              fieldOfView="30deg"
              reveal="auto"
              interactionPrompt="none"
              className="h-[420px] w-full"
            />

            {/* Track info panel */}
            {activeTrack && (
              <div
                key={activeTrack.title}
                className="animate-fadeInUp mt-5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-sm font-semibold text-white/90">
                    {activeTrack.title}
                  </span>
                  {activeTrack.artists && activeTrack.artists.length > 0 && (
                    <span className="text-xs text-white/40">
                      {activeTrack.artists.join(", ")}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-white/55">
                  {activeTrack.description}
                </p>
                {!activeTrack.src && (
                  <p className="mt-2 text-xs italic text-white/28">
                    No audio available yet
                  </p>
                )}
              </div>
            )}

            {!activeTrack && (
              <p className="mt-4 text-xs text-white/25 text-center animate-fadeIn">
                Select a track to play
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
