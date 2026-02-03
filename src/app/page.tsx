import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Timeline from "@/components/timeline";
import Projects from "@/components/projects";
import Publications from "@/components/publications";
import Contact from "@/components/contact";
import AcrobaticFigure from "@/components/acrobatic-figure";

export default function Home() {
  return (
    <>
      <AcrobaticFigure />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Publications />
        <Contact />
      </main>
      <footer className="border-t border-stone-200 py-6 text-center text-sm text-stone-400 dark:border-stone-800 dark:text-stone-500">
        &copy; {new Date().getFullYear()} Marcus Pedersen. All rights reserved.
      </footer>
    </>
  );
}
