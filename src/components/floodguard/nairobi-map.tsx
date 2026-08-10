import { useState } from "react";
import {
  WARDS,
  ROADS,
  RIVERS,
  MATATU_ROUTES,
  FLOODED_AREAS,
  MAP_PINS,
  RISK_META,
  wardRiskAt,
  type Ward,
  type RiskLevel,
} from "@/lib/floodguard-data";
import { cn } from "@/lib/utils";

export type MapLayers = {
  wards?: boolean;
  roads?: boolean;
  matatu?: boolean;
  flooded?: boolean;
  evacuation?: boolean;
  emergency?: boolean;
  blocked?: boolean;
  rivers?: boolean;
};

const DEFAULT_LAYERS: MapLayers = {
  wards: true,
  roads: true,
  matatu: false,
  flooded: true,
  evacuation: true,
  emergency: false,
  blocked: false,
  rivers: true,
};

export type RouteOverlay = { id: string; d: string; tone: "safe" | "danger"; label?: string };

type Props = {
  layers?: MapLayers;
  rainfall?: number;
  selectedWardId?: string | null;
  onSelectWard?: (ward: Ward | null) => void;
  routes?: RouteOverlay[];
  emergency?: boolean;
  className?: string;
};

function pinTone(kind: string) {
  if (kind === "evacuation") return "var(--risk-low)";
  if (kind === "emergency") return "var(--teal)";
  return "var(--risk-critical)";
}

export function NairobiMap({
  layers,
  rainfall = 42,
  selectedWardId,
  onSelectWard,
  routes = [],
  emergency = false,
  className,
}: Props) {
  const L = { ...DEFAULT_LAYERS, ...layers };
  const [hover, setHover] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 1000 700"
      className={cn("h-full w-full select-none", className)}
      role="img"
      aria-label="Interactive Nairobi flood risk map"
    >
      <defs>
        <linearGradient id="fg-terrain" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={emergency ? "oklch(0.24 0.05 262)" : "oklch(0.975 0.008 210)"} />
          <stop offset="100%" stopColor={emergency ? "oklch(0.18 0.05 264)" : "oklch(0.94 0.014 205)"} />
        </linearGradient>
        <pattern id="fg-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--risk-critical)" strokeWidth="3" opacity="0.35" />
        </pattern>
      </defs>

      <rect width="1000" height="700" fill="url(#fg-terrain)" />
      <g opacity={emergency ? 0.14 : 0.5}>
        {Array.from({ length: 26 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="700" stroke="var(--border)" strokeWidth="1" />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="1000" y2={i * 40} stroke="var(--border)" strokeWidth="1" />
        ))}
      </g>

      {L.rivers &&
        RIVERS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--teal)" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
        ))}

      {L.wards &&
        WARDS.map((w) => {
          const risk: RiskLevel = wardRiskAt(w, rainfall);
          const active = selectedWardId === w.id || hover === w.id;
          return (
            <g key={w.id} className="cursor-pointer" onMouseEnter={() => setHover(w.id)} onMouseLeave={() => setHover(null)}>
              <polygon
                points={w.points}
                fill={RISK_META[risk].fill}
                fillOpacity={active ? 0.82 : emergency ? 0.62 : 0.5}
                stroke={active ? "var(--navy)" : "oklch(1 0 0 / 0.65)"}
                strokeWidth={active ? 3 : 1.5}
                style={{ transition: "fill 400ms ease, fill-opacity 200ms ease" }}
                onClick={() => onSelectWard?.(selectedWardId === w.id ? null : w)}
              />
              <text
                x={w.labelAt[0]}
                y={w.labelAt[1]}
                textAnchor="middle"
                className="pointer-events-none font-semibold"
                fontSize="14"
                fill={emergency ? "oklch(0.98 0 0)" : "oklch(0.24 0.05 260)"}
              >
                {w.name}
              </text>
            </g>
          );
        })}

      {L.flooded &&
        FLOODED_AREAS.map((f) => (
          <g key={f.id}>
            <ellipse cx={f.cx} cy={f.cy} rx={f.rx} ry={f.ry} fill="url(#fg-hatch)" />
            <ellipse
              cx={f.cx}
              cy={f.cy}
              rx={f.rx}
              ry={f.ry}
              fill="none"
              stroke={RISK_META[f.severity].fill}
              strokeWidth="2.5"
              strokeDasharray="6 5"
            />
          </g>
        ))}

      {L.roads &&
        ROADS.map((r) => (
          <g key={r.id}>
            <path d={r.d} fill="none" stroke="oklch(1 0 0 / 0.9)" strokeWidth={r.major ? 9 : 6} strokeLinecap="round" />
            <path
              d={r.d}
              fill="none"
              stroke={emergency ? "oklch(0.72 0.02 250)" : "oklch(0.62 0.02 250)"}
              strokeWidth={r.major ? 4 : 2.5}
              strokeLinecap="round"
            />
          </g>
        ))}

      {L.matatu &&
        MATATU_ROUTES.map((m) => (
          <path
            key={m.id}
            d={m.d}
            fill="none"
            stroke="var(--teal)"
            strokeWidth="3"
            strokeDasharray="10 8"
            strokeLinecap="round"
            style={{ animation: "fg-flow 6s linear infinite" }}
          />
        ))}

      {routes.map((r) => {
        const color = r.tone === "safe" ? "var(--risk-low)" : "var(--risk-critical)";
        return (
          <g key={r.id}>
            <path d={r.d} fill="none" stroke="oklch(1 0 0 / 0.85)" strokeWidth="12" strokeLinecap="round" />
            <path
              d={r.d}
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={r.tone === "safe" ? undefined : "14 10"}
              style={r.tone === "safe" ? undefined : { animation: "fg-flow 5s linear infinite" }}
            />
          </g>
        );
      })}

      {MAP_PINS.filter(
        (p) =>
          (p.kind === "evacuation" && L.evacuation) ||
          (p.kind === "emergency" && L.emergency) ||
          (p.kind === "blocked" && L.blocked),
      ).map((p) => (
        <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
          {p.kind === "blocked" && (
            <circle r="14" fill="var(--risk-critical)" opacity="0.45" style={{ animation: "fg-pulse-ring 2s ease-out infinite" }} />
          )}
          <circle r="11" fill="oklch(1 0 0)" stroke={pinTone(p.kind)} strokeWidth="3" />
          <circle r="4.5" fill={pinTone(p.kind)} />
          <text x="16" y="5" fontSize="12.5" className="font-medium" fill={emergency ? "oklch(0.96 0 0)" : "oklch(0.3 0.04 258)"}>
            {p.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function RiskLegend({ className }: { className?: string }) {
  const order: RiskLevel[] = ["very-low", "low", "moderate", "high", "critical"];
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {order.map((r) => (
        <span key={r} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: RISK_META[r].fill }} />
          {RISK_META[r].label}
        </span>
      ))}
    </div>
  );
}
