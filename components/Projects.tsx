"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Server, Network } from "lucide-react";

const projects = [
  {
    title: "EduTrade",
    description: "A dedicated campus marketplace platform enabling students to securely buy, sell, and exchange academic resources and essentials within their university ecosystem.",
    icon: <Network className="text-accent" size={32} />,
    tags: ["Next.js", "Full-Stack", "Marketplace"],
    link: "https://edutrade-psi.vercel.app/",
    github: "#"
  },
  {
    title: "Jenkins CI/CD with K8s & Docker",
    description: "An automated deployment pipeline demonstrating containerization and orchestration. Built using Jenkins to continuously integrate and deploy to Kubernetes clusters.",
    icon: <Server className="text-accent" size={32} />,
    tags: ["Jenkins", "Docker", "Kubernetes"],
    link: "#",
    github: "https://github.com/Bisnu-ai/jenkins_practice"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Real-world implementations of DevOps methodologies.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-3xl flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-white/5 rounded-2xl">
                  {project.icon}
                </div>
                <div className="flex gap-3">
                  {project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors z-20 relative cursor-pointer">
                      <Code2 size={24} />
                    </a>
                  )}
                  {project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors z-20 relative cursor-pointer">
                      <ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
              <p className="text-gray-400 mb-6 line-clamp-3">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tIndex) => (
                <span key={tIndex} className="text-xs font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full text-accent">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
