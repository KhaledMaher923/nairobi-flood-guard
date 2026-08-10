import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Map,
  Route as RouteIcon,
  Siren,
  Bell,
  CloudRain,
  BarChart3,
  Building2,
  BookOpen,
  Settings,
  Waves,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/risk-map", label: "Flood Risk Map", icon: Map },
  { to: "/planner", label: "Route Planner", icon: RouteIcon },
  { to: "/emergency", label: "Emergency Mode", icon: Siren },
  { to: "/alerts", label: "Alerts & Notifications", icon: Bell },
  { to: "/simulator", label: "Forecast Simulator", icon: CloudRain },
  { to: "/reports", label: "Reports & Analytics", icon: BarChart3 },
  { to: "/evacuation", label: "Evacuation Centers", icon: Building2 },
  { to: "/resources", label: "Resources", icon: BookOpen },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex h-full w-[264px] flex-col bg-navy text-navy-foreground">
      <div className="flex items-center gap-3 px-5 py-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal/15 ring-1 ring-teal/40">
          <Waves className="h-5 w-5 text-teal" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-bold leading-tight">Nairobi Flood Guard</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal">AI Platform</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto rounded-md p-1.5 text-navy-muted hover:bg-white/10 lg:hidden">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.to;
          const isEmergency = item.to === "/emergency";
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white/12 text-navy-foreground shadow-[inset_2px_0_0_0_var(--teal)]"
                  : "text-navy-muted hover:bg-white/8 hover:text-navy-foreground",
                isEmergency && "text-risk-critical hover:text-risk-critical",
              )}
            >
              <item.icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-teal")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-2xl bg-white/6 p-4 ring-1 ring-white/10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-muted">System Status</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-risk-low opacity-70" style={{ animation: "fg-pulse-ring 2.2s ease-out infinite" }} />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-risk-low" />
          </span>
          <span className="text-sm font-semibold">All Systems Operational</span>
        </div>
        <p className="mt-3 text-[11px] text-navy-muted">Last Updated</p>
        <p className="font-display text-sm font-semibold tabular-nums">10:24 AM</p>
      </div>
    </aside>
  );
}
