import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CloudRain, MapPin, Route as RouteIcon, Users } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { NairobiMap, RiskLegend } from "@/components/floodguard/nairobi-map";
import { PageHeader } from "@/components/floodguard/ui-bits";
import { scenarioFor, RISK_META, WARDS, wardRiskAt } from "@/lib/floodguard-data";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Rainfall Impact Simulator — Nairobi Flood Guard AI" },
      { name: "description", content: "Simulate what-if rainfall scenarios and watch Nairobi flood risk, routes and exposed population change live." },
      { property: "og:title", content: "Rainfall Impact Simulator — Nairobi Flood Guard AI" },
      { property: "og:description", content: "Interactive what-if flood scenario modelling for Nairobi." },
    ],
  }),
  component: Simulator,
});

function Simulator() {
  const [rain, setRain] = useState(42);
  const s = scenarioFor(rain);
  const base = scenarioFor(23);
  const escalationColor = RISK_META[s.escalation === "low" ? "low" : s.escalation === "moderate" ? "moderate" : s.escalation === "high" ? "high" : "critical"].fill;

  return (
    <div className="space-y-6">
      <PageHeader title="Rainfall Impact Simulator" subtitle="Ask “what if?” before the rain arrives — and pre-position response" />

      <section className="fg-card p-5 sm:p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-soft">
              <CloudRain className="h-5 w-5 text-teal" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate font-display text-lg font-bold">Rainfall scenario</h2>
              <p className="text-xs text-muted-foreground">24-hour accumulation across the county</p>
            </div>
          </div>
          <p className="shrink-0 font-display text-4xl font-bold tabular-nums" style={{ color: escalationColor }}>
            {rain} mm
          </p>
        </div>

        <div className="mt-6">
          <Slider value={[rain]} onValueChange={(v) => setRain(v[0] ?? 0)} min={0} max={100} step={1} />
          <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
            <span>0 mm</span>
            <span>50 mm</span>
            <span>100 mm</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: MapPin, label: "Wards at risk", value: s.wardsAtRisk, baseline: base.wardsAtRisk, suffix: "" },
            { icon: RouteIcon, label: "Routes affected", value: s.routesAffected, baseline: base.routesAffected, suffix: "" },
            { icon: MapPin, label: "Roads affected", value: s.roadsAffected, baseline: base.roadsAffected, suffix: "" },
            { icon: Users, label: "People exposed", value: s.populationExposed, baseline: base.populationExposed, suffix: "K" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl border border-border bg-surface-muted p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <m.icon className="h-3.5 w-3.5" /> {m.label}
              </div>
              <p className="mt-1.5 font-display text-3xl font-bold tabular-nums transition-colors" style={{ color: escalationColor }}>
                {m.value}
                {m.suffix}
              </p>
              <p className="text-[11px] text-muted-foreground">
                baseline {m.baseline}
                {m.suffix} at 23 mm
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="fg-card overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-display text-lg font-bold">Projected risk surface</h2>
            <p className="text-xs text-muted-foreground">Ward colours update live with the rainfall slider</p>
          </div>
          <div className="h-[440px] sm:h-[540px]">
            <NairobiMap rainfall={rain} layers={{ flooded: rain > 30, blocked: rain > 60, evacuation: true }} />
          </div>
          <div className="border-t border-border px-5 py-3">
            <RiskLegend />
          </div>
        </section>

        <section className="fg-card p-5">
          <h2 className="font-display text-base font-bold">Ward escalation</h2>
          <p className="text-xs text-muted-foreground">Risk class at {rain} mm</p>
          <ul className="mt-4 space-y-2.5">
            {WARDS.map((w) => {
              const r = wardRiskAt(w, rain);
              const changed = r !== w.risk;
              return (
                <li key={w.id} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full transition-colors" style={{ backgroundColor: RISK_META[r].fill }} />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{w.name}</span>
                  <span className="shrink-0 text-xs font-semibold" style={{ color: changed ? RISK_META[r].fill : "var(--muted-foreground)" }}>
                    {RISK_META[r].label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
