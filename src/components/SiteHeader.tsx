"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#d9d3c8]">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 h-14">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-black/85 hover:text-black"
        >
          Home
        </Link>

        <nav className="flex items-center gap-7 text-sm text-black/60">
          <Link href="/projects" className="hover:text-black transition-colors">
            Projects
          </Link>
          <Link href="/about" className="hover:text-black transition-colors">
            About
          </Link>
          <a
            href="/resume.pdf"
            download
            className="hover:text-black transition-colors"
          >
            Resume
          </a>
          <Link href="/contact" className="hover:text-black transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
