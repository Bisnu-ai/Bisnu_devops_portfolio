"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#log", tab: "01", label: "log" },
  { href: "#stack", tab: "02", label: "stack" },
  { href: "#builds", tab: "03", label: "builds" },
  { href: "#commits", tab: "04", label: "commits" },
  { href: "#dispatch", tab: "05", label: "dispatch" },
];

export default function Rail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href));

    function onScroll() {
      let current = 0;
      sections.forEach((sec, i) => {
        if (sec && sec.getBoundingClientRect().top <= 140) current = i;
      });
      setActive(current);
    }

    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Section index"
      className="
        fixed top-0 left-0 z-10 h-screen w-[220px]
        border-r border-border px-6 py-7
        flex flex-col justify-between
        max-md:h-auto max-md:w-full max-md:flex-row
        max-md:items-center max-md:border-r-0 max-md:border-b
        max-md:bg-bg max-md:px-4 max-md:py-3
      "
    >
      <div
        className="
          font-mono text-[13px] tracking-wide text-ink-soft
          border border-border rounded-[3px] bg-paper px-2 py-1 w-fit
        "
      >
        AR
      </div>

      <ul
        className="
          flex flex-col gap-[18px]
          max-md:flex-row max-md:gap-3.5 max-md:overflow-x-auto
        "
      >
        {LINKS.map((l, i) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-mono text-sm flex items-baseline gap-2.5 transition-colors"
              style={{ color: i === active ? "var(--pine)" : "var(--ink-soft)" }}
            >
              <span className="text-[11px] text-ink-faint">{l.tab}</span>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="font-mono text-[11px] text-ink-soft flex items-center gap-2 max-md:hidden">
        <span className="w-[7px] h-[7px] rounded-full bg-pine-soft shadow-[0_0_0_3px_rgba(63,99,83,0.15)]" />
        available for work
      </div>
    </nav>
  );
}
