"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Zap,
  Globe,
  FlaskConical,
  Share2,
  BarChart2,
  LayoutDashboard,
} from "lucide-react";

const tools = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview",
  },
  {
    href: "/content-engine",
    label: "Content Engine",
    icon: Zap,
    description: "Seed → 4 platforms",
  },
  {
    href: "/landing-page",
    label: "Landing Page",
    icon: Globe,
    description: "Vertical → copy",
  },
  {
    href: "/ab-generator",
    label: "A/B Generator",
    icon: FlaskConical,
    description: "Segment → ad variants",
  },
  {
    href: "/blog-repurpose",
    label: "Blog Repurpose",
    icon: Share2,
    description: "Post → 6 platforms",
  },
  {
    href: "/competitive-intel",
    label: "Competitive Intel",
    icon: BarChart2,
    description: "Company → CI report",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <div>
            <p className="font-semibold text-sm leading-none">Abugo</p>
            <p className="text-xs text-muted-foreground mt-0.5">CMO Toolkit</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const active = pathname === tool.href;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <div className="min-w-0">
                <p className={cn("text-sm font-medium leading-none", active ? "text-primary-foreground" : "")}>
                  {tool.label}
                </p>
                <p className={cn("text-xs mt-0.5 truncate", active ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {tool.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Powered by Claude AI
        </p>
      </div>
    </aside>
  );
}
