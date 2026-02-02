"use client";

import Animate from "@/components/animate";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <Animate direction="down" delay={0}>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Hello, I&apos;m
          </p>
        </Animate>
        <Animate direction="up" delay={100}>
          <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl">
            Marcus Pedersen
          </h1>
        </Animate>
        <Animate direction="up" delay={200}>
          <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
            A developer who builds clean, performant web experiences.
          </p>
        </Animate>
        <Animate direction="up" delay={300}>
          <div className="flex justify-center gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
            >
              Get in Touch
            </a>
          </div>
        </Animate>
      </div>
    </section>
  );
}
