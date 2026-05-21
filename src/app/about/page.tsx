import Link from "next/link";
import type { Metadata } from "next";
import HeadshotKiosk from "@/components/HeadshotKiosk";

const HEADSHOTS = [
  { src: "/headshots/R5__2022.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2023.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2028.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2034.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2037.jpg", alt: "Headshot" },
  { src: "/headshots/R5__2100.jpg", alt: "Headshot" },
];

export const metadata: Metadata = {
  title: "About | Obadiah Bernstein",
  description:
    "About Obadiah Bernstein — immersive media, creative technology, and digital projects.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <Link
        href="/"
        className="text-sm text-black/60 hover:text-black"
      >
        ← Back home
      </Link>

      <header className="mt-8 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-black/85">
          About me
        </h1>
      </header>

      <section className="mt-8 max-w-2xl space-y-4 text-base leading-7 text-black/75">
        <p>
          My name is Obadiah Bernstein. I create digital technology projects
          that immerse users in fun and creative technical spaces.
        </p>
        <p>
          I am a graduate of Chatham University. I majored in Immersive Media,
          which allowed me opportunities to develop software and learn
          development processes and programming languages.
        </p>
        <p>
          I worked for Chatham’s Information Technology Department, and in
          Chatham’s Immersive Media department as a Studio Assistant, where I
          developed and built robots, created and ran workshops for labs, and
          conveyed complex information to beginner-level programmers.
        </p>
        <p>
          My experiences as a student and employee in the Immersive Media
          department expanded my abilities as an independent designer and
          artist. I love multimedia art, from sewing to 3D modeling.
        </p>
      </section>

      <section className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/55">
          Headshots
        </p>
        <div className="mt-6 flex justify-center">
          <HeadshotKiosk
            images={HEADSHOTS}
            className="h-[380px] w-full max-w-[400px]"
            secondsPerRevolution={90}
          />
        </div>
      </section>
    </main>
  );
}

