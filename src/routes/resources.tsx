import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, LifeBuoy, Phone, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/floodguard/ui-bits";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Emergency Contacts — Nairobi Flood Guard AI" },
      { name: "description", content: "Flood preparedness guidance, emergency contacts and response resources for Nairobi residents and operators." },
      { property: "og:title", content: "Resources & Emergency Contacts — Nairobi Flood Guard AI" },
      { property: "og:description", content: "Preparedness guides and emergency contacts for Nairobi flood response." },
    ],
  }),
  component: Resources,
});

const CONTACTS = [
  { name: "National Emergency", number: "999 / 112", note: "Police, fire and ambulance" },
  { name: "Nairobi County Disaster Ops", number: "0800 720 000", note: "24/7 flood response desk" },
  { name: "Kenya Red Cross", number: "1199", note: "Rescue and shelter support" },
  { name: "Kenya Power Faults", number: "97771", note: "Report submerged lines" },
];

const GUIDES = [
  { title: "Before the rains", body: "Clear drains, know your ward risk class and agree a family meeting point above flood level." },
  { title: "During flooding", body: "Never cross moving water above knee height. Avoid underpasses and riverine footbridges." },
  { title: "For matatu operators", body: "Check corridor status before departure and use the recommended diversion routes." },
  { title: "After the water recedes", body: "Boil drinking water, report damaged roads and check on vulnerable neighbours." },
];

function Resources() {
  return (
    <div className="space-y-6">
      <PageHeader title="Resources" subtitle="Preparedness guidance and the numbers that matter when minutes count" />

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="fg-card p-5">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-risk-critical" />
            <h2 className="font-display text-lg font-bold">Emergency contacts</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {CONTACTS.map((c) => (
              <li key={c.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-surface-muted p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.note}</p>
                </div>
                <span className="shrink-0 font-display text-base font-bold tabular-nums">{c.number}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="fg-card p-5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal" />
            <h2 className="font-display text-lg font-bold">Preparedness guides</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {GUIDES.map((g) => (
              <li key={g.title} className="rounded-xl border border-border p-4">
                <p className="text-sm font-semibold">{g.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{g.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="fg-card grid gap-4 p-5 sm:grid-cols-2">
        {[
          { icon: ShieldCheck, title: "Data sources", body: "SRTM elevation, Sentinel-1 flood extents, KMD rainfall gauges and county road inventories." },
          { icon: LifeBuoy, title: "How the model works", body: "A gradient-boosted susceptibility model scores every ward, then a cost-aware router penalises flood-exposed segments." },
        ].map((c) => (
          <div key={c.title} className="flex gap-3 rounded-2xl bg-surface-muted p-4">
            <c.icon className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">{c.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
