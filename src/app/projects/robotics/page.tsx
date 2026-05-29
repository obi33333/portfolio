import Link from "next/link";
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getProjectsByCategory } from "@/content/projects";

export const metadata: Metadata = {
  title: "Robotics / Product Production | Obadiah Bernstein",
  description: "Robots, interactive objects, and physical computing work.",
};

export default function RoboticsSectionPage() {
  const projects = getProjectsByCategory("robotics");

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <Link href="/projects" className="text-sm text-black/60 hover:text-black">
        ← Back to projects
      </Link>

      <header className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight text-black/85">
          Robotics / Product Production
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-black/65">
          Physical builds and interactive systems. Most started as cardboard prototypes. My senior thesis — a haptic alarm system designed for people with hearing loss — is in here too.
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
