import Link from "next/link";
import AlbumScene from "@/components/AlbumScene";
import { ALBUM } from "@/content/album";

export const metadata = {
  title: `${ALBUM.title} | Obadiah Bernstein`,
  description: "Art is an Offer — an album by Obadiah Bernstein.",
};

export default function AlbumPage() {
  return (
    <main className="relative flex-1">
      {/* Title overlay — top center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/35">
          Album
        </p>
        <h1 className="mt-0.5 text-sm font-semibold tracking-tight text-black/50">
          {ALBUM.title}
        </h1>
      </div>

      {/* Back link — top-right corner */}
      <Link
        href="/"
        className="absolute top-4 right-6 z-10 text-xs text-black/35 hover:text-black/70 transition-colors"
      >
        ← Back
      </Link>

      <AlbumScene />
    </main>
  );
}
