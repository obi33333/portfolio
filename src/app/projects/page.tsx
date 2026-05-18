import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getProjectsByCategory } from "@/content/projects";
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
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/55">
          Projects
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black/85">
          Projects
        </h1>
      </header>

      <nav className="mt-8 flex flex-wrap gap-3 text-sm">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.slug}
            href={`#${cat.slug}`}
            className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-black/70 transition hover:border-black/20 hover:bg-white/80 hover:text-black"
          >
            {cat.title}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-8">
        {CATEGORIES.map((cat) => {
          const projects = getProjectsByCategory(cat.slug);
          return (
            <section
              key={cat.slug}
              id={cat.slug}
              className="scroll-mt-28 rounded-[2rem] border border-black/10 bg-white/80 p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-semibold tracking-tight text-black/85">
                    {cat.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-black/65">{cat.summary}</p>
                </div>
                <Link
                  href={`/projects/${cat.slug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-black/15 bg-white/70 px-5 py-2.5 text-sm font-medium text-black/70 transition hover:border-black/25 hover:text-black"
                >
                  View all <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 3).map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
              {projects.length > 3 && (
                <p className="mt-4 text-xs text-black/45">
                  +{projects.length - 3} more in this section
                </p>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
