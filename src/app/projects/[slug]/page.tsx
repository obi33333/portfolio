import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import type { ProjectMedia } from "@/content/projects";
import MediaGallery from "@/components/MediaGallery";
import ModelViewer from "@/components/ModelViewer";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const project = getProjectBySlug(decodeURIComponent(rawSlug));
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | Obadiah Bernstein`,
    description: project.summary,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  "one-day": "One Day Projects",
  robotics: "Robotics / Product Production",
  "film-vfx": "Film / VFX",
  professional: "Professional Experience",
};

function MediaItem({
  item,
  title,
  keepAudio,
}: {
  item: ProjectMedia;
  title: string;
  keepAudio?: boolean;
}) {
  if (item.type === "gif") {
    return (
      <div className="overflow-hidden rounded-xl border border-black/10 bg-black/5">
        <video
          src={item.src}
          className="w-full"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
    );
  }
  if (item.type === "video") {
    return (
      <div className="overflow-hidden rounded-xl border border-black/10 bg-black/5">
        {keepAudio ? (
          <video src={item.src} className="w-full" controls playsInline preload="metadata" />
        ) : (
          <video src={item.src} className="w-full" controls playsInline preload="metadata" muted />
        )}
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-black/10">
      <Image
        src={item.src}
        alt={item.alt ?? title}
        width={800}
        height={500}
        className="w-full object-cover"
      />
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const project = getProjectBySlug(decodeURIComponent(rawSlug));
  if (!project) notFound();

  const allMedia = project.media ?? [];

  const useGallery = allMedia.some((m) => m.caption) || allMedia.length > 1;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href={`/projects/${project.category}`}
        className="text-sm text-black/55 transition-colors hover:text-black"
      >
        ← {CATEGORY_LABELS[project.category]}
      </Link>

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/55">
          {CATEGORY_LABELS[project.category]}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black/85">
          {project.title}
        </h1>
        {project.timeframe && (
          <p className="mt-2 text-sm text-black/45">{project.timeframe}</p>
        )}
        <p className="mt-4 text-base leading-7 text-black/65">{project.summary}</p>

        {project.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 bg-white/80 px-2.5 py-1 text-xs text-black/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* External links */}
        {(project.links?.live ||
          project.links?.article ||
          project.links?.repo ||
          project.links?.github ||
          project.links?.youtube ||
          project.links?.pdf) && (
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            {project.links.github && (
              <a
                href={project.links.github}
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 transition hover:border-black/20 hover:text-black"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 transition hover:border-black/20 hover:text-black"
                target="_blank"
                rel="noreferrer"
              >
                Live Demo ↗
              </a>
            )}
            {project.links.article && (
              <a
                href={project.links.article}
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 transition hover:border-black/20 hover:text-black"
                target="_blank"
                rel="noreferrer"
              >
                Article ↗
              </a>
            )}
            {project.links.youtube && (
              <a
                href={project.links.youtube}
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 transition hover:border-black/20 hover:text-black"
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube ↗
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 transition hover:border-black/20 hover:text-black"
                target="_blank"
                rel="noreferrer"
              >
                Repository ↗
              </a>
            )}
            {project.links.pdf && (
              <a
                href={project.links.pdf}
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 transition hover:border-black/20 hover:text-black"
                target="_blank"
                rel="noreferrer"
              >
                Presentation ↗
              </a>
            )}
          </div>
        )}
      </header>

      {/* Body */}
      <section className="mt-10 space-y-5 text-base leading-7 text-black/70">
        {project.body.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </section>

      {/* 3D model embed */}
      {project.links?.model && (
        <section className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
            Interactive 3D Model
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-black/10">
            <ModelViewer
              src={project.links.model}
              alt={`${project.title} 3D model`}
              cameraControls
              disableZoom={false}
              reveal="auto"
              interactionPrompt="none"
              className="h-[480px] w-full"
            />
          </div>
          <p className="mt-1 text-xs text-black/40">Drag to rotate · Scroll to zoom</p>
        </section>
      )}

      {/* Media gallery */}
      {allMedia.length > 0 && (
        <section className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
            Media
          </p>
          <div className="mt-4">
            {useGallery ? (
              <MediaGallery items={allMedia} title={project.title} keepAudio={project.keepAudio} />
            ) : (
              <div className="space-y-4">
                {allMedia.map((item, i) => (
                  <MediaItem key={i} item={item} title={project.title} keepAudio={project.keepAudio} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
