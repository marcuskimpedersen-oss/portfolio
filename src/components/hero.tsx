"use client";

import Animate from "@/components/animate";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <Animate direction="down" delay={0}>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-taupe-600 dark:text-taupe-400">
            Hello, I&apos;m
          </p>
        </Animate>
        <Animate direction="up" delay={100}>
          <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl">
            Marcus Pedersen
          </h1>
        </Animate>
        <Animate direction="up" delay={200}>
          <p className="mb-8 text-lg text-stone-500 dark:text-stone-400">
            Learning Designer building digital ecosystems that transform how
            people learn. 20+ conference presentations. Published researcher.
          </p>
        </Animate>
        <Animate direction="up" delay={300}>
          <a
            href="https://www.linkedin.com/in/marcus-pedersen-/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>
        </Animate>
      </div>
    </section>
  );
}
