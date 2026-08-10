import { Bell, CloudRain, Menu, Search, ShieldCheck, Siren } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmergency } from "./emergency-context";
import { cn } from "@/lib/utils";

export function TopBar({ onMenu }: { onMenu: () => void }) {
  const { emergency, toggleEmergency } = useEmergency();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/85 px-4 py-3 backdrop-blur-xl lg:px-6">
      <button onClick={onMenu} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative min-w-0 flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search location, ward, road..."
          className="h-10 rounded-xl border-border bg-surface-muted pl-9 text-sm"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-xl bg-teal-soft px-3 py-2 xl:flex">
          <CloudRain className="h-4 w-4 text-teal" />
          <div className="leading-tight">
            <p className="text-xs font-semibold text-foreground">22°C · Heavy showers</p>
            <p className="text-[11px] text-muted-foreground">42 mm / 24h</p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={toggleEmergency}
          asChild={false}
          className={cn(
            "hidden h-10 rounded-xl px-3 font-semibold sm:inline-flex",
            emergency
              ? "bg-risk-critical text-white hover:bg-risk-critical/90"
              : "bg-risk-critical/10 text-risk-critical hover:bg-risk-critical/20",
          )}
        >
          <Siren className="mr-1.5 h-4 w-4" />
          {emergency ? "Emergency Active" : "Emergency Mode"}
        </Button>

        <Link to="/alerts" className="relative rounded-xl p-2.5 text-muted-foreground hover:bg-secondary">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-risk-critical text-[10px] font-bold text-white">
            4
          </span>
        </Link>

        <div className="hidden items-center gap-2.5 border-l border-border pl-3 md:flex">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy font-display text-xs font-bold text-navy-foreground">
            AK
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">A. Kariuki</p>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-risk-low" /> Control Center · On duty
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
