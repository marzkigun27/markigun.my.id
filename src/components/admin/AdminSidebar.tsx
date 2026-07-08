"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  User,
  FolderGit2,
  Microscope,
  BookOpen,
  Wrench,
  Briefcase,
  Mail,
  GraduationCap,
  LogOut,
  Menu,
  X,
  Cpu,
} from "lucide-react";

const NAV_SECTIONS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: Sparkles },
  { label: "About", href: "/admin/about", icon: User },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Research", href: "/admin/research", icon: Microscope },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Contact", href: "/admin/contact", icon: Mail },
  { label: "Teaching", href: "/admin/teaching", icon: GraduationCap },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-charcoal text-floral-white neo-border-sm hover:bg-brick transition-colors"
        aria-label="Open admin menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-charcoal/70 z-40"
          onClick={() => setMobileOpen(false)}
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-charcoal border-r-3 border-floral-white/20 flex flex-col z-50 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="p-5 border-b-2 border-floral-white/15 flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-mono font-bold text-sm text-floral-white group"
          >
            <div className="w-8 h-8 bg-brick text-white flex items-center justify-center neo-border-sm">
              <Cpu className="w-5 h-5" />
            </div>
            <span>
              <span className="text-light-salmon-2">CMS</span>
              <span className="text-floral-white/70">@admin:~#</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-floral-white/50 hover:text-white"
            aria-label="Close admin menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-floral-white/40">
            Content Sections
          </div>
          {NAV_SECTIONS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 neo-border-sm",
                  isActive
                    ? "bg-brick text-white shadow-[3px_3px_0px_#F69B66]"
                    : "text-floral-white/70 hover:bg-floral-white/10 hover:text-white border-transparent"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t-2 border-floral-white/15 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 font-mono text-xs text-floral-white/50 hover:text-light-sky-blue transition-colors"
          >
            <span>← View Live Site</span>
          </Link>
          <form action="/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-floral-white/70 hover:bg-brick/30 hover:text-white neo-border-sm border-transparent transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
