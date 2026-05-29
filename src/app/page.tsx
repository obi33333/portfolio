"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AlbumModelLink from "@/components/AlbumModelLink";
import HeadshotKiosk from "@/components/HeadshotKiosk";
import { ALBUM } from "@/content/album";

const ALBUM_MODEL_PARTS = [
  "/album/model/Parts/record.glb",
  "/album/model/Parts/recordCase.glb",
  "/album/model/Parts/recordBag.glb",
];

const HEADSHOTS = [
  { src: "/headshots/R5__2022.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2023.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2028.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2034.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2037.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2100.jpg", alt: "Headshot" },
];

export default function Home() {
  useEffect(() => {
    ALBUM_MODEL_PARTS.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      link.as = "fetch";
      document.head.appendChild(link);
    });
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">

      <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-start">

        {/* ── Left: name + hero project ── */}
        <div className="flex flex-col gap-6">

          <h1 className="text-3xl font-bold tracking-tight text-black/85">
            Obadiah Bernstein
          </h1>

          <Link
            href="/projects"
            className="text-sm text-black/50 transition-colors hover:text-black"
          >
            View all projects →
          </Link>

          {/* Capstone hero card */}
          <Link
            href="/projects/capstone"
            className="group block overflow-hidden rounded-2xl border border-black/10 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
          >
            <div className="h-52 overflow-hidden bg-black/5">
              <Image
                src="/projects/capstone/cover.jpg"
                alt="Haptic Alarm System"
                width={640}
                height={176}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
                Featured Project
              </p>
              <h2 className="mt-1.5 text-base font-semibold tracking-tight text-black/85 group-hover:text-black">
                Haptic Alarm System
              </h2>
              <p className="mt-0.5 text-xs text-black/40">Senior year thesis, Chatham University</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Electronics", "Physical Computing", "Prototyping", "Robotics"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 bg-white/80 px-2.5 py-1 text-xs text-black/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* WJ Beitler card */}
          <Link
            href="/projects/wj-beitler"
            className="group block overflow-hidden rounded-2xl border border-black/10 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
          >
            <div className="h-52 overflow-hidden bg-black/5">
              <Image
                src="/projects/wj-beitler/thumb.jpg"
                alt="W.J. Beitler"
                width={640}
                height={176}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
                Professional Experience
              </p>
              <h2 className="mt-1.5 text-base font-semibold tracking-tight text-black/85 group-hover:text-black">
                .NET MAUI Developer &amp; IT Analyst
              </h2>
              <p className="mt-0.5 text-xs text-black/40">W.J. Beitler &nbsp;·&nbsp; 2025–Present</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[".NET MAUI", "C#", "SQL", "Mobile Development"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 bg-white/80 px-2.5 py-1 text-xs text-black/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

        </div>

        {/* ── Right: headshots + album ── */}
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
              Headshots
            </p>
            <div className="mt-3">
              <HeadshotKiosk
                images={HEADSHOTS}
                className="h-[300px] w-full max-w-[340px]"
                secondsPerRevolution={90}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
              Album
            </p>
            <p className="mt-1 text-sm font-medium text-black/75">Art is an Offer</p>
            <AlbumModelLink
              src={ALBUM.modelSrc}
              alt={`${ALBUM.title} model`}
              modelHeight={380}
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
