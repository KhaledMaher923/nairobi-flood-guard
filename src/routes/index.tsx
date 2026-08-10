import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Droplets, Layers, MapPin, Navigation, Siren, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NairobiMap, RiskLegend } from "@/components/floodguard/nairobi-map";
import { ExplainableAI, PageHeader, RiskBadge, SummaryCards, WardInfoCard } from "@/components/floodguard/ui-bits";
import { useEmergency } from "@/components/floodguard/emergency-context";
import { ALERTS, RISK_META, VULNERABLE_WARDS, WARDS, type Ward } from "@/lib/floodguard-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flood Command Center — Nairobi Flood Guard AI" },
      {
        name: "description",
        content:
          "AI-powered flood risk command center for Nairobi: live ward risk, flooded roads, safe matatu routes and evacuation guidance.",
      },
      { property: "og:title", content: "Flood Command Center — Nairobi Flood Guard AI" },
      {
        property: "og:description",
        content: "Predict, understand, decide and act on Nairobi flood risk in real time.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { emergency, setEmergency } = useEmergency();
  const [selected, setSelected] = useState<Ward | null>(WARDS.find((w) => w.id === "kibra") ?? null);
  const [showMatatu, setShowMatatu] = useState(true);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Flood Command Center"
        subtitle="Predict → Understand → Decide → Act · Live across 85 Nairobi wards"
        action={
          <div className="flex shrink-0 gap-2">
            <Button asChild variant="outline" className="h-11 rounded-xl font-semibold">
              <Link to="/planner">
                <Navigation className="mr-1.5 h-4 w-4" /> Find Safest Route
              </Link>
            </Button>
            <Button
              onClick={() => setEmergency(true)}
              className="h-11 rounded-xl bg-risk-critical font-semibold text-white hover:bg-risk-critical/90"
            >
              <Siren className="mr-1.5 h-4 w-4" /> Activate Emergency
            </Button>
          </div>
        }
      />

      <SummaryCards />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="fg-card relative overflow-hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4 sm:flex sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate font-display text-lg font-bold">Nairobi Flood Risk Map</h2>
              <p className="text-xs text-muted-foreground">Click a ward to inspect its risk profile</p>
            </div>
            <button
              onClick={() => setShowMatatu((v) => !v)}
              className="flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:border-teal hover:text-teal-foreground"
            >
              <Layers className="h-3.5 w-3.5" /> Matatu routes {showMatatu ? "on" : "off"}
            </button>
          </div>

          <div className="relative h-[420px] sm:h-[520px]">
            <NairobiMap
              emergency={emergency}
              layers={{ matatu: showMatatu, blocked: emergency, emergency: emergency }}
              selectedWardId={selected?.id ?? null}
              onSelectWard={setSelected}
            />
            {selected && (
              <div className="absolute right-4 top-4 hidden sm:block">
                <WardInfoCard ward={selected} onClose={() => setSelected(null)} />
              </div>
            )}
          </div>

          <div className="border-t border-border px-5 py-3">
            <RiskLegend />
          </div>
        </section>

        <div className="space-y-5">
          {selected && (
            <div className="sm:hidden">
              <WardInfoCard ward={selected} onClose={() => setSelected(null)} />
            </div>
          )}

          <section className="fg-card p-5">
            <h2 className="font-display text-lg font-bold">Live Situation</h2>
            <div className="mt-4 space-y-3">
              {[
                { icon: Droplets, label: "Rainfall (24h)", value: "42 mm", note: "+18 mm vs yesterday" },
                { icon: Users, label: "Population exposed", value: "184,320", note: "Across 23 wards" },
                { icon: MapPin, label: "Roads affected", value: "17", note: "3 fully impassable" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-xl bg-surface-muted p-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-soft">
                    <s.icon className="h-[18px] w-[18px] text-teal" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="font-display text-lg font-bold leading-tight tabular-nums">{s.value}</p>
                  </div>
                  <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{s.note}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="fg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Most Vulnerable Wards</h2>
              <Link to="/reports" className="text-xs font-semibold text-teal-foreground hover:underline">
                All wards
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {VULNERABLE_WARDS.slice(0, 5).map((w) => (
                <li key={w.id}>
                  <button
                    onClick={() => setSelected(w)}
                    className="flex w-full items-center gap-3 text-left"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{w.name}</span>
                      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-secondary">
                        <span
                          className="block h-full rounded-full"
                          style={{ width: `${w.score}%`, backgroundColor: RISK_META[w.risk].fill }}
                        />
                      </span>
                    </span>
                    <span className="shrink-0 font-display text-sm font-bold tabular-nums">{w.score}%</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="fg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Latest Alerts</h2>
              <Link to="/alerts" className="text-xs font-semibold text-teal-foreground hover:underline">
                View all
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {ALERTS.slice(0, 3).map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: RISK_META[a.severity].fill }} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{a.title}</p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{a.body}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{a.location} · {a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ExplainableAI ward={selected ?? WARDS[0]!} />
        <section className="fg-card flex flex-col justify-between gap-5 p-5">
          <div>
            <h2 className="font-display text-lg font-bold">Decide & Act</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The model predicts, the map explains, and these actions close the loop for operators and commuters.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { to: "/planner", label: "Find Safest Route", note: "Compare flood exposure" },
              { to: "/simulator", label: "Simulate Scenario", note: "What-if rainfall model" },
              { to: "/evacuation", label: "Find Evacuation Center", note: "Live capacity" },
              { to: "/alerts", label: "View Alerts", note: "4 unread" },
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-muted p-4 transition-colors hover:border-teal hover:bg-teal-soft"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{a.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.note}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <RiskBadge risk="critical" />
            <span className="text-xs text-muted-foreground">12 wards require immediate operator attention</span>
          </div>
        </section>
      </div>
    </div>
  );
}
