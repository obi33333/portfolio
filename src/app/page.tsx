"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AlbumModelLink from "@/components/AlbumModelLink";
import { ALBUM } from "@/content/album";

const PROJECT_SECTIONS = [
  {
    slug: "one-day",
    title: "One Day Projects",
    overview: "Fast builds and experiments, a way to show off smaller projects.",
    preview: "/projects/one-day/Screenshot 2026-05-16 154504.png",
  },
  {
    slug: "robotics",
    title: "Robotics / Product Production",
    overview: "Robots, interactive objects, and physical computing work.",
    preview: "/projects/robotics/IMG_0558.jpeg",
  },
  {
    slug: "film-vfx",
    title: "Film / VFX",
    overview: "Compositing, 3D visuals, and post-production showcase.",
    preview: "/projects/film-vfx/Slide_1.png",
  },
  {
    slug: "professional",
    title: "Professional Experience",
    overview: "Work and roles across teams and studios.",
    preview: "/projects/professional/three_heads_gpu.jpg",
  },
];

export default function Home() {
  // Default to "one-day" so the card is always visible on load.
  // State never resets to null — hovering a pill switches the active section,
  // and it stays on that section when the mouse leaves.
  const [activeSection, setActiveSection] = useState<string>("one-day");
  const active = PROJECT_SECTIONS.find((s) => s.slug === activeSection)!;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">

      <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-start">

        {/* ── Left: name label + CTAs + project tabs ── */}
        <div className="flex flex-col gap-6">

          <h1 className="text-3xl font-bold tracking-tight text-black/85">
            Obadiah Bernstein
          </h1>

          {/* Section pills + persistent preview card.
              The card is absolute so it never shifts the grid or contact section.
              activeSection never resets to null — it stays on the last hovered pill. */}
          <div className="relative flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {PROJECT_SECTIONS.map((section) => (
                <Link
                  key={section.slug}
                  href={`/projects#${section.slug}`}
                  className={[
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    activeSection === section.slug
                      ? "border-black/25 bg-white/60 text-black"
                      : "border-black/10 text-black/65 hover:border-black/20 hover:text-black",
                  ].join(" ")}
                  onMouseEnter={() => setActiveSection(section.slug)}
                >
                  {section.title}
                </Link>
              ))}
            </div>

            {/* Always rendered — active section never goes null */}
            <div className="mt-2 lg:absolute lg:left-0 lg:right-0 lg:top-full lg:z-20 lg:mt-2">
              <Link
                href={`/projects#${active.slug}`}
                className="block overflow-hidden rounded-xl border border-black/10 bg-white/70 shadow-sm transition-opacity hover:opacity-90"
              >
                <div className="h-[520px] overflow-hidden">
                  <Image
                    src={active.preview}
                    alt={active.title}
                    width={480}
                    height={224}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-black">{active.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-black/55">{active.overview}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right: album (sidebar) ── */}
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
              Album
            </p>
            <p className="mt-1 text-sm font-medium text-black/75">Art is an Offer</p>
            <AlbumModelLink
              src={ALBUM.modelSrc}
              alt={`${ALBUM.title} model`}
              modelHeight={460}
            />
          </div>
        </div>

      </div>

      {/* ── Contact ── */}
      <div className="mt-16 border-t border-black/8 pt-10 pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
              Contact
            </p>
            <p className="mt-2 text-base text-black/70">Feel free to reach out.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/80"
          >
            Get in touch
          </Link>
        </div>
        <p className="mt-6 text-xs text-black/30">Last updated May 2026</p>
      </div>

    </main>
  );
}
