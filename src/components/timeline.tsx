"use client";

import Animate from "@/components/animate";

const experience = [
  {
    date: "Aug 2024 — Present",
    role: "Learning Designer",
    org: "UN/WHO, London",
    description:
      "Design learning courses, workshops, and other learning experiences aligned with WHO priorities and initiatives. Collaborate with subject matter experts to create evidence-based, culturally appropriate content working with the UHC competency domains.",
  },
  {
    date: "Feb 2022 — Aug 2024",
    role: "Learning Technologist",
    org: "UCL, London",
    description:
      "Developed the digital pedagogy of UCL academics. Designed interactive and novel ways of educating students, staff and leaders across the institution. Presented at national and international conferences.",
  },
  {
    date: "Sept 2020 — Feb 2022",
    role: "Learning Technologist",
    org: "Moorfields Eye Hospital, London",
    description:
      "Developed the digital pedagogy of MEH/UCL academics. Designed interactive learning for students, patients, staff and leaders. Secured grants for AR education and diabetic retinopathy learning environments.",
  },
  {
    date: "Sept 2019 — Aug 2020",
    role: "Learning Technologist",
    org: "Journal of Visualised Experiments, London",
    description:
      "Helped Nordic universities, schools and research institutes implement JoVE video content and teaching tools into courses and research labs. Experienced across all major LMS platforms.",
  },
];

const education = [
  {
    date: "2017 — 2018",
    role: "Masters of Teaching",
    org: "University of Melbourne, Australia",
  },
  {
    date: "2013 — 2016",
    role: "Bachelor of Teaching",
    org: "University of Melbourne, Australia",
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="border-t border-gray-200 py-24 dark:border-gray-800">
      <div className="mx-auto max-w-3xl px-6">
        <Animate>
          <h2 className="mb-16 text-center text-3xl font-bold">Experience</h2>
        </Animate>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gray-200 dark:bg-gray-800 sm:left-1/2" />

          {experience.map((item, i) => (
            <Animate key={item.org} delay={i * 150}>
              <div
                className={`relative mb-12 flex flex-col sm:flex-row ${
                  i % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-indigo-600 bg-white dark:border-indigo-400 dark:bg-gray-950 sm:left-1/2" />

                {/* Content */}
                <div className={`w-full pl-10 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {item.date}
                  </p>
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.org}
                  </p>
                  {item.description && (
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </Animate>
          ))}
        </div>

        {/* Education */}
        <Animate>
          <h2 className="mb-16 mt-24 text-center text-3xl font-bold">
            Education
          </h2>
        </Animate>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gray-200 dark:bg-gray-800 sm:left-1/2" />

          {education.map((item, i) => (
            <Animate key={item.role} delay={i * 150}>
              <div
                className={`relative mb-12 flex flex-col sm:flex-row ${
                  i % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-indigo-600 bg-white dark:border-indigo-400 dark:bg-gray-950 sm:left-1/2" />

                <div className={`w-full pl-10 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {item.date}
                  </p>
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.org}
                  </p>
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
