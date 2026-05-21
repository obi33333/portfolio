import ProjectsSearch from "@/components/ProjectsSearch";
import { getAllProjects } from "@/content/projects";
import type { Project } from "@/content/projects";

const CATEGORIES: { slug: Project["category"]; title: string; summary: string }[] = [
  {
    slug: "one-day",
    title: "One Day Projects",
    summary: "Fast builds and experiments, a way to show off smaller projects.",
  },
  {
    slug: "robotics",
    title: "Robotics / Product Production",
    summary: "Robots, interactive objects, and physical computing work.",
  },
  {
    slug: "film-vfx",
    title: "Film / VFX",
    summary: "Compositing, 3D visuals, and post-production showcase.",
  },
  {
    slug: "professional",
    title: "Professional Experience",
    summary: "Work and roles across teams and studios.",
  },
];

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-black/85">
          Projects
        </h1>
      </header>

      <ProjectsSearch projects={projects} categories={CATEGORIES} />
    </main>
  );
}
