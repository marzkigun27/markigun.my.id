"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { SKILLS } from "@/content";
import { Skill } from "@/types";
import { NeoCard } from "@/components/ui/NeoCard";
import { TactileButton } from "@/components/ui/TactileButton";
import { HorizontalScrollTrack, ParallaxElement } from "@/components/ui/AnimatedScroll";
import {
  Terminal,
  Cpu,
  Code2,
  Database,
  Wrench,
  CheckCircle,
  Info,
  Layers,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: { label: Skill["category"] | "ALL"; icon: React.ReactNode; color: string }[] = [
  { label: "ALL", icon: <Activity className="w-4 h-4" />, color: "bg-charcoal text-white" },
  { label: "Programming", icon: <Code2 className="w-4 h-4" />, color: "bg-dodger-blue text-white" },
  { label: "Scientific Computing", icon: <Cpu className="w-4 h-4" />, color: "bg-emerald-green text-white" },
  { label: "Frontend", icon: <Layers className="w-4 h-4" />, color: "bg-brick text-white" },
  { label: "Backend", icon: <Database className="w-4 h-4" />, color: "bg-light-salmon-2 text-charcoal" },
  { label: "Engineering & Tools", icon: <Wrench className="w-4 h-4" />, color: "bg-charcoal text-white" },
];

interface BadgePhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS[0]);
  const [gravityMode, setGravityMode] = useState<"zero-g" | "earth">("zero-g");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Physics refs
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef = useRef<BadgePhysicsState[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isOver: boolean }>({ x: 0, y: 0, isOver: false });
  const draggingIdRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Initialize physics states
  useEffect(() => {
    const states: BadgePhysicsState[] = [];
    const container = containerRef.current;
    const W = container ? container.clientWidth : 800;
    const H = container ? container.clientHeight : 380;

    for (let i = 0; i < SKILLS.length; i++) {
      // Spread badges randomly across canvas
      const x = 20 + Math.random() * Math.max(200, W - 180);
      const y = 20 + Math.random() * Math.max(150, H - 80);
      const vx = (Math.random() - 0.5) * 2.2;
      const vy = (Math.random() - 0.5) * 2.2;
      states.push({ x, y, vx, vy, width: 0, height: 0 });
    }
    stateRef.current = states;
  }, [isMobile]);

  // Check mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 60fps Physics loop
  const updatePhysics = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const W = rect.width || 800;
    const H = rect.height || 380;

    const states = stateRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const isOver = mouseRef.current.isOver;

    for (let i = 0; i < states.length; i++) {
      const s = states[i];
      const el = badgeRefs.current[i];
      if (!s || !el) continue;

      // Measure dimensions once DOM is rendered
      if (s.width === 0) {
        s.width = el.offsetWidth || 90;
        s.height = el.offsetHeight || 26;
      }

      // 1. Handle dragging
      if (draggingIdRef.current === i) {
        const targetX = mx - s.width / 2;
        const targetY = my - s.height / 2;
        s.vx = (targetX - s.x) * 0.45;
        s.vy = (targetY - s.y) * 0.45;
        s.x = targetX;
        s.y = targetY;
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
        continue;
      }

      // 2. Gravity / Zero-G forces
      if (gravityMode === "earth") {
        s.vy += 0.35; // Downward earth gravity
      } else {
        // Zero-gravity Brownian floating
        s.vx += (Math.random() - 0.5) * 0.15;
        s.vy += (Math.random() - 0.5) * 0.15;
        // Gentle center attraction
        s.vx += ((W / 2 - s.width / 2) - s.x) * 0.0004;
        s.vy += ((H / 2 - s.height / 2) - s.y) * 0.0004;
      }

      // 3. Mouse Repulsion (Scatter effect!)
      if (isOver) {
        const cx = s.x + s.width / 2;
        const cy = s.y + s.height / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulseRadius = 170;
        if (dist < repulseRadius && dist > 1) {
          const force = ((repulseRadius - dist) / repulseRadius) * 2.8;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }
      }

      // 4. Velocity damping & limits
      const maxSpeed = gravityMode === "earth" ? 9.0 : 4.5;
      const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      if (speed > maxSpeed) {
        s.vx = (s.vx / speed) * maxSpeed;
        s.vy = (s.vy / speed) * maxSpeed;
      }
      s.vx *= 0.99;
      s.vy *= 0.99;

      // Ensure minimum floating movement in Zero-G
      if (gravityMode === "zero-g" && speed < 0.35) {
        s.vx += (Math.random() - 0.5) * 0.6;
        s.vy += (Math.random() - 0.5) * 0.6;
      }

      // 5. Position update
      s.x += s.vx;
      s.y += s.vy;

      // 6. Wall Bounces
      if (s.x < 4) { s.x = 4; s.vx = Math.abs(s.vx) * 0.85; }
      if (s.x + s.width > W - 4) { s.x = W - 4 - s.width; s.vx = -Math.abs(s.vx) * 0.85; }
      if (s.y < 4) { s.y = 4; s.vy = Math.abs(s.vy) * 0.85; }
      if (s.y + s.height > H - 4) {
        s.y = H - 4 - s.height;
        s.vy = -Math.abs(s.vy) * (gravityMode === "earth" ? 0.6 : 0.85);
        if (gravityMode === "earth" && Math.abs(s.vy) < 0.6) s.vy = 0;
      }
    }

    // 7. Badge-to-Badge Elastic Collisions
    for (let i = 0; i < states.length; i++) {
      for (let j = i + 1; j < states.length; j++) {
        if (draggingIdRef.current === i || draggingIdRef.current === j) continue;
        const s1 = states[i];
        const s2 = states[j];
        if (!s1 || !s2) continue;

        const cx1 = s1.x + s1.width / 2;
        const cy1 = s1.y + s1.height / 2;
        const cx2 = s2.x + s2.width / 2;
        const cy2 = s2.y + s2.height / 2;

        const dx = cx1 - cx2;
        const dy = cy1 - cy2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = (s1.width + s2.width) / 4 + 14;

        if (dist < minDist && dist > 0.1) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;

          s1.x += nx * (overlap * 0.5);
          s1.y += ny * (overlap * 0.5);
          s2.x -= nx * (overlap * 0.5);
          s2.y -= ny * (overlap * 0.5);

          const rvx = s1.vx - s2.vx;
          const rvy = s1.vy - s2.vy;
          const velAlongNormal = rvx * nx + rvy * ny;

          if (velAlongNormal < 0) {
            const restitution = 0.8;
            const impulse = -(1 + restitution) * velAlongNormal * 0.5;
            s1.vx += impulse * nx;
            s1.vy += impulse * ny;
            s2.vx -= impulse * nx;
            s2.vy -= impulse * ny;
          }
        }
      }
    }

    // 8. Apply DOM transforms
    for (let i = 0; i < states.length; i++) {
      const s = states[i];
      const el = badgeRefs.current[i];
      if (s && el) {
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      }
    }

    rafIdRef.current = requestAnimationFrame(updatePhysics);
  }, [gravityMode]);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updatePhysics]);

  // Scatter explosion
  const handleScatter = () => {
    const states = stateRef.current;
    for (let i = 0; i < states.length; i++) {
      const s = states[i];
      if (s) {
        s.vx = (Math.random() - 0.5) * 22;
        s.vy = (Math.random() - 0.5) * 22;
      }
    }
  };

  // Mouse handlers for arena
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isOver: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isOver = false;
    draggingIdRef.current = null;
  };

  const handleMouseUp = () => {
    draggingIdRef.current = null;
  };

  const topBar = (
    <div className="flex items-center justify-between border-b-2 border-charcoal/20 bg-gainsboro/95 px-6 sm:px-12 py-3.5 backdrop-blur-md">
      <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-charcoal">
        <Terminal className="h-4 w-4 text-brick" />
        <span>MODULE 02 // ZERO-GRAVITY SKILLS ARENA</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex h-2 w-32 bg-white neo-border-sm overflow-hidden">
          <div
            className="h-full bg-brick transition-all duration-150"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="font-mono text-xs font-bold text-brick">
          [ TRACK: {Math.round(scrollProgress * 100)}% ]
        </span>
      </div>
    </div>
  );

  const bottomBar = (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-charcoal/20 bg-gainsboro/95 px-6 sm:px-12 py-3 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-1.5">
        {CATEGORIES.map((cat) => {
          const count = cat.label === "ALL" ? SKILLS.length : SKILLS.filter((s) => s.category === cat.label).length;
          const isActive = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              type="button"
              onClick={() => setActiveCategory(cat.label)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider neo-border-sm transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-charcoal text-floral-white shadow-[2px_2px_0px_#1C8DF0]"
                  : "bg-floral-white text-charcoal hover:bg-light-sky-blue"
              )}
            >
              {cat.icon}
              <span>{cat.label} ({count})</span>
            </button>
          );
        })}
      </div>
      <div className="hidden md:flex items-center gap-2 font-mono text-xs font-bold text-charcoal/70">
        <span>SCROLL HORIZONTALLY TO TRAVERSE ARENA</span>
        <ArrowRight className="w-3.5 h-3.5 animate-pulse text-brick" />
      </div>
    </div>
  );

  const proficiencyColors = {
    Expert: "bg-brick text-white border-brick",
    Advanced: "bg-dodger-blue text-white border-dodger-blue",
    Proficient: "bg-emerald-green text-white border-emerald-green",
    Familiar: "bg-charcoal text-white border-charcoal",
  };

  const introPanel = (
    <div className="w-full lg:w-[360px] xl:w-[380px] shrink-0 flex flex-col justify-center space-y-6 select-none">
      <ParallaxElement speed={-25} className="space-y-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-none">
          Interactive Skills Arena.
        </h2>
        <p className="text-base sm:text-lg font-bold text-brick font-mono">
          &gt; Zero-Gravity Floating Badges.
        </p>
        <p className="text-sm sm:text-base text-charcoal/85 max-w-md leading-relaxed pt-2 font-medium">
          Instead of static progress bars, explore my engineering stack as a living zero-gravity physics arena. Move your mouse to scatter badges, click and drag to fling them across space, and select any badge to inspect live telemetry.
        </p>
      </ParallaxElement>
      <div className="p-4 bg-white neo-border font-mono text-xs text-charcoal/80 space-y-2">
        <div className="font-bold text-dodger-blue">[ TELEMETRY INSTRUCTIONS ]</div>
        <div>&gt; **Hover/Move Mouse**: Repels and scatters floating badges.</div>
        <div>&gt; **Click &amp; Drag**: Grab any badge and fling it across the arena.</div>
        <div>&gt; **Click Badge**: Displays full technical specification in the telemetry HUD.</div>
      </div>
    </div>
  );

  const arenaCard = (
    <div className="w-full lg:w-[680px] xl:w-[760px] h-[650px] sm:h-[700px] lg:h-[75vh] lg:max-h-[660px] shrink-0 flex flex-col gap-4">
        {/* Arena Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white neo-border shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-charcoal">
            <Compass className="w-4 h-4 text-brick animate-spin" />
            <span>PHYSICS ENGINE: 60 FPS ACTIVE // HOVER TO REPEL</span>
          </div>
          <div className="flex items-center gap-2">
            <TactileButton
              type="button"
              variant="peach"
              size="sm"
              onClick={handleScatter}
              icon={<Zap className="w-3.5 h-3.5" />}
            >
              SCATTER EXPLOSION
            </TactileButton>
            <TactileButton
              type="button"
              variant={gravityMode === "zero-g" ? "blue" : "brick"}
              size="sm"
              onClick={() => setGravityMode(prev => prev === "zero-g" ? "earth" : "zero-g")}
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              GRAVITY: {gravityMode === "zero-g" ? "ZERO-G" : "DOWNWARD"}
            </TactileButton>
          </div>
        </div>

        {/* 2D Physics Canvas */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          className="relative flex-1 w-full bg-charcoal neo-border border-3 border-charcoal shadow-[8px_8px_0px_#1C8DF0] overflow-hidden select-none cursor-crosshair"
          style={{ minHeight: "260px" }}
        >
          {/* Background Grid Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

          {/* Floating Skill Badges */}
          {SKILLS.map((skill, idx) => {
            const isSelected = selectedSkill.name === skill.name;
            const matchesCategory = activeCategory === "ALL" || skill.category === activeCategory;

            return (
              <div
                key={skill.name}
                ref={(el) => { badgeRefs.current[idx] = el; }}
                onMouseDown={() => {
                  draggingIdRef.current = idx;
                  setSelectedSkill(skill);
                }}
                className={cn(
                  "absolute top-0 left-0 px-2 py-1 font-mono text-[10px] sm:text-xs font-bold neo-border-sm cursor-grab active:cursor-grabbing transition-shadow duration-150 flex items-center gap-1.5 z-10",
                  proficiencyColors[skill.proficiency],
                  isSelected && "scale-105 z-30 shadow-[4px_4px_0px_#DA7438] ring-1 ring-white",
                  !isSelected && "shadow-[2px_2px_0px_#161616]",
                  !matchesCategory && "opacity-25 grayscale scale-95 pointer-events-none"
                )}
                style={{ willChange: "transform" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>{skill.name}</span>
              </div>
            );
          })}

          <div className="absolute bottom-2 right-3 font-mono text-[10px] text-white/40 pointer-events-none uppercase">
            &gt; GRAB &amp; FLING BADGES WITH MOUSE
          </div>
        </div>

        {/* Live Telemetry Inspection Console (HUD) */}
        <NeoCard
          variant="white"
          shadow="md"
          badge={`INSPECTING // ${selectedSkill.category.toUpperCase()}`}
          badgeColor="salmon"
          className="shrink-0 bg-white neo-border border-3 border-charcoal shadow-[6px_6px_0px_#DA7438] p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            {/* Left Col: Title & Experience */}
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-charcoal/20 pb-3 md:pb-0 md:pr-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("px-2 py-0.5 text-[10px] uppercase font-bold text-white", proficiencyColors[selectedSkill.proficiency].split(" ")[0])}>
                    {selectedSkill.proficiency}
                  </span>
                  <span className="text-xs text-charcoal/70">{selectedSkill.yearsOfExperience} Yrs Exp</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-charcoal">
                  {selectedSkill.name}
                </h4>
              </div>
              <div className="text-[11px] text-emerald-green font-bold pt-2 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>TELEMETRY SYNCED</span>
              </div>
            </div>

            {/* Middle Col: Specification */}
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-charcoal/20 pb-3 md:pb-0 md:pr-4">
              <div className="text-[10px] font-bold text-dodger-blue uppercase tracking-widest mb-1">
                // TECHNICAL SPECIFICATION
              </div>
              <p className="text-xs sm:text-sm text-charcoal/90 font-sans leading-relaxed font-medium">
                {selectedSkill.description}
              </p>
            </div>

            {/* Right Col: Deployed Case Studies & Stack Synergy */}
            <div className="md:col-span-1 space-y-2">
              <div>
                <div className="text-[10px] font-bold text-brick uppercase tracking-widest mb-1">
                  // DEPLOYED IN CASE STUDIES
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedSkill.projectsUsedIn.slice(0, 3).map((proj) => (
                    <span key={proj} className="px-2 py-0.5 bg-gainsboro neo-border-sm text-[10px] text-charcoal font-bold truncate max-w-[180px]">
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-charcoal/70 uppercase tracking-widest mb-1">
                  // STACK SYNERGY
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedSkill.relatedTech.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-1.5 py-0.5 bg-charcoal text-white text-[10px] font-bold">
                      # {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </NeoCard>
    </div>
  );

  if (isMobile) {
    return (
      <section id="skills" className="relative w-full bg-floral-white border-b-3 border-charcoal overflow-hidden">
        <div className="z-20 w-full shrink-0">{topBar}</div>
        <div className="flex flex-col gap-8 px-6 sm:px-12 py-10">
          {introPanel}
          {arenaCard}
        </div>
        <div className="z-20 w-full shrink-0">{bottomBar}</div>
      </section>
    );
  }

  return (
    <HorizontalScrollTrack
      id="skills"
      heightClass="h-[120vh]"
      onProgressChange={setScrollProgress}
      topBar={topBar}
      bottomBar={bottomBar}
      className="min-w-full justify-center items-center px-6 sm:px-12 lg:px-16 pr-6 sm:pr-12 lg:pr-16"
    >
      {introPanel}
      {arenaCard}
    </HorizontalScrollTrack>
  );
}
