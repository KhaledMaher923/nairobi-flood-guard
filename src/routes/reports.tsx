import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, RiskBadge } from "@/components/floodguard/ui-bits";
import { AFFECTED_ROADS, RAINFALL_TRENDS, RISK_META, VULNERABLE_WARDS } from "@/lib/floodguard-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Analytics — Nairobi Flood Guard AI" },
      { name: "description", content: "Seven-day flood risk trends, rainfall patterns, vulnerable wards and route safety analytics for Nairobi." },
      { property: "og:title", content: "Reports & Analytics — Nairobi Flood Guard AI" },
      { property: "og:description", content: "Decision-grade flood analytics for Nairobi operators and authorities." },
    ],
  }),
  component: Reports,
});

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  fontSize: 12,
  boxShadow: "var(--shadow-card)",
};

function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" subtitle="Seven days of risk, rainfall and route performance across Nairobi" />

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="fg-card p-5">
          <h2 className="font-display text-lg font-bold">7-day flood risk trend</h2>
          <p className="text-xs text-muted-foreground">County-wide mean susceptibility score</p>
          <div className="mt-4 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RAINFALL_TRENDS}>
                <defs>
                  <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--teal)" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="risk" stroke="var(--teal)" strokeWidth={2.5} fill="url(#riskFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="fg-card p-5">
          <h2 className="font-display text-lg font-bold">Rainfall trend</h2>
          <p className="text-xs text-muted-foreground">Daily accumulation (mm)</p>
          <div className="mt-4 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RAINFALL_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--surface-muted)" }} />
                <Bar dataKey="rainfall" fill="var(--risk-moderate)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="fg-card p-5">
          <h2 className="font-display text-lg font-bold">Most vulnerable wards</h2>
          <ul className="mt-4 space-y-4">
            {VULNERABLE_WARDS.map((w) => (
              <li key={w.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{w.name}</span>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {w.population.toLocaleString()} exposed
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                    <span className="block h-full rounded-full" style={{ width: `${w.score}%`, backgroundColor: RISK_META[w.risk].fill }} />
                  </div>
                </div>
                <RiskBadge risk={w.risk} />
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-5">
          <section className="fg-card p-5">
            <h2 className="font-display text-base font-bold">Route safety</h2>
            <div className="mt-4 space-y-3">
              {[
                ["Journeys re-routed", "1,284"],
                ["Avg. added travel time", "+6.4 min"],
                ["Flood exposure avoided", "78%"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3 rounded-xl bg-surface-muted p-3 text-sm">
                  <span className="min-w-0 truncate text-muted-foreground">{k}</span>
                  <span className="shrink-0 font-display font-bold tabular-nums">{v}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="fg-card p-5">
            <h2 className="font-display text-base font-bold">AI Model Performance</h2>
            <p className="text-xs text-muted-foreground">Validated on held-out Nairobi flood inventory</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["AUC", "0.897"],
                ["Recall", "0.818"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-surface-muted p-3">
                  <p className="text-xs text-muted-foreground">{k}</p>
                  <p className="font-display text-2xl font-bold tabular-nums text-teal-foreground">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 h-[110px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RAINFALL_TRENDS}>
                  <Line type="monotone" dataKey="risk" stroke="var(--navy)" strokeWidth={2} dot={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>

      <section className="fg-card p-5">
        <h2 className="font-display text-lg font-bold">Most affected roads</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 font-semibold">Road</th>
                <th className="pb-3 font-semibold">Incidents (7d)</th>
                <th className="pb-3 font-semibold">Current status</th>
              </tr>
            </thead>
            <tbody>
              {AFFECTED_ROADS.map((r) => (
                <tr key={r.road} className="border-b border-border/60 last:border-0">
                  <td className="py-3 font-medium">{r.road}</td>
                  <td className="py-3 tabular-nums text-muted-foreground">{r.incidents}</td>
                  <td className="py-3">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor:
                          r.status === "Blocked" ? "color-mix(in oklab, var(--risk-critical) 14%, transparent)" : "var(--surface-muted)",
                        color: r.status === "Blocked" ? "var(--risk-critical)" : "var(--muted-foreground)",
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
