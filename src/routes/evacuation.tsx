import { createFileRoute } from "@tanstack/react-router";
import { Building2, Navigation, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NairobiMap } from "@/components/floodguard/nairobi-map";
import { PageHeader } from "@/components/floodguard/ui-bits";
import { EVAC_CENTERS } from "@/lib/floodguard-data";

export const Route = createFileRoute("/evacuation")({
  head: () => ({
    meta: [
      { title: "Evacuation Centers — Nairobi Flood Guard AI" },
      { name: "description", content: "Find Nairobi evacuation centers with live capacity, occupancy and a safe route from your location." },
      { property: "og:title", content: "Evacuation Centers — Nairobi Flood Guard AI" },
      { property: "og:description", content: "Live shelter capacity and safe routing to Nairobi evacuation centers." },
    ],
  }),
  component: Evacuation,
});

const statusColor = (s: string) =>
  s === "Available" ? "var(--risk-low)" : s === "Filling Up" ? "var(--risk-moderate)" : "var(--risk-critical)";

function Evacuation() {
  return (
    <div className="space-y-6">
      <PageHeader title="Evacuation Centers" subtitle="Live shelter capacity with flood-aware routing from your current position" />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="fg-card overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-display text-lg font-bold">Shelter network</h2>
            <p className="text-xs text-muted-foreground">Green pins mark centers currently accepting people</p>
          </div>
          <div className="h-[420px] sm:h-[560px]">
            <NairobiMap layers={{ evacuation: true, emergency: true, blocked: true, matatu: false }} />
          </div>
        </section>

        <div className="space-y-4">
          {EVAC_CENTERS.map((c, i) => (
            <article key={c.id} className="fg-card fg-rise p-5" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-soft">
                  <Building2 className="h-5 w-5 text-teal" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-base font-bold">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {c.area} · {c.distanceKm} km away
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4" /> Capacity {c.capacity}
                </span>
                <span className="font-semibold tabular-nums">{c.occupancy}% occupied</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <span className="block h-full rounded-full" style={{ width: `${c.occupancy}%`, backgroundColor: statusColor(c.status) }} />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: `color-mix(in oklab, ${statusColor(c.status)} 15%, transparent)`,
                    color: statusColor(c.status),
                  }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusColor(c.status) }} />
                  {c.status}
                </span>
                <Button
                  disabled={c.status === "Full"}
                  className="h-10 shrink-0 rounded-xl bg-navy font-semibold hover:bg-navy-deep"
                >
                  <Navigation className="mr-1.5 h-4 w-4" /> Get Safe Route
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
