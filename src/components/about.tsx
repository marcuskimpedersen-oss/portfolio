"use client";

import Animate from "@/components/animate";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Animate>
          <h2 className="mb-12 text-center text-3xl font-bold">About Me</h2>
        </Animate>
        <div className="space-y-4 leading-relaxed text-gray-500 dark:text-gray-400">
          <Animate delay={100}>
            <p>
              I&apos;m a software developer passionate about building things for
              the web. I enjoy turning complex problems into simple, elegant
              solutions.
            </p>
          </Animate>
          <Animate delay={200}>
            <p>
              My focus is on creating responsive, accessible, and performant
              applications using modern technologies like React, TypeScript, and
              Node.js.
            </p>
          </Animate>
          <Animate delay={300}>
            <p>
              When I&apos;m not coding, you can find me exploring new
              technologies, contributing to open source, or learning something
              new.
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}
