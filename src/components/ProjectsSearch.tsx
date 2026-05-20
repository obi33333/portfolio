"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/content/projects";

type Category = {
  slug: Project["category"];
  title: string;
  summary: string;
};

type Props = {
  projects: Project[];
  categories: Category[];
};

export default function ProjectsSearch({ projects, categories }: Props) {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return [...tags].sort();
  }, [projects]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const isFiltering = activeTags.size > 0;

  const filteredProjects = useMemo(() => {
    if (!isFiltering) return [];
    return projects.filter((p) => p.tags.some((t) => activeTags.has(t)));
  }, [projects, activeTags, isFiltering]);

  return (
    <>
      {/* Category nav — hidden while filtering */}
      {!isFiltering && (
        <nav className="mt-8 flex flex-wrap gap-3 text-sm">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-black/70 transition hover:border-black/20 hover:bg-white/80 hover:text-black"
            >
              {cat.title}
            </a>
          ))}
        </nav>
      )}

      {/* Tag filter */}
      <div className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-black/40">
          Filter by tag
        </p>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const active = activeTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={[
                  "rounded-full px-3 py-1 text-xs font-medium transition",
                  active
                    ? "bg-black/85 text-white"
                    : "border border-black/10 bg-white/60 text-black/60 hover:border-black/25 hover:text-black",
                ].join(" ")}
              >
                {tag}
              </button>
            );
          })}
          {isFiltering && (
            <button
              onClick={() => setActiveTags(new Set())}
              className="rounded-full px-3 py-1 text-xs text-black/40 hover:text-black transition"
            >
              Clear all ×
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {isFiltering ? (
        <div className="mt-8">
          <p className="mb-5 text-sm text-black/45">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} matching{" "}
            <span className="font-medium text-black/65">{[...activeTags].join(", ")}</span>
          </p>
          {filteredProjects.length === 0 ? (
            <p className="text-sm text-black/40">No projects match the selected tags.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {categories.map((cat) => {
            const catProjects = projects.filter((p) => p.category === cat.slug);
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
                  {catProjects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
                {catProjects.length > 3 && (
                  <p className="mt-4 text-xs text-black/45">
                    +{catProjects.length - 3} more in this section
                  </p>
                )}
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
