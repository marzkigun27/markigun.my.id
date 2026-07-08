"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCE_TIMELINE } from "@/content";
import { ExperienceItem } from "@/types";
import { HorizontalScrollTrack, AnimatedCard } from "@/components/ui/AnimatedScroll";
import {
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Calendar,
  Sparkles,
  Cpu,
  ArrowRight,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_ICONS: Record<ExperienceItem["type"], React.ReactNode> = {
  Education: <GraduationCap className="w-4 h-4 text-dodger-blue" />,
  "Teaching Assistant": <Award className="w-4 h-4 text-emerald-green" />,
  "Project & Research": <Cpu className="w-4 h-4 text-brick" />,
  "Leadership & Org": <Briefcase className="w-4 h-4 text-charcoal" />,
  Internship: <Sparkles className="w-4 h-4 text-light-salmon-2" />,
};

const TYPE_COLORS: Record<ExperienceItem["type"], string> = {
  Education: "bg-light-sky-blue text-charcoal",
  "Teaching Assistant": "bg-emerald-green text-white",
  "Project & Research": "bg-brick text-white",
  "Leadership & Org": "bg-charcoal text-white",
  Internship: "bg-light-salmon-2 text-charcoal font-bold",
};

interface ChevronCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fillColor?: string;
  badge?: string;
  badgeColor?: "blue" | "emerald" | "brick" | "charcoal" | "salmon";
}

function ChevronCard({
  children,
  fillColor = "fill-[#FAD02C]",
  badge,
  badgeColor = "blue",
  className,
  ...props
}: ChevronCardProps) {
  const badgeColorStyles = {
    blue: "bg-dodger-blue text-white",
    emerald: "bg-emerald-green text-white",
    brick: "bg-brick text-white",
    charcoal: "bg-charcoal text-floral-white",
    salmon: "bg-light-salmon-2 text-charcoal font-bold",
  };

  return (
    <div
      className={cn(
        "group relative w-full h-full flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] active:scale-[0.98] cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {/* Shadow layer: shifted right and down by 8px */}
      <svg
        className="absolute inset-0 w-full h-full -z-20 overflow-visible translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <polygon points="0,0 90,0 100,50 90,100 0,100 10,50" className="fill-charcoal" />
      </svg>

      {/* Main card polygon background & thick border */}
      <svg
        className="absolute inset-0 w-full h-full -z-10 overflow-visible pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <polygon
          points="0,0 90,0 100,50 90,100 0,100 10,50"
          className={cn("stroke-charcoal", fillColor)}
          style={{ strokeWidth: "3.5px", vectorEffect: "non-scaling-stroke" }}
        />
      </svg>

      {/* Badge positioned above top border */}
      {badge && (
        <div
          className={cn(
            "absolute -top-3.5 right-12 sm:right-14 px-3 py-0.5 text-xs font-mono uppercase tracking-widest neo-border-sm z-20 shadow-[2px_2px_0px_#161616]",
            badgeColorStyles[badgeColor]
          )}
        >
          {badge}
        </div>
      )}

      {/* Content wrapper with generous horizontal padding to avoid arrow notch and point */}
      <div className="relative z-10 pl-12 sm:pl-14 lg:pl-16 pr-14 sm:pr-16 lg:pr-18 py-6 sm:py-8 flex flex-col justify-between h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const types: string[] = [
    "ALL",
    "Education",
    "Teaching Assistant",
    "Project & Research",
    "Leadership & Org",
    "Internship",
  ];

  const filteredTimeline =
    filterType === "ALL"
      ? EXPERIENCE_TIMELINE
      : EXPERIENCE_TIMELINE.filter((e) => e.type === filterType);

  const expandedItem = EXPERIENCE_TIMELINE.find((e) => e.id === expandedId);
  const expandedIndex = EXPERIENCE_TIMELINE.findIndex((e) => e.id === expandedId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNextModal = () => {
    if (expandedIndex !== -1 && EXPERIENCE_TIMELINE.length > 0) {
      const nextIdx = (expandedIndex + 1) % EXPERIENCE_TIMELINE.length;
      setExpandedId(EXPERIENCE_TIMELINE[nextIdx].id);
    }
  };

  const handlePrevModal = () => {
    if (expandedIndex !== -1 && EXPERIENCE_TIMELINE.length > 0) {
      const prevIdx = (expandedIndex - 1 + EXPERIENCE_TIMELINE.length) % EXPERIENCE_TIMELINE.length;
      setExpandedId(EXPERIENCE_TIMELINE[prevIdx].id);
    }
  };

  const topBar = (
    <div className="flex items-center justify-between border-b-2 border-charcoal/20 bg-floral-white/95 px-6 sm:px-12 py-3.5 backdrop-blur-md">
      <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-charcoal">
        <Briefcase className="h-4 w-4 text-brick" />
        <span>MODULE 07 // CAREER &amp; ACADEMIC CHRONOLOGY</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex h-2 w-32 bg-gainsboro neo-border-sm overflow-hidden">
          <div
            className="h-full bg-dodger-blue transition-all duration-150"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="font-mono text-xs font-bold text-dodger-blue">
          [ TIMELINE: {Math.round(scrollProgress * 100)}% ]
        </span>
      </div>
    </div>
  );

  const bottomBar = (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-charcoal/20 bg-floral-white/95 px-6 sm:px-12 py-3 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-1.5">
        {types.map((type) => {
          const count =
            type === "ALL"
              ? EXPERIENCE_TIMELINE.length
              : EXPERIENCE_TIMELINE.filter((e) => e.type === type).length;
          const isActive = filterType === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={cn(
                "px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider neo-border-sm transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-charcoal text-floral-white shadow-[2px_2px_0px_#1C8DF0]"
                  : "bg-gainsboro text-charcoal hover:bg-light-salmon"
              )}
            >
              [ {type} ({count}) ]
            </button>
          );
        })}
      </div>
      <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold text-charcoal/70">
        <span>CLICK ANY CHEVRON TO EXPAND FULL DETAILS // SCROLL TO TRAVERSE</span>
        <ArrowRight className="w-3.5 h-3.5 animate-pulse text-dodger-blue" />
      </div>
    </div>
  );

  // Fixed/sticky left panel matching the "Section title" & "Section Description or naration" gray box in sketch
  const leftPanelContent = (
    <div className="w-full max-w-md flex flex-col justify-center space-y-6 select-none pr-4 sm:pr-6">
      <div>
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-charcoal leading-tight mb-2">
          Experience &amp; Education.
        </h2>
        <p className="text-base sm:text-lg font-bold text-dodger-blue underline decoration-charcoal decoration-3 underline-offset-6">
          A track record of rigorous execution.
        </p>
      </div>

      {/* Gray Box matching "Section Description or naration" in user sketch */}
      <div className="p-6 bg-gainsboro neo-border shadow-[4px_4px_0px_#161616] space-y-4">
        <div className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal/70 flex items-center justify-between border-b border-charcoal/20 pb-2">
          <span>// SECTION NARRATION</span>
          <span className="text-dodger-blue font-bold">[ CHRONOLOGY ]</span>
        </div>
        <p className="text-sm sm:text-base text-charcoal/90 leading-relaxed font-medium">
          From maintaining a 3.85 GPA in Engineering Physics to supervising 120+ students in C programming laboratories and leading student technology organizations.
        </p>
        <div className="p-3 bg-floral-white neo-border-sm font-mono text-xs text-charcoal/80 space-y-1">
          <div className="font-bold text-dodger-blue">&gt; TELEMETRY INSTRUCTIONS:</div>
          <div className="text-charcoal/90">Click any yellow chevron button to expand its full experience card.</div>
        </div>
      </div>
    </div>
  );

  const CHEVRON_COLORS = [
    "fill-[#FAD02C]", // Electric Gold
    "fill-[#F1CF79]", // Khaki Gold
    "fill-[#F8C785]", // Peach Gold
    "fill-[#EBD08C]", // Navajo Gold
    "fill-[#F5C000]", // Amber Gold
  ];

  return (
    <>
      <HorizontalScrollTrack
        id="experience"
        heightClass="h-[280vh]"
        onProgressChange={setScrollProgress}
        topBar={topBar}
        bottomBar={bottomBar}
        leftPanel={leftPanelContent}
        className="gap-0 sm:gap-0 lg:gap-0"
      >
        {/* Compact Clickable Chevron Buttons (overlapping/nesting process flow) */}
        {filteredTimeline.map((item, idx) => {
          const fillColor = CHEVRON_COLORS[idx % CHEVRON_COLORS.length];

          return (
            <div
              key={item.id}
              className={cn(
                "w-[78vw] sm:w-[320px] lg:w-[380px] h-[240px] sm:h-[260px] lg:h-[280px] shrink-0 flex flex-col transition-all duration-300",
                idx > 0 ? "-ml-8 sm:-ml-10 lg:-ml-12" : ""
              )}
            >
              <AnimatedCard index={idx} variant="scale-in" className="h-full flex flex-col">
                <ChevronCard
                  fillColor={fillColor}
                  badge={`0${idx + 1}`}
                  badgeColor="blue"
                  onClick={() => setExpandedId(item.id)}
                >
                  <div>
                    {/* Header: Period / Year Badge */}
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-charcoal bg-white/90 px-2.5 py-1 neo-border-sm shadow-[2px_2px_0px_#161616] mb-3">
                      <Calendar className="w-3.5 h-3.5 text-dodger-blue" />
                      <span>{item.period}</span>
                    </div>

                    {/* Title: Role & Organization */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-charcoal leading-snug line-clamp-2">
                      {item.role}
                    </h3>
                    <div className="font-mono text-xs font-bold text-brick uppercase mt-1 line-clamp-1">
                      @ {item.organization}
                    </div>
                  </div>

                  {/* Button Action Indicator */}
                  <div className="pt-3 mt-4 border-t-2 border-charcoal/20 flex items-center justify-between font-mono text-[11px] font-bold text-charcoal/85">
                    <span className="flex items-center gap-1 text-dodger-blue">
                      <span>[ EXPAND DETAILS ]</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                    <span>&gt;&gt;</span>
                  </div>
                </ChevronCard>
              </AnimatedCard>
            </div>
          );
        })}
      </HorizontalScrollTrack>

      {/* EXPANDABLE POPUP MODAL CARD (ON-CLICK) */}
      <AnimatePresence>
        {expandedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedId(null)}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            className="fixed inset-0 z-50 bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              className="bg-white neo-border border-3 border-charcoal shadow-[16px_16px_0px_#1C8DF0] w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col justify-between rounded-xl"
            >
              {/* Modal Header */}
              <div className="bg-charcoal text-floral-white p-6 sm:p-8 flex items-start justify-between gap-4 border-b-3 border-charcoal sticky top-0 z-20">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 neo-border-sm",
                        TYPE_COLORS[expandedItem.type]
                      )}
                    >
                      [ {expandedItem.type} ]
                    </span>
                    <span className="flex items-center gap-1 text-light-sky-blue font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{expandedItem.period}</span>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                    {expandedItem.role}
                  </h3>
                  <div className="font-mono text-sm text-light-salmon-2 font-bold uppercase">
                    @ {expandedItem.organization}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-floral-white/80 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-brick" />
                    <span>{expandedItem.location}</span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setExpandedId(null)}
                  className="p-2.5 bg-brick text-white neo-border-sm hover:bg-salmon hover:text-charcoal transition-colors cursor-pointer shrink-0 shadow-[2px_2px_0px_#ffffff]"
                  title="Close Modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 font-sans">
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-brick font-bold flex items-center gap-1.5">
                    <span>// ROLE OVERVIEW &amp; RESPONSIBILITIES</span>
                  </h4>
                  <div className="bg-gainsboro p-5 neo-border-sm text-base leading-relaxed text-charcoal/90 font-medium">
                    {expandedItem.description}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-dodger-blue font-bold flex items-center gap-1.5">
                    <span>// KEY HIGHLIGHTS &amp; ACHIEVEMENTS</span>
                  </h4>
                  <div className="bg-white p-5 neo-border border-2 border-charcoal shadow-[4px_4px_0px_#161616]">
                    <ul className="space-y-3 font-mono text-xs sm:text-sm">
                      {expandedItem.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-charcoal/90">
                          <span className="text-emerald-green font-bold shrink-0 mt-0.5">&gt;</span>
                          <span className="leading-relaxed">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="bg-gainsboro p-6 sm:p-8 border-t-3 border-charcoal flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-xs font-bold text-charcoal/70">
                  <span>MILESTONE 0{expandedIndex + 1} OF 0{EXPERIENCE_TIMELINE.length} // VERIFIED CHRONOLOGY</span>
                </div>

                {/* Prev / Next Modal Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevModal}
                    className="px-4 py-2.5 bg-white hover:bg-light-salmon neo-border-sm font-mono text-xs font-bold flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_#161616]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>PREV</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextModal}
                    className="px-4 py-2.5 bg-white hover:bg-light-salmon neo-border-sm font-mono text-xs font-bold flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_#161616]"
                  >
                    <span>NEXT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


