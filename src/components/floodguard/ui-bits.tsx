import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { RISK_META, SUMMARY, type RiskLevel, type Ward } from "@/lib/floodguard-data";
import { cn } from "@/lib/utils";

export function RiskBadge({ risk, className }: { risk: RiskLevel; className?: string }) {
  const meta = RISK_META[risk];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", className)}
      style={{
        backgroundColor: `color-mix(in oklab, ${meta.fill} 16%, transparent)`,
        color: `color-mix(in oklab, ${meta.fill} 72%, black)`,
      }}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.fill }} />
      {meta.label}
    </span>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate font-display text-2xl font-bold sm:text-[28px]">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {SUMMARY.map((s, i) => {
        const meta = RISK_META[s.risk];
        const down = s.trend.startsWith("-");
        return (
          <div
            key={s.id}
            className="fg-card fg-rise relative overflow-hidden p-5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: meta.fill }} />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-display text-4xl font-bold tabular-nums" style={{ color: meta.fill }}>
                  {s.value}
                </p>
              </div>
              <span
                className="grid h-10 w-10 place-items-center rounded-xl text-sm font-bold"
                style={{ backgroundColor: `color-mix(in oklab, ${meta.fill} 15%, transparent)`, color: meta.fill }}
              >
                {s.value}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{s.description}</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="flex h-8 items-end gap-1">
                {s.bars.map((b, idx) => (
                  <span
                    key={idx}
                    className="w-1.5 rounded-full"
                    style={{ height: `${b * 0.3}px`, backgroundColor: meta.fill, opacity: 0.25 + idx * 0.11 }}
                  />
                ))}
              </div>
              <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                {down ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
                {s.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function WardInfoCard({ ward, onClose }: { ward: Ward; onClose?: () => void }) {
  const meta = RISK_META[ward.risk];
  return (
    <div className="fg-glass fg-rise w-[290px] rounded-2xl p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-bold">{ward.name} Ward</h3>
          <p className="text-xs text-muted-foreground">{ward.subcounty} Sub-County</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-xs font-medium text-muted-foreground hover:text-foreground">
            Close
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <RiskBadge risk={ward.risk} />
        <span className="font-display text-xl font-bold tabular-nums" style={{ color: meta.fill }}>
          {ward.score}%
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
        <span className="block h-full rounded-full transition-all" style={{ width: `${ward.score}%`, backgroundColor: meta.fill }} />
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        {[
          ["Population at Risk", ward.population.toLocaleString()],
          ["Elevation", `${ward.elevation.toLocaleString()} m`],
          ["Rainfall (24h)", `${ward.rainfall24h} mm`],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-semibold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      <Button asChild className="mt-4 w-full rounded-xl bg-navy font-semibold hover:bg-navy-deep">
        <Link to="/risk-map">
          View Full Details <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

export function ExplainableAI({ ward }: { ward: Ward }) {
  return (
    <section className="fg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold">Why is this area at risk?</h2>
          <p className="text-xs text-muted-foreground">Feature importance · {ward.name}</p>
        </div>
        <span className="rounded-full bg-teal-soft px-2.5 py-1 text-[11px] font-semibold text-teal-foreground">
          Explainable AI
        </span>
      </div>

      <div className="mt-5 space-y-3.5">
        {ward.drivers.map((d, i) => (
          <div key={d.factor}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{d.factor}</span>
              <span className="font-semibold tabular-nums text-muted-foreground">{d.weight}%</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-secondary">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${d.weight}%`,
                  backgroundColor: i === 0 ? "var(--teal)" : `color-mix(in oklab, var(--teal) ${70 - i * 18}%, white)`,
                  transition: "width 600ms ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 rounded-xl bg-surface-muted p-3 text-sm leading-relaxed text-muted-foreground">
        Higher flood susceptibility is primarily associated with terrain elevation and slope conditions in this area.
      </p>
    </section>
  );
}
