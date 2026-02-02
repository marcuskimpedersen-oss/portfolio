"use client";

import Animate from "@/components/animate";

const projects = [
  {
    title: "WHO Learning Courses",
    description:
      "Evidence-based learning experiences aligned with WHO priorities, designed in collaboration with global subject matter experts across UHC competency domains.",
    tags: ["Learning Design", "WHO", "UHC"],
    link: "#",
  },
  {
    title: "UCL Digital Pedagogy",
    description:
      "Transformed the digital teaching practices of academics across UCL through interactive workshops, novel learning tools, and research-driven approaches.",
    tags: ["EdTech", "UCL", "Research"],
    link: "#",
  },
  {
    title: "AR Education App",
    description:
      "Grant-funded augmented reality application for medical education at Moorfields Eye Hospital, bringing clinical scenarios to life for learners.",
    tags: ["AR", "Grant-funded", "Medical Ed"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-gray-200 py-24 dark:border-gray-800">
      <div className="mx-auto max-w-5xl px-6">
        <Animate>
          <h2 className="mb-12 text-center text-3xl font-bold">Projects</h2>
        </Animate>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Animate key={project.title} delay={i * 150}>
              <a
                href={project.link}
                className="group block rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-gray-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:shadow-indigo-500/10"
              >
                <h3 className="mb-2 text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
