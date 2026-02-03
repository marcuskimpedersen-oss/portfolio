"use client";

import { useState, useEffect, useCallback } from "react";
import Animate from "@/components/animate";

const projects = [
  {
    title: "WHO Learning Courses",
    description:
      "Evidence-based learning experiences aligned with WHO priorities, designed in collaboration with global subject matter experts across UHC competency domains.",
    tags: ["Learning Design", "WHO", "UHC"],
    terms: [
      { term: "Instructional Design", definition: "The systematic process of designing, developing, and delivering learning experiences that align with defined objectives and learner needs." },
      { term: "Competency-Based Learning", definition: "An approach where learners progress by demonstrating mastery of clearly defined competencies rather than spending a fixed amount of time on a topic." },
      { term: "Blended Learning", definition: "A pedagogical strategy that combines face-to-face instruction with online and self-directed learning activities." },
      { term: "Needs Assessment", definition: "A structured analysis used to identify gaps between current and desired knowledge, skills, or performance in a target audience." },
      { term: "Learning Outcomes", definition: "Specific, measurable statements describing what learners should know or be able to do upon completing a learning experience." },
      { term: "Formative Assessment", definition: "Ongoing evaluation methods used during the learning process to monitor progress and provide feedback before final assessment." },
      { term: "Cultural Responsiveness", definition: "The practice of designing learning experiences that respect and integrate the diverse cultural backgrounds and contexts of learners." },
      { term: "Curriculum Mapping", definition: "A method of aligning learning activities, assessments, and outcomes across a programme to ensure coherence and coverage." },
    ],
  },
  {
    title: "UCL Digital Pedagogy",
    description:
      "Transformed the digital teaching practices of academics across UCL through interactive workshops, novel learning tools, and research-driven approaches.",
    tags: ["EdTech", "UCL", "Research"],
    terms: [
      { term: "Digital Literacy", definition: "The ability to critically find, evaluate, create, and communicate information using digital technologies in academic and professional contexts." },
      { term: "Active Learning", definition: "An instructional approach that engages learners in meaningful activities and reflection rather than passive reception of content." },
      { term: "Flipped Classroom", definition: "A model where learners engage with instructional content before class, freeing contact time for discussion, application, and deeper exploration." },
      { term: "Constructive Alignment", definition: "A design principle ensuring that learning outcomes, teaching activities, and assessments are coherently linked to support learner achievement." },
      { term: "Technology-Enhanced Learning", definition: "The use of digital tools and platforms to augment, support, or transform teaching and learning practices." },
      { term: "Scaffolding", definition: "Temporary instructional support structures that help learners accomplish tasks they cannot yet manage independently." },
      { term: "Peer Learning", definition: "A collaborative approach where learners gain knowledge and skills by engaging with and learning from one another." },
      { term: "Learning Analytics", definition: "The collection and analysis of data about learners and their contexts to understand and optimise learning and the environments in which it occurs." },
    ],
  },
  {
    title: "AR Education App",
    description:
      "Grant-funded augmented reality application for medical education at Moorfields Eye Hospital, bringing clinical scenarios to life for learners.",
    tags: ["AR", "Grant-funded", "Medical Ed"],
    terms: [
      { term: "Immersive Learning", definition: "Learning experiences that place the learner within a simulated or augmented environment to deepen engagement and understanding." },
      { term: "Simulation-Based Education", definition: "The use of realistic clinical or professional scenarios to develop practical skills in a safe, controlled setting." },
      { term: "Spatial Computing", definition: "Technology that blends digital content with the physical world, enabling learners to interact with 3D objects in real space." },
      { term: "Experiential Learning", definition: "A cyclical learning process where knowledge is created through the transformation of direct experience and reflection." },
      { term: "Clinical Reasoning", definition: "The cognitive process by which healthcare professionals gather, interpret, and synthesise patient information to make diagnostic and treatment decisions." },
      { term: "Multimodal Learning", definition: "An approach that presents content through multiple sensory channels — visual, auditory, and kinesthetic — to support diverse learning preferences." },
      { term: "Gamification", definition: "The application of game-design elements such as points, challenges, and progression to non-game learning contexts to increase motivation." },
      { term: "Situated Learning", definition: "A theory positing that learning is most effective when it takes place in the authentic context in which the knowledge will be applied." },
    ],
  },
];

export default function Projects() {
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const close = useCallback(() => {
    setOpenProject(null);
    setSelectedTerm(null);
  }, []);

  useEffect(() => {
    if (openProject === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [openProject, close]);

  return (
    <section id="projects" className="border-t border-stone-200 py-24 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-6">
        <Animate>
          <h2 className="mb-12 text-center text-3xl font-bold">Projects</h2>
        </Animate>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Animate key={project.title} delay={i * 150}>
              <button
                onClick={() => setOpenProject(i)}
                className="group block w-full rounded-xl border border-stone-200 p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-stone-300 hover:shadow-lg hover:shadow-taupe-500/10 dark:border-stone-800 dark:hover:border-stone-600 dark:hover:shadow-taupe-500/10"
              >
                <h3 className="mb-2 text-lg font-semibold group-hover:text-taupe-600 dark:group-hover:text-taupe-400">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-stone-500 dark:text-stone-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-taupe-100 px-3 py-1 text-xs text-taupe-700 dark:bg-taupe-900 dark:text-taupe-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            </Animate>
          ))}
        </div>
      </div>

      {openProject !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative mx-4 w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-2xl dark:border-stone-700 dark:bg-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 text-stone-400 transition-colors hover:text-stone-600 dark:hover:text-stone-200"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h3 className="mb-6 text-xl font-bold">
              {projects[openProject].title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {projects[openProject].terms.map(({ term }) => (
                <button
                  key={term}
                  onClick={() =>
                    setSelectedTerm(selectedTerm === term ? null : term)
                  }
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedTerm === term
                      ? "bg-taupe-200 text-taupe-800 ring-1 ring-taupe-400 dark:bg-taupe-800 dark:text-taupe-200 dark:ring-taupe-600"
                      : "bg-taupe-100 text-taupe-700 hover:bg-taupe-200 dark:bg-taupe-900 dark:text-taupe-300 dark:hover:bg-taupe-800"
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
            {selectedTerm && (
              <p className="mt-4 text-sm text-stone-600 dark:text-stone-300">
                {projects[openProject].terms.find(
                  (t) => t.term === selectedTerm
                )?.definition}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
