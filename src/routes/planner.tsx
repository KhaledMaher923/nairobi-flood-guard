import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Bus, Car, Clock, Footprints, Navigation, ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NairobiMap } from "@/components/floodguard/nairobi-map";
import { PageHeader, RiskBadge } from "@/components/floodguard/ui-bits";
import { ROUTE_OPTIONS, RISK_META } from "@/lib/floodguard-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Safe Route Planner — Nairobi Flood Guard AI" },
      { name: "description", content: "Compare Nairobi travel routes by flood exposure and pick the safest matatu, driving or walking option." },
      { property: "og:title", content: "Safe Route Planner — Nairobi Flood Guard AI" },
      { property: "og:description", content: "Flood-aware route optimisation for Nairobi commuters and matatu operators." },
    ],
  }),
  component: Planner,
});

const MODES = [
  { id: "matatu", label: "Matatu / Public Transport", icon: Bus },
  { id: "car", label: "Private Car", icon: Car },
  { id: "walk", label: "Walking", icon: Footprints },
];

function Planner() {
  const [from, setFrom] = useState("Nairobi CBD");
  const [to, setTo] = useState("Westlands");
  const [mode, setMode] = useState("matatu");
  const [calculated, setCalculated] = useState(true);
  const [active, setActive] = useState("recommended");

  const recommended = ROUTE_OPTIONS[0]!;

  return (
    <div className="space-y-6">
      <PageHeader title="Route Planner" subtitle="Flood-aware routing that shows you why the safer route is safer" />

      <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="space-y-5">
          <section className="fg-card p-5">
            <h2 className="font-display text-base font-bold">Plan your journey</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">From</label>
                <Input value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5 h-11 rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">To</label>
                <Input value={to} onChange={(e) => setTo(e.target.value)} className="mt-1.5 h-11 rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Travel mode</label>
                <div className="mt-1.5 space-y-2">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                        mode === m.id
                          ? "border-teal bg-teal-soft text-teal-foreground"
                          : "border-border text-muted-foreground hover:bg-surface-muted",
                      )}
                    >
                      <m.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => setCalculated(true)}
                className="h-12 w-full rounded-xl bg-navy text-base font-semibold hover:bg-navy-deep"
              >
                <Navigation className="mr-2 h-4 w-4" /> Find Safest Route
              </Button>
            </div>
          </section>

          {calculated && (
            <section className="fg-card fg-rise overflow-hidden">
              <div className="bg-risk-low/12 px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-risk-low" />
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-risk-low">Safe</p>
                </div>
                <h3 className="mt-1 font-display text-lg font-bold">Recommended Route</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 px-5 py-4">
                <div>
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="font-display text-2xl font-bold tabular-nums">{recommended.eta} min</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="font-display text-2xl font-bold tabular-nums">{recommended.distance} km</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="rounded-xl bg-risk-low/10 p-3">
                  <p className="font-display text-xl font-bold text-risk-low">{recommended.safer}% safer</p>
                  <p className="text-xs text-muted-foreground">{recommended.delta}</p>
                </div>
                <Button variant="outline" className="mt-4 w-full rounded-xl font-semibold">
                  View Route Details <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </section>
          )}
        </div>

        <div className="space-y-5">
          <section className="fg-card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg font-bold">{from} → {to}</h2>
                <p className="text-xs text-muted-foreground">Green = recommended · Red = current route through flood zones</p>
              </div>
              <div className="flex gap-3 text-xs font-medium">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-6 rounded-full bg-risk-low" /> Recommended</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-6 rounded-full bg-risk-critical" /> Current</span>
              </div>
            </div>
            <div className="h-[420px] sm:h-[520px]">
              <NairobiMap
                layers={{ matatu: mode === "matatu", blocked: true, evacuation: false }}
                routes={ROUTE_OPTIONS.map((r) => ({
                  id: r.id,
                  d: r.d,
                  tone: r.id === "recommended" ? "safe" : "danger",
                }))}
              />
            </div>
          </section>

          <div className="grid gap-5 md:grid-cols-2">
            {ROUTE_OPTIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={cn(
                  "fg-card p-5 text-left transition-all",
                  active === r.id ? "ring-2 ring-teal" : "hover:shadow-[var(--shadow-float)]",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="truncate font-display text-base font-bold">{r.name}</h3>
                  <RiskBadge risk={r.risk} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">ETA</p>
                    <p className="font-semibold tabular-nums">{r.eta} min</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="font-semibold tabular-nums">{r.distance} km</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Risk score</p>
                    <p className="font-semibold tabular-nums" style={{ color: RISK_META[r.risk].fill }}>
                      {r.riskScore}/100
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                  <span className="block h-full rounded-full" style={{ width: `${r.riskScore}%`, backgroundColor: RISK_META[r.risk].fill }} />
                </div>
                <ul className="mt-4 space-y-2">
                  {r.hazards.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                      {r.tone === undefined && null}
                      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: RISK_META[r.risk].fill }} />
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {r.delta}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
