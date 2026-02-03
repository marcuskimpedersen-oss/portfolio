"use client";

import Animate from "@/components/animate";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Animate>
          <h2 className="mb-12 text-center text-3xl font-bold">About Me</h2>
        </Animate>
        <div className="space-y-4 leading-relaxed text-stone-500 dark:text-stone-400">
          <Animate delay={100}>
            <p>
              I&apos;m a Learning Designer with a background in teaching and
              educational technology. I&apos;ve trained hundreds of academics,
              clinicians, and leaders on their digital pedagogy and built
              learning ecosystems for thousands of learners.
            </p>
          </Animate>
          <Animate delay={200}>
            <p>
              My work sits at the intersection of pedagogy, technology, and
              research. I design evidence-based courses, workshops, and digital
              learning experiences — collaborating with subject matter experts to
              create content that is both rigorous and accessible.
            </p>
          </Animate>
          <Animate delay={300}>
            <p>
              I&apos;ve presented my research at over 20 national and
              international conferences and have been published in journals
              including the BMJ and the Journal of Emergency Medicine. I hold a
              Fellowship of the Higher Education Academy (FHEA) and a CMALT
              accreditation.
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}
