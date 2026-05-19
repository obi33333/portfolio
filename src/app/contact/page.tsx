import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Obadiah Bernstein",
  description: "Get in touch with Obadiah Bernstein.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-[calc(100vh-3.5rem)] bg-black overflow-hidden">

      {/* Cat image — starts one third down the page */}
      <div className="absolute inset-x-0 bottom-0 top-1/3">
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
            Get in touch
          </h1>
          <p className="mt-4 text-base leading-7 text-white/75">
            Feel free to reach out about collaborations, projects, or anything else.
          </p>
          <p className="mt-6 text-lg font-medium text-white/90">
            Bernsteinobadiah@gmail.com
          </p>
        </div>
      </div>

    </main>
  );
}
