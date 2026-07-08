"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom,
  Terminal,
  Cpu,
  LineChart,
  Microscope,
  GraduationCap,
  ArrowRight,
  Flame,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const JOURNEY_NODES = [
  {
    year: "2022",
    title: "The Physics Foundation",
    subtitle: "Entered ITB Engineering Physics",
    icon: <Atom className="w-6 h-6 text-brick" />,
    color: "floral" as const,
    badgeColor: "brick" as const,
    description:
      "Chose Engineering Physics to understand how technology works from first principles—from Schrödinger's wave equation and thermodynamics to Maxwell's electromagnetism.",
    skills: ["Classical Mechanics", "Thermodynamics", "Linear Algebra", "Vector Calculus"],
  },
  {
    year: "2023",
    title: "Systems Programming & Numerical Methods",
    subtitle: "Low-Level C & MATLAB Simulation",
    icon: <Terminal className="w-6 h-6 text-dodger-blue" />,
    color: "gainsboro" as const,
    badgeColor: "blue" as const,
    description:
      "Realized that physics without computational power is just theory. Mastered C programming, memory allocation, pointers, and numerical differential solvers.",
    skills: ["C / C++", "MATLAB", "Numerical ODE Solvers", "Linux Command Line"],
  },
  {
    year: "2024",
    title: "Teaching Assistantship & Leadership",
    subtitle: "Head TA for C Programming (120+ Students)",
    icon: <GraduationCap className="w-6 h-6 text-emerald-green" />,
    color: "white" as const,
    badgeColor: "emerald" as const,
    description:
      "Appointed Head TA. Authored 8 laboratory modules, led weekly 3-hour lectures, and engineered an automated Python/Valgrind memory leak grader.",
    skills: ["Mentorship", "Automated Grading", "Valgrind", "Public Speaking"],
  },
  {
    year: "2025 (EARLY)",
    title: "IoT & Real-Time Sensor Analytics",
    subtitle: "Deploying ESP32 Kalman Filter Arrays",
    icon: <LineChart className="w-6 h-6 text-brick" />,
    color: "salmon" as const,
    badgeColor: "salmon" as const,
    description:
      "Bridged hardware and web software by building an indoor air quality monitoring platform. Wrote embedded dual-stage Kalman filters in C++ connected to Next.js WebSockets.",
    skills: ["ESP32 / C++", "MQTT & WebSockets", "TimescaleDB", "Next.js App Router"],
  },
  {
    year: "2025 (MID)",
    title: "Supercomputers & Materials Simulation",
    subtitle: "First-Principles DFT Research Group",
    icon: <Microscope className="w-6 h-6 text-dodger-blue" />,
    color: "sky" as const,
    badgeColor: "blue" as const,
    description:
      "Joined the Solid State Physics lab. Wrote automated Python HPC pipelines wrapping Quantum ESPRESSO to simulate 2D semiconductor alloy bandgaps on 64-core clusters.",
    skills: ["Quantum ESPRESSO", "Python / SciPy", "Slurm HPC", "Bandgap Engineering"],
  },
  {
    year: "2025 (LATE)",
    title: "Semiconductor RTL & FPGA Processor Design",
    subtitle: "32-bit RISC-V Pipelined CPU on Xilinx Artix-7",
    icon: <Cpu className="w-6 h-6 text-charcoal" />,
    color: "charcoal" as const,
    badgeColor: "charcoal" as const,
    description:
      "Went down to the silicon transistor level. Designed, verified, and synthesized a 5-stage pipelined RISC-V processor core with matrix co-processor in SystemVerilog.",
    skills: ["SystemVerilog", "Xilinx Vivado", "RTL Verification", "FPGA Architecture"],
  },
];

export function AboutSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % JOURNEY_NODES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + JOURNEY_NODES.length) % JOURNEY_NODES.length);
  };

  const currentMilestone = JOURNEY_NODES[activeIdx];

  return (
    <section id="about" className="py-20 sm:py-32 bg-floral-white relative overflow-hidden border-b-3 border-charcoal">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16161608_1px,transparent_1px),linear-gradient(to_bottom,#16161608_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">

          {/* Column 1 (Leftmost): Section Title & Description */}
          <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gainsboro neo-border-sm font-mono text-xs font-bold uppercase tracking-widest text-charcoal shadow-[2px_2px_0px_#161616]">
                <Flame className="h-4 w-4 text-brick" />
                <span>MODULE 01 // ABOUT</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-charcoal leading-none">
                Not just another frontend developer.
              </h2>
              <p className="text-lg sm:text-xl font-bold text-dodger-blue underline decoration-charcoal decoration-4 underline-offset-8">
                An engineer who speaks physics.
              </p>
              <p className="text-base text-charcoal/85 leading-relaxed font-medium">
                Most software engineers treat computer hardware as a black box. As an Engineering Physics student at ITB, I have spent the last four years opening that box—studying the quantum mechanics of silicon, the thermodynamics of cooling systems, and the numerical algorithms that drive scientific supercomputers.
              </p>
            </div>

            <div className="p-4 bg-gainsboro neo-border font-mono text-xs text-charcoal/80 space-y-2 shadow-[4px_4px_0px_#161616]">
              <div className="font-bold text-brick flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-green" />
                <span>[ EVOLUTION TELEMETRY ]</span>
              </div>
              <div>&gt; Use the interactive carousel on the right to trace chronological academic and engineering milestones from 2022 to present.</div>
            </div>
          </div>

          {/* Columns 2 & 3: 2 Rows (Row 1: Carousel, Row 2: Synthesis CTA) */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-6 sm:gap-8">

            {/* Row 1: Interactive Milestone Carousel */}
            <div className="bg-white neo-border border-3 border-charcoal shadow-[8px_8px_0px_#1C8DF0] p-6 sm:p-8 flex flex-col justify-between flex-1 relative overflow-hidden">

              {/* Carousel Header & Year Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-charcoal/20 pb-4 mb-6">
                <div className="flex flex-wrap items-center gap-1.5">
                  {JOURNEY_NODES.map((node, i) => (
                    <button
                      key={node.year}
                      type="button"
                      onClick={() => {
                        setDirection(i > activeIdx ? 1 : -1);
                        setActiveIdx(i);
                      }}
                      className={cn(
                        "px-3 py-1 font-mono text-xs font-bold uppercase transition-all duration-200 cursor-pointer neo-border-sm",
                        activeIdx === i
                          ? "bg-dodger-blue text-white shadow-[2px_2px_0px_#161616] scale-105"
                          : "bg-gainsboro text-charcoal hover:bg-light-sky-blue"
                      )}
                    >
                      {node.year}
                    </button>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-1.5 bg-gainsboro hover:bg-light-salmon neo-border-sm text-charcoal transition-colors cursor-pointer shadow-[2px_2px_0px_#161616] active:translate-x-0.5 active:translate-y-0.5"
                    aria-label="Previous milestone"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-xs font-bold px-2 text-charcoal">
                    0{activeIdx + 1} / 0{JOURNEY_NODES.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-1.5 bg-gainsboro hover:bg-light-salmon neo-border-sm text-charcoal transition-colors cursor-pointer shadow-[2px_2px_0px_#161616] active:translate-x-0.5 active:translate-y-0.5"
                    aria-label="Next milestone"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Carousel Slide Area */}
              <div className="relative flex-1 min-h-[220px] sm:min-h-[200px] flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIdx}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    {/* Milestone Header */}
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gainsboro text-charcoal neo-border-sm shrink-0 shadow-[2px_2px_0px_#161616]">
                        {currentMilestone.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl sm:text-2xl tracking-tight text-charcoal">
                          {currentMilestone.title}
                        </h3>
                        <div className="font-mono text-xs text-dodger-blue font-bold uppercase">
                          {currentMilestone.subtitle} // MILESTONE 0{activeIdx + 1}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base leading-relaxed text-charcoal/90 font-medium">
                      {currentMilestone.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {currentMilestone.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-gainsboro neo-border-sm font-mono text-xs font-bold text-charcoal shadow-[2px_2px_0px_#161616]"
                        >
                          # {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Footer */}
              <div className="pt-4 mt-6 border-t-2 border-charcoal/20 flex items-center justify-between font-mono text-xs text-charcoal/60">
                <span className="text-emerald-green font-bold">&gt; STATUS: COMPLETED &amp; VERIFIED</span>
                <span>ITB.ENG.PHYSICS // 2022-2026</span>
              </div>
            </div>

            {/* Row 2: Synthesis Call to Action (CTA) Banner */}
            <div className="bg-charcoal text-floral-white neo-border border-3 border-charcoal shadow-[8px_8px_0px_#DA7438] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shrink-0">
              <div className="space-y-4 flex-1">
                <div className="font-mono text-xs text-light-salmon-2 uppercase tracking-widest font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-green" />
                  <span>SYNTHESIS // CAREER VALUE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                  When you hire Umar Zaki Gunawan, you get three professionals in one:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-floral-white/90 font-mono pt-1">
                  <div className="bg-white/10 p-3 neo-border-sm">
                    <span className="text-salmon font-bold">01.</span> Full-stack software engineer (clean, tested code).
                  </div>
                  <div className="bg-white/10 p-3 neo-border-sm">
                    <span className="text-dodger-blue font-bold">02.</span> Scientific computing specialist (complex equations &amp; data).
                  </div>
                  <div className="bg-white/10 p-3 neo-border-sm">
                    <span className="text-emerald-green font-bold">03.</span> Hardware &amp; semiconductor enthusiast (FPGA &amp; embedded).
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-center sm:items-end gap-3 w-full md:w-auto">
                <a
                  href="#contact"
                  className="tactile-btn-peach text-charcoal px-6 py-3.5 font-mono text-xs sm:text-sm uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 neo-border border-2 border-charcoal shadow-[4px_4px_0px_#161616] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#161616] transition-all duration-150 w-full md:w-auto"
                >
                  <span>LET&apos;S COLLABORATE</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest">&gt; INBOX ACTIVE</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
