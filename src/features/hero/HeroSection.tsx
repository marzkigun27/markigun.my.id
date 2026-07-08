"use client";

import React, { useEffect, useRef, useState } from "react";
import { TactileButton } from "@/components/ui/TactileButton";
import { SemiconductorScene } from "@/components/3d/SemiconductorScene";
import { ArrowRight, Download, Sparkles, Cpu, Terminal, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { motion } from "framer-motion";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isSlideUpComplete, setIsSlideUpComplete] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const profilePhotos = [
    {
      src: "/author_half_body.jpg",
      alt: "Umar Zaki Gunawan - Engineering Physics & Chip Design",
      label: "CAM_01 // LAB_A",
    },
    {
      src: "/author_secondary.jpeg",
      alt: "Umar Zaki Gunawan - FPGA & Supercomputer Laboratory",
      label: "CAM_02 // LAB_B",
    },
  ];

  useEffect(() => {
    if (!isSlideUpComplete) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profilePhotos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isSlideUpComplete, profilePhotos.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".hero-desc", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });
      gsap.from(".hero-3d", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "back.out(1.2)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center overflow-hidden border-b-3 border-charcoal"
    >
      {/* Background Laboratory Grid Motif */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #161616 1px, transparent 1px), linear-gradient(to bottom, #161616 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: High-Impact Typography & Badges */}
          <div ref={textRef} className="lg:col-span-7 space-y-8">
            {/* Status & Identity Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 bg-charcoal text-floral-white font-mono text-xs font-bold uppercase tracking-widest neo-border-sm">
                <span className="w-2 h-2 bg-emerald-green rounded-full animate-ping" />
                <span>ONLINE &bull; ITB ENGINEERING PHYSICS</span>
              </div>
              <div className="hero-badge inline-flex items-center gap-1.5 px-3 py-1 bg-light-salmon text-charcoal font-mono text-xs font-bold uppercase tracking-wider neo-border-sm">
                <Cpu className="w-3.5 h-3.5 text-brick" />
                <span>CHIP DESIGN &amp; RTL</span>
              </div>
              <div className="hero-badge inline-flex items-center gap-1.5 px-3 py-1 bg-light-sky-blue text-charcoal font-mono text-xs font-bold uppercase tracking-wider neo-border-sm">
                <Terminal className="w-3.5 h-3.5 text-dodger-blue" />
                <span>FULL-STACK SYSTEMS</span>
              </div>
            </div>

            {/* Main Title & Animated Profile Photo Section */}
            <div className="space-y-2">
              <div className="hero-title font-mono text-sm sm:text-base font-bold text-brick tracking-widest uppercase flex items-center gap-2">
                <span>// HELLO, WORLD. I AM</span>
              </div>

              <div className="flex items-stretch gap-4 sm:gap-6 xl:gap-8 my-2">
                {/* Animated Profile Photo Section (Framer Motion) */}
                <div className="relative z-10 shrink-0 w-[92px] sm:w-[136px] xl:w-[164px] self-stretch min-h-[92px] sm:min-h-[136px] xl:min-h-[164px] neo-border bg-charcoal overflow-hidden shadow-[4px_4px_0px_#161616] group">
                  {/* Slide-Up Animation Wrapper */}
                  <motion.div
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onAnimationComplete={() => setIsSlideUpComplete(true)}
                    className="relative w-full h-full"
                  >
                    {/* Alternating Profile Photos with Crossfade */}
                    {profilePhotos.map((photo, idx) => (
                      <motion.img
                        key={photo.src}
                        src={photo.src}
                        alt={photo.alt}
                        className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
                        initial={false}
                        animate={{
                          opacity: currentImageIndex === idx ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    {/* Decorative Scanline & Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent pointer-events-none z-10" />

                    {/* Active Camera / Status Badge */}
                    <div className="absolute bottom-1.5 left-1.5 z-20 bg-charcoal/90 text-floral-white px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider neo-border-sm flex items-center gap-1.5 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-green animate-pulse" />
                      <span>{profilePhotos[currentImageIndex].label}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Main Heading Text */}
                <div className="hero-title flex flex-col justify-center">
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-charcoal leading-[1.05]">
                    Umar Zaki <br className="hidden sm:inline" />
                    <span className="bg-light-salmon-2 px-2 py-0.5 inline-block neo-border-sm transform -rotate-1 my-1">
                      Gunawan.
                    </span>
                  </h1>
                </div>
              </div>
            </div>

            {/* Domain Bio with Z-Index Layering */}
            <div className="hero-desc relative z-20 bg-floral-white/95 p-4 sm:p-6 neo-border shadow-[4px_4px_0px_#161616] max-w-2xl mt-4">
              <p className="text-lg sm:text-xl text-charcoal/90 font-normal leading-relaxed">
                I am an <strong className="font-bold text-charcoal bg-navajo-white/60 px-1">Engineering Physics</strong> student who builds production software, designs FPGA processor architectures, and conducts supercomputer simulations.
                <span className="block mt-2 font-mono text-sm text-charcoal/75">
                  &gt; Bridging the physical laws of silicon with clean systems code and interactive digital laboratories.
                </span>
              </p>
            </div>

            {/* Tactile Push Buttons */}
            <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
              <TactileButton
                href="#projects"
                variant="blue"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                VIEW FEATURED PROJECTS
              </TactileButton>
              <TactileButton
                href="/resume.pdf"
                variant="charcoal"
                size="lg"
                external
                icon={<Download className="w-4 h-4" />}
              >
                DOWNLOAD CV (.PDF)
              </TactileButton>
            </div>

            {/* Key Credentials Mini-Panel */}
            <div className="hero-cta pt-6 border-t-2 border-charcoal/20 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-charcoal">
                  3.85<span className="text-brick text-lg">/4.0</span>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-charcoal/70">
                  Academic GPA (ITB)
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-charcoal">
                  5+
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-charcoal/70">
                  Research Papers
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-charcoal">
                  120+
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-charcoal/70">
                  Students Taught (TA)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Semiconductor Wafer */}
          <div className="hero-3d lg:col-span-5 w-full">
            <SemiconductorScene />
          </div>
        </div>
      </div>
    </section>
  );
}
