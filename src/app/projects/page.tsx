import ProjectsSearch from "@/components/ProjectsSearch";
import { getAllProjects } from "@/content/projects";
import type { Project } from "@/content/projects";

const CATEGORIES: { slug: Project["category"]; title: string; summary: string }[] = [
  {
    slug: "one-day",
    title: "One Day Projects",
    summary: "Quick experiments and builds I made in a day.",
  },
  {
    slug: "robotics",
    title: "Robotics / Product Production",
    summary: "Electronics, robots, and hands-on physical computing.",
  },
  {
    slug: "film-vfx",
    title: "Film / VFX",
    summary: "Short films, VFX composites, and video work.",
  },
  {
    slug: "professional",
    title: "Professional Experience",
    summary: "Jobs and contracted roles I've held.",
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
