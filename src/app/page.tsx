import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400 dark:border-gray-800 dark:text-gray-500">
        &copy; {new Date().getFullYear()} Marcus Pedersen. All rights reserved.
      </footer>
    </>
  );
}
