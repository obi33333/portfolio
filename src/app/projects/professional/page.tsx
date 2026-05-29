import Link from "next/link";
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getProjectsByCategory } from "@/content/projects";

export const metadata: Metadata = {
  title: "Professional Experience | Obadiah Bernstein",
  description: "Selected work and roles across teams and studios.",
};

export default function ProfessionalSectionPage() {
  const projects = getProjectsByCategory("professional");

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <Link href="/projects" className="text-sm text-black/60 hover:text-black">
        ← Back to projects
      </Link>

      <header className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight text-black/85">
          Professional Experience
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-black/65">
          Jobs and contracted work — teaching, software development, live event production, and a cultural preservation project.
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
