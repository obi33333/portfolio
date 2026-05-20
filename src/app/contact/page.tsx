import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Obadiah Bernstein",
  description: "Obadiah Bernstein — open to software development and creative technology roles.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-[calc(100vh-3.5rem)] bg-black overflow-hidden">

      {/* Cat image — starts partway down the page */}
      <div className="absolute inset-x-0 bottom-0 top-[28%] sm:top-[12%] lg:top-[-8%]">
        <Image
          src="/cat.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Content — sits above the cat on the black background */}
      <div className="relative z-10 flex min-h-[calc(100vh-3.5rem)] flex-col items-center px-8 pt-12 md:px-14 md:pt-16">
        <Link
          href="/"
          className="absolute top-8 left-8 text-sm text-white/70 transition-colors hover:text-white md:left-14"
        >
          ← Back
        </Link>

        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            Let's work together
          </h1>
          <p className="mt-4 max-w-sm text-base leading-7 text-white/70">
            I'm actively seeking roles in software development, creative technology,
            and immersive media. Open to full-time positions and collaborations.
          </p>
          <a
            href="mailto:Bernsteinobadiah@gmail.com"
            className="mt-6 inline-block text-lg font-medium text-white/90 hover:text-white transition-colors"
          >
            Bernsteinobadiah@gmail.com
          </a>
          <div className="mt-5 flex items-center justify-center gap-4">
            <a
              href="/ObadiahBernsteinResume.pdf"
              download="ObadiahBernsteinResume.pdf"
              className="rounded-full border border-white/25 px-5 py-2 text-sm text-white/80 hover:border-white/60 hover:text-white transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>

        <p className="mt-auto pb-6 text-xs text-white/30">
          shot by Liam Lyons
        </p>
      </div>

    </main>
  );
}
