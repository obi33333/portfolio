"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectMedia } from "@/content/projects";

export default function MediaGallery({
  items,
  title,
  keepAudio,
}: {
  items: ProjectMedia[];
  title: string;
  keepAudio?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const item = items[idx];
  const hasCaptions = items.some((i) => i.caption);

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-black/10 bg-black w-fit mx-auto">
        {item.type === "gif" ? (
          <video
            key={item.src}
            src={item.src}
            className="mx-auto block max-h-[65vh] w-auto max-w-full"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        ) : item.type === "video" ? (
          <video
            key={item.src}
            src={item.src}
            className="mx-auto block max-h-[65vh] w-auto max-w-full"
            controls
            playsInline
            preload="metadata"
            muted={!keepAudio}
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt ?? title}
            width={800}
            height={500}
            className="w-full object-cover"
          />
        )}
      </div>

      {hasCaptions && item.caption && (
        <p className="text-sm leading-6 text-black/60">{item.caption}</p>
      )}

      {items.length > 1 && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="rounded-full border border-black/10 px-3 py-1 text-sm text-black/60 transition-colors hover:border-black/20 hover:text-black disabled:pointer-events-none disabled:opacity-30"
          >
            ←
          </button>
          <span className="text-xs text-black/40">
            {idx + 1} / {items.length}
          </span>
          <button
            onClick={() => setIdx((i) => Math.min(items.length - 1, i + 1))}
            disabled={idx === items.length - 1}
            className="rounded-full border border-black/10 px-3 py-1 text-sm text-black/60 transition-colors hover:border-black/20 hover:text-black disabled:pointer-events-none disabled:opacity-30"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
