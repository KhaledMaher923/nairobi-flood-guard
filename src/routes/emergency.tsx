import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Building2, Phone, Radio, Route as RouteIcon, Siren, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NairobiMap, RiskLegend } from "@/components/floodguard/nairobi-map";
import { PageHeader } from "@/components/floodguard/ui-bits";
import { useEmergency } from "@/components/floodguard/emergency-context";
import { ALERTS, EVAC_CENTERS, RISK_META, WARDS } from "@/lib/floodguard-data";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Mode — Nairobi Flood Guard AI" },
      { name: "description", content: "Emergency flood command view: critical zones, blocked roads, safe corridors and evacuation capacity." },
      { property: "og:title", content: "Emergency Mode — Nairobi Flood Guard AI" },
      { property: "og:description", content: "Activate the Nairobi flood emergency command center in one tap." },
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  const { emergency, setEmergency } = useEmergency();
  const critical = WARDS.filter((w) => w.risk === "critical" || w.risk === "high");

  if (!emergency) {
    return (
      <div className="space-y-6">
        <PageHeader title="Emergency Mode" subtitle="Switch the platform into a single-purpose flood response command center" />
        <section className="fg-card flex flex-col items-center gap-6 p-10 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-3xl bg-risk-critical/12">
            <Siren className="h-9 w-9 text-risk-critical" />
          </span>
          <div className="max-w-lg">
            <h2 className="font-display text-2xl font-bold">Standby — Emergency Mode is off</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Activating reconfigures every screen around critical flood zones, blocked roads, safe corridors,
              evacuation capacity and emergency contacts. Use it when conditions require coordinated response.
            </p>
          </div>
          <Button
            onClick={() => setEmergency(true)}
            className="h-14 rounded-2xl bg-risk-critical px-8 font-display text-base font-bold text-white hover:bg-risk-critical/90"
          >
            <Siren className="mr-2 h-5 w-5" /> ACTIVATE EMERGENCY MODE
          </Button>
          <div className="grid w-full gap-3 sm:grid-cols-4">
            {[
              { icon: AlertTriangle, label: "Critical Alerts" },
              { icon: RouteIcon, label: "Safe Routes" },
              { icon: Building2, label: "Evacuation Centers" },
              { icon: Phone, label: "Emergency Contacts" },
            ].map((q) => (
              <div key={q.label} className="rounded-2xl border border-border bg-surface-muted p-4">
                <q.icon className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-xs font-semibold text-muted-foreground">{q.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-risk-critical text-white shadow-[var(--shadow-float)]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5 sm:flex sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
              <Siren className="h-6 w-6" />
              <span className="absolute inset-0 rounded-2xl bg-white/40" style={{ animation: "fg-pulse-ring 2s ease-out infinite" }} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg font-bold tracking-wide sm:text-xl">EMERGENCY MODE ACTIVE</p>
              <p className="truncate text-sm text-white/85">Critical flood conditions detected in multiple Nairobi wards.</p>
            </div>
          </div>
          <Button
            onClick={() => setEmergency(false)}
            variant="secondary"
            className="shrink-0 rounded-xl bg-white/15 font-semibold text-white hover:bg-white/25"
          >
            Stand down
          </Button>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: AlertTriangle, label: "Critical Alerts", value: "7 active", to: "/alerts" },
          { icon: RouteIcon, label: "Safe Routes", value: "9 corridors open", to: "/planner" },
          { icon: Building2, label: "Evacuation Centers", value: "5 · 2,680 beds", to: "/evacuation" },
          { icon: Phone, label: "Emergency Contacts", value: "999 · 112 · 0800", to: "/resources" },
        ].map((q) => (
          <Link key={q.label} to={q.to} className="fg-card group flex items-center gap-4 p-5 transition-colors hover:border-risk-critical">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-risk-critical/12">
              <q.icon className="h-5 w-5 text-risk-critical" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{q.label}</p>
              <p className="truncate text-xs text-muted-foreground">{q.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="fg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-display text-lg font-bold">Critical Zone Overview</h2>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-risk-critical">
              <Radio className="h-3.5 w-3.5" /> Live feed
            </span>
          </div>
          <div className="h-[440px] sm:h-[560px]">
            <NairobiMap
              emergency
              layers={{ blocked: true, emergency: true, evacuation: true, matatu: true }}
              routes={[{ id: "safe", d: "M470,330 C520,270 600,240 700,200", tone: "safe" }]}
            />
          </div>
          <div className="border-t border-border px-5 py-3">
            <RiskLegend />
          </div>
        </section>

        <div className="space-y-5">
          <section className="fg-card p-5">
            <h2 className="font-display text-base font-bold">Population potentially affected</h2>
            <p className="mt-2 font-display text-4xl font-bold tabular-nums text-risk-critical">184,320</p>
            <p className="text-xs text-muted-foreground">Across {critical.length} high and critical wards</p>
            <ul className="mt-4 space-y-2.5">
              {critical.map((w) => (
                <li key={w.id} className="flex items-center gap-3 rounded-xl bg-surface-muted p-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: RISK_META[w.risk].fill }} />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{w.name}</span>
                  <span className="flex shrink-0 items-center gap-1 text-xs tabular-nums text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> {w.population.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="fg-card p-5">
            <h2 className="font-display text-base font-bold">Active alerts</h2>
            <ul className="mt-3 space-y-3">
              {ALERTS.filter((a) => a.severity === "critical" || a.severity === "high").map((a) => (
                <li key={a.id} className="rounded-xl border-l-4 bg-surface-muted p-3" style={{ borderColor: RISK_META[a.severity].fill }}>
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="fg-card p-5">
            <h2 className="font-display text-base font-bold">Shelter capacity</h2>
            <ul className="mt-3 space-y-3">
              {EVAC_CENTERS.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate font-medium">{c.name}</span>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{c.occupancy}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${c.occupancy}%`,
                        backgroundColor: c.occupancy > 90 ? "var(--risk-critical)" : c.occupancy > 70 ? "var(--risk-moderate)" : "var(--risk-low)",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
