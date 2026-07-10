"use client";

import { motion } from "framer-motion";
import { Container, Cloud, Code, GitBranch, Database } from "lucide-react";

const skills = [
  { name: "Kubernetes & Docker", icon: <Container size={24} />, desc: "Container orchestration & management" },
  { name: "AWS", icon: <Cloud size={24} />, desc: "Cloud infrastructure architecture" },
  { name: "Terraform", icon: <Code size={24} />, desc: "Infrastructure as Code (IaC)" },
  { name: "CI/CD Pipelines", icon: <GitBranch size={24} />, desc: "Jenkins, GitHub Actions, GitLab CI" },
  { name: "Monitoring & Logging", icon: <Database size={24} />, desc: "Prometheus, Grafana, ELK Stack" },
];

export default function Skills() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Core <span className="text-gradient">Competencies</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Tools and technologies I use to build resilient, scalable, and secure systems.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass p-6 rounded-2xl flex flex-col items-start hover:border-accent transition-all cursor-default"
          >
            <div className="p-3 bg-white/5 rounded-xl text-accent mb-4">
              {skill.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
            <p className="text-gray-400 text-sm">{skill.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
