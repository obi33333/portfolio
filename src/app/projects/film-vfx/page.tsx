import Link from "next/link";
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getProjectsByCategory } from "@/content/projects";

export const metadata: Metadata = {
  title: "Film / VFX | Obadiah Bernstein",
  description: "Video, compositing, visuals, and post-production experiments.",
};

export default function FilmVfxSectionPage() {
  const projects = getProjectsByCategory("film-vfx");

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <Link href="/projects" className="text-sm text-black/60 hover:text-black">
        ← Back to projects
      </Link>

      <header className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight text-black/85">
          Film / VFX
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-black/65">
          Video, compositing, and post-production work — short films, multi-screen installations,
          VFX composites, and animation using Blender and TouchDesigner.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
