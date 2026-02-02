"use client";

import Animate from "@/components/animate";

const projects = [
  {
    title: "Project One",
    description:
      "A full-stack web application built with Next.js and PostgreSQL. Features real-time updates and responsive design.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Project Two",
    description:
      "A CLI tool that automates common development workflows, saving hours of repetitive work.",
    tags: ["Node.js", "TypeScript", "CLI"],
    link: "#",
  },
  {
    title: "Project Three",
    description:
      "An open-source component library with accessible, customizable UI primitives.",
    tags: ["React", "Tailwind CSS", "Storybook"],
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
