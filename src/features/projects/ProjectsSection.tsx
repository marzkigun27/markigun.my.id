"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/content";
import { Project } from "@/types";
import { TactileButton } from "@/components/ui/TactileButton";
import {
  FolderGit2,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  Info,
  FileText
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const CATEGORIES: string[] = [
  "ALL",
  "IoT & Sensor Analytics",
  "Scientific Computing",
  "Full-Stack Systems",
  "Semiconductor & RTL",
  "Materials Simulation",
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0].id);

  const filteredProjects =
    activeCategory === "ALL"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  // Ensure selectedProject is always valid within filtered list
  const selectedProject =
    filteredProjects.find((p) => p.id === selectedId) || filteredProjects[0] || PROJECTS[0];

  const tabColors = [
    { bg: "bg-dodger-blue", text: "text-white", border: "border-dodger-blue", shadow: "#1C8DF0" },
    { bg: "bg-brick", text: "text-white", border: "border-brick", shadow: "#DA7438" },
    { bg: "bg-emerald-green", text: "text-white", border: "border-emerald-green", shadow: "#2ECC71" },
    { bg: "bg-salmon", text: "text-charcoal", border: "border-salmon", shadow: "#FF8C69" },
    { bg: "bg-charcoal", text: "text-white", border: "border-charcoal", shadow: "#161616" },
    { bg: "bg-light-salmon-2", text: "text-charcoal", border: "border-light-salmon-2", shadow: "#FFA07A" },
  ];

  return (
    <section id="projects" className="py-20 sm:py-32 bg-floral-white relative overflow-hidden border-b-3 border-charcoal">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16161608_1px,transparent_1px),linear-gradient(to_bottom,#16161608_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">

        {/* 2-Column Grid Layout (matching Image 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">

          {/* Left Column (lg:col-span-5): Section Title & Narration Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:sticky lg:top-28">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gainsboro neo-border-sm font-mono text-xs font-bold uppercase tracking-widest text-charcoal shadow-[2px_2px_0px_#161616]">
                <FolderGit2 className="h-4 w-4 text-dodger-blue" />
                <span>MODULE 03 // CASE STUDIES</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-charcoal leading-none">
                Featured Systems &amp; Simulations.
              </h2>
              <p className="text-lg sm:text-xl font-bold text-brick font-mono">
                &gt; Interactive Folder Archives.
              </p>
            </div>

            {/* Section Description / Narration Box (Grey Box in Image 2) */}
            <div className="bg-gainsboro neo-border border-3 border-charcoal shadow-[8px_8px_0px_#161616] p-6 sm:p-8 space-y-6">
              {/* <div className="font-mono text-xs font-bold text-dodger-blue uppercase tracking-widest flex items-center gap-2">
                <Info className="w-4 h-4 text-brick" />
                <span>EXECUTIVE NARRATION</span>
              </div>
              <p className="text-sm sm:text-base text-charcoal/90 leading-relaxed font-medium">
                Every project here represents a complete engineering journey—from mathematical problem formulation and hardware circuit design to full-stack cloud deployment and user experience testing.
              </p> */}

              <div className="pt-4 border-t-2 border-charcoal/20 space-y-3">
                <div className="font-mono text-xs font-bold text-charcoal/80">
                  &gt; FILTER ARCHIVES BY CATEGORY:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const count = cat === "ALL" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat);
                          const projList = cat === "ALL" ? PROJECTS : PROJECTS.filter(p => p.category === cat);
                          if (projList.length > 0) setSelectedId(projList[0].id);
                        }}
                        className={cn(
                          "px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider neo-border-sm transition-all duration-150 cursor-pointer",
                          isActive
                            ? "bg-charcoal text-floral-white shadow-[2px_2px_0px_#DA7438] scale-105"
                            : "bg-white text-charcoal hover:bg-light-sky-blue"
                        )}
                      >
                        {cat} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold text-charcoal/60">
              <span>&gt; CLICK RIGHT-SIDE TABS TO TRAVERSE FOLDER</span>
            </div>
          </div>

          {/* Right Column (lg:col-span-7): Folder Component with Right-Side Tabs (matching Image 1) */}
          <div className="lg:col-span-7 flex flex-row items-stretch min-h-[580px] w-full">

            {/* Main Folder Body (Yellow/Cream folder container) */}
            <div className="flex-1 bg-[#FFF8ED] neo-border border-3 border-charcoal shadow-[12px_12px_0px_#1C8DF0] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden rounded-l-xl sm:rounded-l-2xl z-20">

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="space-y-6 flex-1 flex flex-col justify-between"
                >
                  {/* Folder Top Header */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-charcoal/15 pb-3 font-mono text-xs">
                      <span className="font-bold text-dodger-blue uppercase tracking-wider">
                        [ DOC ID: #{selectedProject.id.toUpperCase()} ] // {selectedProject.category}
                      </span>
                      <span className="text-charcoal/70 font-semibold bg-white px-2 py-0.5 neo-border-sm">
                        {selectedProject.date}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal leading-snug">
                      {selectedProject.title}
                    </h3>

                    <div className="bg-dodger-blue/10 p-3 neo-border-sm font-mono text-xs sm:text-sm font-bold text-charcoal border-l-4 border-dodger-blue">
                      &gt; {selectedProject.tagline}
                    </div>
                  </div>

                  {/* 3 Grid Boxes inside Folder (matching Image 1's 3 internal boxes) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">

                    {/* Box 1: Executive Overview */}
                    <div className="bg-white p-4 neo-border-sm shadow-[4px_4px_0px_#161616] flex flex-col justify-between space-y-2">
                      <div>
                        <div className="font-mono text-[10px] font-bold text-dodger-blue uppercase tracking-widest flex items-center gap-1 mb-1.5">
                          <Info className="w-3.5 h-3.5" />
                          <span>01. OVERVIEW</span>
                        </div>
                        <p className="text-xs text-charcoal/90 font-medium leading-relaxed line-clamp-4">
                          {selectedProject.description}
                        </p>
                      </div>
                    </div>

                    {/* Box 2: Problem Statement */}
                    <div className="bg-white p-4 neo-border-sm shadow-[4px_4px_0px_#161616] flex flex-col justify-between space-y-2">
                      <div>
                        <div className="font-mono text-[10px] font-bold text-brick uppercase tracking-widest flex items-center gap-1 mb-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          <span>02. PROBLEM</span>
                        </div>
                        <p className="text-xs text-charcoal/90 font-medium leading-relaxed line-clamp-4">
                          {selectedProject.problem || "Addressing legacy system bottlenecks, concurrent race conditions, and real-time telemetry latency in production environments."}
                        </p>
                      </div>
                    </div>

                    {/* Box 3: Engineered Solution */}
                    <div className="bg-white p-4 neo-border-sm shadow-[4px_4px_0px_#161616] flex flex-col justify-between space-y-2">
                      <div>
                        <div className="font-mono text-[10px] font-bold text-emerald-green uppercase tracking-widest flex items-center gap-1 mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>03. SOLUTION</span>
                        </div>
                        <p className="text-xs text-charcoal/90 font-medium leading-relaxed line-clamp-4">
                          {selectedProject.solution || selectedProject.architecture || "Engineered robust full-stack architecture with strict concurrency safety, custom caching, and sub-100ms response time."}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Folder Bottom Area: Tech Stack & Actions (matching Image 1's Recent Updates) */}
                  <div className="space-y-5 pt-4 border-t-2 border-charcoal/15">

                    {/* Deployed Tech Stack Tags */}
                    <div className="space-y-2">
                      <div className="font-mono text-[11px] font-bold text-charcoal/70 uppercase tracking-widest flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-brick" />
                        <span>DEPLOYED TECHNOLOGY STACK</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-charcoal text-floral-white neo-border-sm font-mono text-xs font-bold shadow-[2px_2px_0px_#DA7438]"
                          >
                            # {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer CTA & Links */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <TactileButton
                          href={`/projects/${selectedProject.slug}`}
                          variant="peach"
                          size="md"
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          VIEW FULL CASE STUDY
                        </TactileButton>

                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white text-charcoal neo-border shadow-[4px_4px_0px_#161616] hover:bg-dodger-blue hover:text-white transition-colors flex items-center gap-1.5 font-mono text-xs font-bold"
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                            <span className="hidden sm:inline">GITHUB</span>
                          </a>
                        )}
                        {selectedProject.liveUrl && (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white text-charcoal neo-border shadow-[4px_4px_0px_#161616] hover:bg-emerald-green hover:text-white transition-colors flex items-center gap-1.5 font-mono text-xs font-bold"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">LIVE</span>
                          </a>
                        )}
                      </div>

                      <div className="font-mono text-xs font-bold text-emerald-green flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>STATUS: VERIFIED</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Protruding Right-Side Number Tabs with Hover Tooltips */}
            <div className="flex flex-col justify-start gap-2 -ml-0.5 py-6 z-10 shrink-0">
              {filteredProjects.map((project, idx) => {
                const isSelected = selectedProject.id === project.id;
                const tabStyle = tabColors[idx % tabColors.length];

                return (
                  <div
                    key={project.id}
                    className="relative group/tab flex items-center"
                    style={{ zIndex: isSelected ? 30 : 10 - idx }}
                  >
                    {/* Tooltip on Hover (appears to the left of the tab inside folder area) */}
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover/tab:opacity-100 transition-all duration-150 pointer-events-none z-50 translate-x-2 group-hover/tab:translate-x-0">
                      <div className="bg-charcoal text-floral-white px-3.5 py-2 font-mono text-xs font-bold neo-border border-2 border-charcoal shadow-[4px_4px_0px_#DA7438] whitespace-nowrap flex items-center gap-2">
                        <span className="text-light-salmon-2 font-bold">0{idx + 1} //</span>
                        <span className="text-white font-bold">{project.category}</span>
                        <span className="text-white/40">|</span>
                        <span className="text-white/90 font-normal truncate max-w-[180px] sm:max-w-[240px]">{project.title}</span>
                      </div>
                    </div>

                    {/* Protruding Number Tab Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedId(project.id)}
                      className={cn(
                        "w-11 sm:w-13 h-12 sm:h-14 font-mono text-base sm:text-lg font-bold uppercase transition-all duration-200 cursor-pointer neo-border border-l-0 rounded-r-lg sm:rounded-r-xl flex items-center justify-center select-none shadow-[4px_4px_0px_#161616]",
                        tabStyle.bg,
                        tabStyle.text,
                        isSelected
                          ? "w-13 sm:w-16 z-30 translate-x-1.5 shadow-[6px_6px_0px_#1C8DF0] brightness-110 scale-105"
                          : "hover:translate-x-0.5 hover:brightness-105 opacity-85 hover:opacity-100"
                      )}
                    >
                      <span>0{idx + 1}</span>
                    </button>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
