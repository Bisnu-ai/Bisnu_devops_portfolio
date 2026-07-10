"use client";

import { useEffect, useRef } from "react";

type Node = { id: number; x: number; y: number };

const NODES: Node[] = [
  { id: 0, x: 230, y: 40 },
  { id: 1, x: 90, y: 120 },
  { id: 2, x: 370, y: 120 },
  { id: 3, x: 40, y: 230 },
  { id: 4, x: 160, y: 220 },
  { id: 5, x: 300, y: 230 },
  { id: 6, x: 420, y: 230 },
  { id: 7, x: 110, y: 330 },
  { id: 8, x: 250, y: 340 },
  { id: 9, x: 380, y: 340 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6],
  [4, 7], [4, 8], [5, 8], [6, 9], [3, 7], [5, 9],
];

export default function HeroGraph() {
  const nodeRefs = useRef<Record<number, SVGCircleElement | null>>({});
  const edgeRefs = useRef<Record<string, SVGPathElement | null>>({});

  useEffect(() => {
    const adj: Record<number, number[]> = {};
    NODES.forEach((n) => (adj[n.id] = []));
    EDGES.forEach(([a, b]) => {
      adj[a].push(b);
      adj[b].push(a);
    });

    function bfsOrder(start: number) {
      const visited = new Set([start]);
      const order: { node: number; via: number | null }[] = [
        { node: start, via: null },
      ];
      const queue = [start];
      while (queue.length) {
        const cur = queue.shift()!;
        adj[cur].forEach((next) => {
          if (!visited.has(next)) {
            visited.add(next);
            order.push({ node: next, via: cur });
            queue.push(next);
          }
        });
      }
      return order;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function runTraversal() {
      Object.values(nodeRefs.current).forEach((c) => {
        c?.setAttribute("fill", "#CFD6C4");
      });
      Object.values(edgeRefs.current).forEach((p) => p?.classList.remove("lit"));

      const order = bfsOrder(0);
      const colors = ["#2F4C3F", "#3F6353", "#E8AA3E"];

      order.forEach((step, i) => {
        const t = setTimeout(() => {
          nodeRefs.current[step.node]?.setAttribute("fill", colors[i % colors.length]);
          if (step.via !== null) {
            edgeRefs.current[`${step.via}-${step.node}`]?.classList.add("lit");
          }
        }, i * 180);
        timeouts.push(t);
      });
    }

    runTraversal();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let interval: ReturnType<typeof setInterval> | undefined;
    if (!prefersReduced) {
      interval = setInterval(runTraversal, 6500);
    }

    return () => {
      timeouts.forEach(clearTimeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative">
      <svg viewBox="0 0 460 420" width="100%" height="100%" aria-hidden="true">
        <g>
          {EDGES.map(([a, b]) => {
            const na = NODES[a];
            const nb = NODES[b];
            return (
              <path
                key={`${a}-${b}`}
                ref={(el) => {
                  edgeRefs.current[`${a}-${b}`] = el;
                  edgeRefs.current[`${b}-${a}`] = el;
                }}
                d={`M ${na.x} ${na.y} L ${nb.x} ${nb.y}`}
                className="fill-none stroke-border stroke-[1.4] transition-[stroke] duration-300 [&.lit]:stroke-pine-soft"
              />
            );
          })}
        </g>
        <g>
          {NODES.map((n) => (
            <circle
              key={n.id}
              ref={(el) => {
                nodeRefs.current[n.id] = el;
              }}
              cx={n.x}
              cy={n.y}
              r={n.id === 0 ? 7 : 5.5}
              fill="#CFD6C4"
              className="transition-[fill] duration-300"
            />
          ))}
        </g>
      </svg>
      <p className="font-mono text-[11px] text-ink-faint text-center mt-1">
        bfs traversal — recomputed on load
      </p>
    </div>
  );
}
