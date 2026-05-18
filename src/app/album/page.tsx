import Link from "next/link";
import ModelViewer from "@/components/ModelViewer";
import { ALBUM } from "@/content/album";
import type { AlbumTrack } from "@/content/album";

export const metadata = {
  title: `${ALBUM.title} | Obadiah Bernstein`,
  description: "Art is an Offer — an album by Obadiah Bernstein.",
};

function TrackRow({
  track,
  index,
  showIndex = true,
}: {
  track: AlbumTrack;
  index: number;
  showIndex?: boolean;
}) {
  return (
    <li className="group rounded-2xl border border-black/8 bg-white/50 px-5 py-4 transition-all hover:border-black/15 hover:bg-white/70">
      <div className="flex items-start gap-4">
        {showIndex && (
          <span className="mt-0.5 shrink-0 w-6 text-right text-xs text-black/30 tabular-nums">
            {index}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-semibold text-black/85 group-hover:text-black">
              {track.title}
            </span>
            {track.artists && track.artists.length > 0 && (
              <span className="text-xs text-black/40">
                {track.artists.join(", ")}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs leading-5 text-black/55">
            {track.description}
          </p>
          {track.src && (
            <audio
              className="mt-3 w-full"
              controls
              preload="none"
              src={track.src}
            />
          )}
        </div>
      </div>
    </li>
  );
}

export default function AlbumPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <Link
        href="/"
        className="text-sm text-black/55 transition-colors hover:text-black"
      >
        ← Back
      </Link>

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
          Album
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-black/70">
          {ALBUM.title}
        </h1>
      </header>

      <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-start">

        {/* ── Left: description + tracklist ── */}
        <div>
          <div className="space-y-4 text-base leading-7 text-black/70">
            {ALBUM.about.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          {/* Main tracks */}
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
              Tracklist
            </p>
            <ol className="mt-4 space-y-2">
              {ALBUM.tracks.map((track, i) => (
                <TrackRow key={track.title} track={track} index={i + 1} />
              ))}
            </ol>
          </div>

          {/* Bonus tracks */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
              Bonus Tracks
            </p>
            <ol className="mt-4 space-y-2">
              {ALBUM.bonusTracks.map((track, i) => (
                <TrackRow
                  key={track.title}
                  track={track}
                  index={i + 1}
                  showIndex={false}
                />
              ))}
            </ol>
          </div>
        </div>

        {/* ── Right: 3D model (sticky) ── */}
        <div className="lg:sticky lg:top-20">
          <ModelViewer
            src={ALBUM.modelSrc}
            alt={`${ALBUM.title} 3D model`}
            cameraControls
            disableZoom={false}
            orientation="90deg 180deg 0deg"
            cameraOrbit="25deg 75deg 90%"
            fieldOfView="30deg"
            reveal="auto"
            interactionPrompt="none"
            className="h-[460px] w-full"
            style={{ animation: "floaty 6s ease-in-out infinite" }}
          />
          <p className="mt-1 text-xs text-black/40">Drag to rotate · Scroll to zoom</p>
        </div>

      </div>
    </main>
  );
}
