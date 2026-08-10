import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NairobiMap, RiskLegend } from "@/components/floodguard/nairobi-map";
import { ExplainableAI, PageHeader, RiskBadge, WardInfoCard } from "@/components/floodguard/ui-bits";
import { Switch } from "@/components/ui/switch";
import { WARDS, RISK_META, type Ward } from "@/lib/floodguard-data";
import { useEmergency } from "@/components/floodguard/emergency-context";

export const Route = createFileRoute("/risk-map")({
  head: () => ({
    meta: [
      { title: "Flood Risk Map — Nairobi Flood Guard AI" },
      { name: "description", content: "Explore AI-modelled flood susceptibility across Nairobi wards, roads and matatu corridors." },
      { property: "og:title", content: "Flood Risk Map — Nairobi Flood Guard AI" },
      { property: "og:description", content: "Ward-level flood susceptibility, flooded zones and blocked roads across Nairobi." },
    ],
  }),
  component: RiskMap,
});

const LAYER_KEYS = [
  { key: "wards", label: "Flood risk zones" },
  { key: "roads", label: "Major roads" },
  { key: "matatu", label: "Matatu routes" },
  { key: "flooded", label: "Flooded areas" },
  { key: "rivers", label: "Rivers & drainage" },
  { key: "evacuation", label: "Evacuation centers" },
  { key: "emergency", label: "Emergency services" },
  { key: "blocked", label: "Blocked roads" },
] as const;

function RiskMap() {
  const { emergency } = useEmergency();
  const [layers, setLayers] = useState<Record<string, boolean>>({
    wards: true,
    roads: true,
    matatu: true,
    flooded: true,
    rivers: true,
    evacuation: true,
    emergency: true,
    blocked: true,
  });
  const [selected, setSelected] = useState<Ward | null>(WARDS.find((w) => w.id === "mukuru") ?? null);

  return (
    <div className="space-y-6">
      <PageHeader title="Flood Risk Map" subtitle="Ward-level susceptibility modelled from terrain, drainage and live rainfall" />

      <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="space-y-5">
          <section className="fg-card p-5">
            <h2 className="font-display text-base font-bold">Map Layers</h2>
            <div className="mt-4 space-y-3">
              {LAYER_KEYS.map((l) => (
                <label key={l.key} className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate font-medium text-muted-foreground">{l.label}</span>
                  <Switch
                    checked={!!layers[l.key]}
                    onCheckedChange={(v) => setLayers((s) => ({ ...s, [l.key]: v }))}
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="fg-card p-5">
            <h2 className="font-display text-base font-bold">Wards by risk</h2>
            <ul className="mt-3 max-h-[320px] space-y-1.5 overflow-y-auto pr-1">
              {[...WARDS].sort((a, b) => b.score - a.score).map((w) => (
                <li key={w.id}>
                  <button
                    onClick={() => setSelected(w)}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-surface-muted"
                  >
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: RISK_META[w.risk].fill }} />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{w.name}</span>
                    <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">{w.score}%</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-5">
          <section className="fg-card overflow-hidden">
            <div className="relative h-[460px] sm:h-[600px]">
              <NairobiMap
                emergency={emergency}
                layers={layers}
                selectedWardId={selected?.id ?? null}
                onSelectWard={setSelected}
              />
              {selected && (
                <div className="absolute left-4 top-4 hidden sm:block">
                  <WardInfoCard ward={selected} onClose={() => setSelected(null)} />
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3">
              <RiskLegend />
              {selected && <RiskBadge risk={selected.risk} />}
            </div>
          </section>

          {selected && (
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="sm:hidden">
                <WardInfoCard ward={selected} />
              </div>
              <ExplainableAI ward={selected} />
              <section className="fg-card p-5">
                <h2 className="font-display text-lg font-bold">Operational guidance</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    "Advise matatu SACCOs to divert away from low-lying river crossings.",
                    "Pre-position rescue units within 2 km of the highest-scoring wards.",
                    "Notify residents in flagged settlements through SMS cell broadcast.",
                    "Re-run susceptibility model if rainfall exceeds 55 mm in 6 hours.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 rounded-xl bg-surface-muted p-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                      <span className="text-muted-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
