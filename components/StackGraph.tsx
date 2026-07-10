"use client";

type SkillNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "core" | "tool" | "infra";
  r: number;
};

const COLORS = {
  core: "#2F4C3F",
  tool: "#E8AA3E",
  infra: "#B3453A",
} as const;

const NODES: SkillNode[] = [
  { id: "java", x: 120, y: 70, label: "Java", type: "core", r: 26 },
  { id: "sql", x: 120, y: 200, label: "SQL", type: "core", r: 22 },
  { id: "dsa", x: 260, y: 135, label: "DSA", type: "core", r: 24 },
  { id: "spring", x: 400, y: 60, label: "Spring Boot", type: "tool", r: 24 },
  { id: "grpc", x: 420, y: 170, label: "gRPC", type: "tool", r: 18 },
  { id: "python", x: 260, y: 280, label: "Python", type: "tool", r: 20 },
  { id: "docker", x: 560, y: 100, label: "Docker", type: "infra", r: 20 },
  { id: "postgres", x: 560, y: 220, label: "Postgres", type: "infra", r: 20 },
  { id: "kafka", x: 420, y: 300, label: "Kafka", type: "infra", r: 18 },
  { id: "redis", x: 660, y: 160, label: "Redis", type: "infra", r: 16 },
];

const LINKS: [string, string][] = [
  ["java", "spring"], ["java", "dsa"], ["dsa", "sql"],
  ["spring", "grpc"], ["spring", "docker"], ["sql", "postgres"],
  ["grpc", "docker"], ["docker", "postgres"], ["docker", "redis"],
  ["python", "dsa"], ["python", "postgres"], ["grpc", "kafka"],
  ["kafka", "postgres"], ["docker", "kafka"],
];

export default function StackGraph() {
  const byId: Record<string, SkillNode> = {};
  NODES.forEach((n) => (byId[n.id] = n));

  return (
    <div>
      <div className="bg-paper border border-border rounded-md p-5 mb-5">
        <svg viewBox="0 0 760 380" width="100%" height="100%">
          <g>
            {LINKS.map(([a, b]) => {
              const na = byId[a];
              const nb = byId[b];
              return (
                <path
                  key={`${a}-${b}`}
                  d={`M ${na.x} ${na.y} L ${nb.x} ${nb.y}`}
                  className="fill-none stroke-border stroke-[1.3]"
                />
              );
            })}
          </g>
          <g>
            {NODES.map((n) => (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill="#FBFBF7"
                  stroke={COLORS[n.type]}
                  strokeWidth={2}
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  className="font-mono text-[12px] fill-ink"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="flex gap-6 flex-wrap">
        <span className="font-mono text-xs text-ink-soft flex items-center gap-2">
          <span className="w-[9px] h-[9px] rounded-full inline-block bg-pine" /> core language / runtime
        </span>
        <span className="font-mono text-xs text-ink-soft flex items-center gap-2">
          <span className="w-[9px] h-[9px] rounded-full inline-block bg-amber" /> frameworks &amp; tooling
        </span>
        <span className="font-mono text-xs text-ink-soft flex items-center gap-2">
          <span className="w-[9px] h-[9px] rounded-full inline-block bg-brick" /> infra &amp; data
        </span>
      </div>
    </div>
  );
}
