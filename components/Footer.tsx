"use client";

import { Code2, Briefcase, Mail } from "lucide-react";

const GithubColored = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#7562D8"/>
    <path fill="#fff" d="M12 4.5c-4.14 0-7.5 3.36-7.5 7.5 0 3.31 2.15 6.12 5.13 7.11.38.07.51-.16.51-.36v-1.28c-2.08.45-2.52-.92-2.52-.92-.34-.86-.83-1.09-.83-1.09-.68-.47.05-.46.05-.46.75.05 1.15.77 1.15.77.67 1.14 1.76.81 2.19.62.07-.49.26-.81.47-1-1.66-.19-3.41-.83-3.41-3.7 0-.82.29-1.49.77-2.02-.08-.19-.33-.96.07-1.99 0 0 .63-.2 2.06.77a7.17 7.17 0 0 1 3.75 0c1.43-.97 2.06-.77 2.06-.77.4 1.03.15 1.8.07 1.99.48.53.77 1.2.77 2.02 0 2.88-1.76 3.51-3.42 3.7.27.23.51.69.51 1.39v2.06c0 .2.13.44.52.36 2.98-.99 5.13-3.8 5.13-7.11 0-4.14-3.36-7.5-7.5-7.5z"/>
  </svg>
);

const LinkedinColored = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#0A66C2"/>
    <path fill="#fff" d="M7.4 20H4.2V9.6h3.2V20zM5.8 8.2a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm14 11.8h-3.2v-5c0-1.2-.4-2-1.5-2-.8 0-1.3.5-1.5 1-.1.2-.1.5-.1.8v5.2h-3.2s.1-9.4 0-10.4h3.2v1.5c.4-.7 1.2-1.6 3-1.6 2.2 0 3.8 1.4 3.8 4.5v6z"/>
  </svg>
);

const MailColored = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" fill="#fff" stroke="#333" strokeWidth="1.5"/>
    <path d="M2 7l10 6 10-6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative mt-20 pt-16 pb-8 border-t border-white/10 glass before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/80 before:-z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">Bisnu.</h2>
          <p className="text-gray-400">DevOps & Cloud Engineer</p>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/Bisnu-ai" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:bg-white/10 transition-all hover:-translate-y-1">
            <GithubColored />
          </a>
          <a href="https://www.linkedin.com/in/bisnu-ai" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:bg-white/10 transition-all hover:-translate-y-1">
            <LinkedinColored />
          </a>
          <a href="mailto:sambunu2003@gmail.com" className="p-3 glass rounded-full hover:bg-white/10 transition-all hover:-translate-y-1">
            <MailColored />
          </a>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Bisnu. All rights reserved.</p>
      </div>
    </footer>
  );
}
