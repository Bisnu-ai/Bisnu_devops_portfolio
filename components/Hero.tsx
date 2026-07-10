"use client";

import { motion } from "framer-motion";
import { Terminal, Server, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass p-8 md:p-12 rounded-3xl max-w-3xl w-full"
      >
        <div className="flex justify-center gap-4 mb-6 text-accent">
          <Terminal size={32} />
          <Server size={32} />
          <Shield size={32} />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          Hi, I'm <span className="text-gradient">Bisnu</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-400 mb-6 font-light">
          DevOps & Cloud Engineer
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
          I automate the future. Specializing in scalable infrastructure, CI/CD pipelines, and robust cloud architecture. Bridging the gap between development and operations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="px-8 py-4 rounded-full bg-accent text-black font-bold hover:bg-white transition-colors duration-300 inline-block">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full glass hover:bg-white/10 transition-colors duration-300 font-medium inline-block">
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
}
