import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, RiskBadge } from "@/components/floodguard/ui-bits";
import { ALERTS, RISK_META } from "@/lib/floodguard-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts & Notifications — Nairobi Flood Guard AI" },
      { name: "description", content: "Critical flood, road and weather alerts for Nairobi wards, filterable by category." },
      { property: "og:title", content: "Alerts & Notifications — Nairobi Flood Guard AI" },
      { property: "og:description", content: "Live flood, road and weather alerts across Nairobi." },
    ],
  }),
  component: AlertsPage,
});

const FILTERS = ["All", "Critical", "High", "Weather", "Roads", "System"] as const;

function AlertsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = ALERTS.filter((a) => filter === "All" || a.category === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts & Notifications"
        subtitle="Every alert is generated from model output, gauge readings and field reports"
        action={
          <Button variant="outline" className="h-11 shrink-0 rounded-xl font-semibold">
            <Check className="mr-1.5 h-4 w-4" /> Mark all read
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              filter === f ? "border-navy bg-navy text-navy-foreground" : "border-border bg-card text-muted-foreground hover:bg-surface-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((a, i) => (
          <article
            key={a.id}
            className="fg-card fg-rise grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-5"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: `color-mix(in oklab, ${RISK_META[a.severity].fill} 15%, transparent)` }}
            >
              <BellRing className="h-5 w-5" style={{ color: RISK_META[a.severity].fill }} />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="truncate font-display text-base font-bold">{a.title}</h2>
                <RiskBadge risk={a.severity} />
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{a.body}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {a.location}
                </span>
                <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {a.category}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
