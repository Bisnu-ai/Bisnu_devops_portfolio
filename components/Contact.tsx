"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      // Reset after a few seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-6">Get in <span className="text-gradient">Touch</span></h2>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass p-8 md:p-12 rounded-3xl flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Name</label>
            <input 
              type="text" 
              id="name" 
              required
              className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" 
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <input 
              type="email" 
              id="email" 
              required
              className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" 
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Message</label>
          <textarea 
            id="message" 
            rows={5}
            required
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none" 
            placeholder="How can I help you?"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status !== "idle"}
          className="mt-4 px-8 py-4 rounded-xl bg-accent text-black font-bold hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "idle" && (
            <>
              Send Message <Send size={20} />
            </>
          )}
          {status === "submitting" && "Sending..."}
          {status === "success" && "Message Sent!"}
        </button>
      </motion.form>
    </section>
  );
}
