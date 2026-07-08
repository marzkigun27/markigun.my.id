"use client";

import React, { useState } from "react";
import { TEACHING_EXPERIENCE } from "@/content";
import { TeachingExperience } from "@/types";
import { NeoCard, type NeoCardProps } from "@/components/ui/NeoCard";
import { HorizontalScrollTrack, AnimatedCard, ParallaxElement } from "@/components/ui/AnimatedScroll";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  CheckCircle, 
  MessageSquareQuote, 
  Terminal,
  Sparkles,
  Award,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function TeachingSection() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const topBar = (
    <div className="flex items-center justify-between border-b-2 border-charcoal/20 bg-floral-white/95 px-6 sm:px-12 py-3.5 backdrop-blur-md">
      <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-charcoal">
        <GraduationCap className="h-4 w-4 text-brick" />
        <span>MODULE 05 // ACADEMIC LEADERSHIP &amp; TEACHING</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex h-2 w-32 bg-gainsboro neo-border-sm overflow-hidden">
          <div 
            className="h-full bg-dodger-blue transition-all duration-150" 
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="font-mono text-xs font-bold text-dodger-blue">
          [ CURRICULUM: {Math.round(scrollProgress * 100)}% ]
        </span>
      </div>
    </div>
  );

  const bottomBar = (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-charcoal/20 bg-floral-white/95 px-6 sm:px-12 py-3 backdrop-blur-md">
      <div className="font-mono text-xs font-bold text-charcoal/80">
        &gt; 300+ STUDENTS INSTRUCTED // ACADEMIC TRACK
      </div>
      <div className="hidden md:flex items-center gap-2 font-mono text-xs font-bold text-charcoal/70">
        <span>SCROLL DOWN TO TRAVERSE TEACHING DECKS</span>
        <ArrowRight className="w-3.5 h-3.5 animate-pulse text-dodger-blue" />
      </div>
    </div>
  );

  return (
    <HorizontalScrollTrack
      id="teaching"
      heightClass="h-[320vh]"
      onProgressChange={setScrollProgress}
      topBar={topBar}
      bottomBar={bottomBar}
    >
      {/* Intro Panel (Card 0) */}
      <div className="w-[85vw] sm:w-[480px] lg:w-[520px] shrink-0 flex flex-col justify-center space-y-6 select-none">
        <ParallaxElement speed={-25} className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-charcoal leading-none">
            Teaching Philosophy.
          </h2>
          <p className="text-lg sm:text-xl font-bold text-dodger-blue underline decoration-charcoal decoration-4 underline-offset-8">
            Making complex physics visual and intuitive.
          </p>
          <p className="text-base text-charcoal/85 max-w-md leading-relaxed pt-2 font-medium">
            As a Head Teaching Assistant at ITB, I have instructed over 300+ undergraduate students across low-level C programming, numerical differential equation solvers, and physics instrumentation. My teaching philosophy centres on live interactive code debugging and hardware visualization.
          </p>
        </ParallaxElement>
        <div className="p-4 bg-gainsboro neo-border font-mono text-xs text-charcoal/80 space-y-2">
          <div className="font-bold text-dodger-blue">[ TELEMETRY INSTRUCTIONS ]</div>
          <div>&gt; Scroll vertically or swipe horizontally to inspect pedagogical pillars and course modules.</div>
        </div>
      </div>

      {/* Teaching Philosophy Pillars (Card 1) */}
      <div className="w-[85vw] sm:w-[500px] lg:w-[580px] h-[75vh] max-h-[660px] shrink-0 flex flex-col">
        <AnimatedCard index={0} variant="scale-in" className="h-full flex flex-col">
          <NeoCard
            variant="charcoal"
            shadow="lg"
            badge="PEDAGOGY // CORE PILLARS"
            badgeColor="blue"
            className="flex flex-col justify-between h-full text-floral-white bg-charcoal border-3 border-floral-white shadow-[8px_8px_0px_#1C8DF0]"
          >
            <div className="space-y-6">
              <div className="border-b-2 border-floral-white/20 pb-4">
                <div className="font-mono text-xs text-light-salmon-2 uppercase tracking-widest font-bold mb-1">
                  // PEDAGOGICAL FRAMEWORK
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  3 Principles of Engineering Leadership
                </h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2 bg-white/10 p-4 neo-border-sm">
                  <div className="flex items-center gap-2 font-mono text-light-salmon-2 font-bold text-sm">
                    <Terminal className="w-4 h-4" />
                    <span>01. DEMYSTIFY SILICON</span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-floral-white/90 leading-relaxed">
                    Students don&apos;t just memorize pointer syntax; I show them how stack frames and heap allocation execute on processor registers using GDB and LLDB.
                  </p>
                </div>

                <div className="space-y-2 bg-white/10 p-4 neo-border-sm">
                  <div className="flex items-center gap-2 font-mono text-light-sky-blue font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>02. AUTOMATE THE TEDIUM</span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-floral-white/90 leading-relaxed">
                    Wrote automated Python/Valgrind memory leak evaluation scripts so TAs spend 100% of lab time on 1-on-1 mentorship rather than manual syntax checking.
                  </p>
                </div>

                <div className="space-y-2 bg-white/10 p-4 neo-border-sm">
                  <div className="flex items-center gap-2 font-mono text-emerald-green font-bold text-sm">
                    <Award className="w-4 h-4" />
                    <span>03. RIGOROUS ERROR ANALYSIS</span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-floral-white/90 leading-relaxed">
                    In physics laboratories, no measurement is complete without uncertainty propagation. Students learn professional SciPy statistical analysis.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t-2 border-floral-white/20 flex items-center justify-between font-mono text-xs text-light-sky-blue">
              <span>STATUS: ACTIVE METHODOLOGY</span>
              <span>ITB.LABS.2024</span>
            </div>
          </NeoCard>
        </AnimatedCard>
      </div>

      {/* Course Teaching Experience Cards (Cards 2-4) */}
      {TEACHING_EXPERIENCE.map((exp, idx) => {
        const cardVariants: NeoCardProps["variant"][] = ["floral", "white", "gainsboro"];
        const variant = cardVariants[idx % cardVariants.length];

        return (
          <div
            key={exp.id}
            className="w-[85vw] sm:w-[500px] lg:w-[560px] h-[75vh] max-h-[660px] shrink-0 flex flex-col"
          >
            <AnimatedCard index={idx + 1} variant="scale-in" className="h-full flex flex-col">
              <NeoCard
                variant={variant}
                shadow="lg"
                badge={exp.code}
                badgeColor={idx === 0 ? "salmon" : "blue"}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  {/* Semester & Student Count */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-charcoal/20 font-mono text-xs">
                    <span className="font-bold text-dodger-blue uppercase tracking-wider">
                      // {exp.semester}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-charcoal/80">
                      <Users className="w-3.5 h-3.5 text-brick" />
                      <span>{exp.studentCount} Students</span>
                    </span>
                  </div>

                  {/* Course Title & Role */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
                    {exp.course}
                  </h3>
                  <div className="font-mono text-xs font-bold text-brick uppercase mb-4">
                    [{exp.role}]
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-charcoal/90 leading-relaxed mb-6 font-medium">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="space-y-2 mb-6">
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-charcoal/70">
                      // KEY RESPONSIBILITIES
                    </div>
                    <ul className="space-y-1.5 font-mono text-xs sm:text-sm">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 text-charcoal/90">
                          <span className="text-emerald-green font-bold shrink-0">&gt;</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Topics Taught */}
                  <div className="space-y-2 mb-6">
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-charcoal/70">
                      // CURRICULUM TOPICS
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 bg-white/90 neo-border-sm font-mono text-[11px] font-bold text-charcoal"
                        >
                          # {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Student Feedback Quote (if present) */}
                {exp.feedbackQuote ? (
                  <div className="pt-4 border-t-2 border-charcoal/20 bg-charcoal text-floral-white p-4 neo-border-sm mt-4">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-light-salmon-2 font-bold mb-1">
                      <MessageSquareQuote className="w-3.5 h-3.5" />
                      <span>STUDENT EVALUATION QUOTE:</span>
                    </div>
                    <p className="font-mono text-xs sm:text-sm italic text-floral-white/90 leading-relaxed">
                      &quot;{exp.feedbackQuote}&quot;
                    </p>
                  </div>
                ) : (
                  <div className="pt-3 mt-4 border-t-2 border-charcoal/20 flex items-center justify-between font-mono text-xs text-charcoal/60">
                    <span>COURSE EVALUATION: EXCELLENT</span>
                    <span>ITB.ACADEMICS</span>
                  </div>
                )}
              </NeoCard>
            </AnimatedCard>
          </div>
        );
      })}
    </HorizontalScrollTrack>
  );
}
