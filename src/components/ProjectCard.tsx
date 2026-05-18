"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/content/projects";

function CardMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!project.preview) return null;

  if (project.preview.type === "video") {
    return (
      <div className="h-44 overflow-hidden bg-black/5">
        <video
          ref={videoRef}
          src={project.preview.src}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          muted
          playsInline
          preload="metadata"
          loop
          onMouseEnter={() => videoRef.current?.play()}
          onMouseLeave={() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-44 overflow-hidden bg-black/5">
      <Image
        src={project.preview.src}
        alt={project.preview.alt ?? project.title}
        width={480}
        height={176}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
    >
      <CardMedia project={project} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-black/85 group-hover:text-black">
              {project.title}
            </h3>
            {project.timeframe && (
              <p className="mt-1 text-xs text-black/45">{project.timeframe}</p>
            )}
          </div>
          <span className="shrink-0 text-black/30 transition-colors group-hover:text-black/60">
            →
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-black/65">{project.summary}</p>

        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 bg-white/80 px-2.5 py-1 text-xs text-black/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
