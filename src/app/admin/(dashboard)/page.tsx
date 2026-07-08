import React from "react";
import Link from "next/link";
import {
  getProjects,
  getResearchPublications,
  getBlogPosts,
  getSkills,
  getExperienceTimeline,
  getTeachingExperience,
} from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import {
  FolderGit2,
  Microscope,
  BookOpen,
  Wrench,
  Briefcase,
  GraduationCap,
  Sparkles,
  User,
  Mail,
  ArrowRight,
  Database,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const projectsCount = getProjects().length;
  const researchCount = getResearchPublications().length;
  const blogCount = getBlogPosts().length;
  const skillsCount = getSkills().length;
  const experienceCount = getExperienceTimeline().length;
  const teachingCount = getTeachingExperience().length;

  const STATS_CARDS = [
    { label: "Projects", count: projectsCount, href: "/admin/projects", icon: FolderGit2, color: "brick" },
    { label: "Research Papers", count: researchCount, href: "/admin/research", icon: Microscope, color: "dodger-blue" },
    { label: "Blog Posts", count: blogCount, href: "/admin/blog", icon: BookOpen, color: "emerald-green" },
    { label: "Skills & Tools", count: skillsCount, href: "/admin/skills", icon: Wrench, color: "light-salmon" },
    { label: "Experience Items", count: experienceCount, href: "/admin/experience", icon: Briefcase, color: "light-sky-blue" },
    { label: "Teaching Modules", count: teachingCount, href: "/admin/teaching", icon: GraduationCap, color: "brick" },
  ];

  const STATIC_SECTIONS = [
    { label: "Hero Section", description: "Name, tagline, bio, profile photos & stats", href: "/admin/hero", icon: Sparkles },
    { label: "About Journey", description: "Timeline milestones & personal story", href: "/admin/about", icon: User },
    { label: "Contact Info", description: "Email, social links & form subjects", href: "/admin/contact", icon: Mail },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <AdminSectionHeader
        title="System Dashboard"
        description="Welcome to the Content Management System. Select a module below to modify live website telemetry and content."
        badge="MODULE 00 // OVERVIEW"
      />

      {/* System Status Banner */}
      <div className="bg-floral-white neo-border border-3 border-charcoal shadow-[6px_6px_0px_#DA7438] p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brick text-white flex items-center justify-center neo-border-sm shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-charcoal/60">
              Storage Engine
            </div>
            <div className="font-bold text-lg text-charcoal">JSON File System</div>
            <div className="font-mono text-xs text-emerald-green font-bold">● ONLINE / READ-WRITE</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-dodger-blue text-white flex items-center justify-center neo-border-sm shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-charcoal/60">
              Authentication
            </div>
            <div className="font-bold text-lg text-charcoal">Session Cookie</div>
            <div className="font-mono text-xs text-dodger-blue font-bold">__Secure-admin_session</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-charcoal text-white flex items-center justify-center neo-border-sm shrink-0">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-charcoal/60">
              Target Framework
            </div>
            <div className="font-bold text-lg text-charcoal">Next.js 16 (App)</div>
            <div className="font-mono text-xs text-charcoal/70">Server Actions Active</div>
          </div>
        </div>
      </div>

      {/* Collection Stats Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-mono tracking-tight text-floral-white uppercase">
          &gt; Dynamic Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATS_CARDS.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.href}
                href={stat.href}
                className="bg-floral-white neo-border border-3 border-charcoal shadow-[6px_6px_0px_#161616] p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#DA7438] transition-all group flex flex-col justify-between h-40"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-charcoal text-white flex items-center justify-center neo-border-sm group-hover:bg-brick transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-black font-mono text-charcoal">
                    {stat.count}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t-2 border-charcoal/10">
                  <span className="font-bold text-sm text-charcoal uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-charcoal/40 group-hover:text-charcoal group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Static Sections Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-mono tracking-tight text-floral-white uppercase">
          &gt; Page Configurations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATIC_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.href}
                href={sec.href}
                className="bg-floral-white neo-border border-3 border-charcoal shadow-[6px_6px_0px_#161616] p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#3D79F2] transition-all group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-dodger-blue text-white flex items-center justify-center neo-border-sm group-hover:bg-charcoal transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-charcoal/40 group-hover:text-charcoal group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-charcoal uppercase tracking-wide">
                    {sec.label}
                  </h3>
                  <p className="font-mono text-xs text-charcoal/60 mt-1">
                    {sec.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
