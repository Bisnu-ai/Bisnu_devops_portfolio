"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5+", label: "Months Experience" },
  { value: "10+", label: "Tools Mastered" },
  { value: "50+", label: "Deployments" },
  { value: "99.9%", label: "Target Uptime" },
];

export default function Stats() {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto -mt-10 relative z-20">
      <div className="glass rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
