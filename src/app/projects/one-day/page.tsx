import Link from "next/link";
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getProjectsByCategory } from "@/content/projects";

export const metadata: Metadata = {
  title: "One Day Projects | Obadiah Bernstein",
  description: "Fast builds and experiments made in a single day.",
};

export default function OneDaySectionPage() {
  const projects = getProjectsByCategory("one-day");

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <Link href="/projects" className="text-sm text-black/60 hover:text-black">
        ← Back to projects
      </Link>

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/55">
          Project Section
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black/85">
          One Day Projects
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-black/65">
          Fast builds and experiments made in a single day — rapid prototypes, creative tools,
          and personal explorations across code, hardware, and media.
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
