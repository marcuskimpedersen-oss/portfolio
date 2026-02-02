"use client";

import Animate from "@/components/animate";

const publications = [
  {
    title: "The Basics of Cancer Prevention and Control",
    description:
      "An educational course covering foundational cancer control concepts — prevention, early detection, diagnosis, treatment, and palliative care — designed for national health planning.",
    org: "WHO",
    link: "https://share.articulate.com/bsFEqV1G09GVfeF9uhAeU",
  },
  {
    title: "Health Systems for Health Security",
    description:
      "Module on tools to support national implementation of health emergency preparedness, covering IHR monitoring frameworks, WHO benchmarks, and resilience toolkits.",
    org: "WHO",
    link: "https://share.articulate.com/Gq3qL8bPBtR6cazC9W24h",
  },
];

export default function Publications() {
  return (
    <section
      id="publications"
      className="border-t border-gray-200 py-24 dark:border-gray-800"
    >
      <div className="mx-auto max-w-3xl px-6">
        <Animate>
          <h2 className="mb-12 text-center text-3xl font-bold">Publications</h2>
        </Animate>
        <div className="space-y-6">
          {publications.map((item, i) => (
            <Animate key={item.title} delay={i * 150}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:shadow-indigo-500/10"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                    {item.org}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {item.title}
                  <span className="ml-2 inline-block text-gray-400 transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </a>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
