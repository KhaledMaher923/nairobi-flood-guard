import { Link, useRouterState } from "@tanstack/react-router";
import { Map, Route as RouteIcon, Bell, Siren, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/risk-map", label: "Map", icon: Map },
  { to: "/planner", label: "Routes", icon: RouteIcon },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/emergency", label: "Emergency", icon: Siren },
  { to: "/settings", label: "Profile", icon: User },
] as const;

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      {ITEMS.map((item) => {
        const active = pathname === item.to;
        const danger = item.to === "/emergency";
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              active ? "text-teal" : "text-muted-foreground",
              danger && "text-risk-critical",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
