"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <Scene />
      
      <div className="relative z-10 pointer-events-none">
        {/* pointer-events-none on wrapper so 3D scene gets mouse events (if any), 
            but we re-enable it for the content sections */}
        <div className="pointer-events-auto">
          <Hero />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}
