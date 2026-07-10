"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Master of Computer Application",
    institution: "Indira Gandhi Institute of Technology, Sarang",
    score: "8.70 CGPA",
    description: "Focusing on advanced software engineering, cloud computing, and modern application development.",
  },
];

export default function Education() {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Academic <span className="text-gradient">Background</span></h2>
        <p className="text-gray-400">My educational qualifications.</p>
      </motion.div>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass p-8 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-accent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-xl text-accent">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-accent text-lg">{edu.institution}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 glass px-4 py-2 rounded-full text-sm font-medium border-accent/20 border text-accent">
                {edu.score}
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed pl-16">
              {edu.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
