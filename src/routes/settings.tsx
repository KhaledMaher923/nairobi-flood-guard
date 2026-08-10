import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/floodguard/ui-bits";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Profile — Nairobi Flood Guard AI" },
      { name: "description", content: "Manage operator profile, alert thresholds and notification channels for Nairobi Flood Guard AI." },
      { property: "og:title", content: "Settings & Profile — Nairobi Flood Guard AI" },
      { property: "og:description", content: "Operator preferences, alert thresholds and notification channels." },
    ],
  }),
  component: SettingsPage,
});

const TOGGLES = [
  { label: "Critical flood alerts", note: "Push and SMS, always on for control center staff", on: true },
  { label: "Road closure alerts", note: "Notify when a corridor becomes impassable", on: true },
  { label: "Weather forecasts", note: "6-hour rainfall outlook digests", on: true },
  { label: "Weekly analytics digest", note: "Sunday summary of ward and route performance", on: false },
];

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Operator profile, alert thresholds and delivery channels" />

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="fg-card p-5">
          <h2 className="font-display text-lg font-bold">Operator profile</h2>
          <div className="mt-4 flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy font-display text-lg font-bold text-navy-foreground">
              AK
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold">A. Kariuki</p>
              <p className="truncate text-xs text-muted-foreground">Control Center Operator · Nairobi County</p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Display name</label>
              <Input defaultValue="A. Kariuki" className="mt-1.5 h-11 rounded-xl" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Duty phone</label>
              <Input defaultValue="+254 700 000 000" className="mt-1.5 h-11 rounded-xl" />
            </div>
            <Button className="h-11 w-full rounded-xl bg-navy font-semibold hover:bg-navy-deep">Save changes</Button>
          </div>
        </section>

        <section className="fg-card p-5">
          <h2 className="font-display text-lg font-bold">Notifications</h2>
          <ul className="mt-4 space-y-4">
            {TOGGLES.map((t) => (
              <li key={t.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{t.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.note}</p>
                </div>
                <Switch defaultChecked={t.on} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
