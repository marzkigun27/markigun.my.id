"use client";

import React, { useRef, ReactNode, useState, useEffect } from "react";
import { motion, useScroll, useTransform, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
  parallax?: boolean;
  parallaxOffset?: number;
  id?: string;
}

export function AnimatedSection({
  children,
  className,
  parallax = false,
  parallaxOffset = 60,
  id,
  ...props
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax Y translation for background accents or depth
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallaxOffset}px`, `${parallaxOffset}px`]
  );

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", parallax && "overflow-hidden", className)}
      {...props}
    >
      {/* Optional Parallax Background Grid / Accent Layer */}
      {parallax && (
        <motion.div
          style={{ y: yParallax }}
          className="pointer-events-none absolute inset-0 z-0 opacity-40 select-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#16161608_1px,transparent_1px),linear-gradient(to_bottom,#16161608_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </motion.div>
      )}

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
}

interface StackedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  zIndex?: number;
  parallax?: boolean;
  parallaxOffset?: number;
}

export function StackedSection({
  children,
  className,
  id,
  zIndex = 10,
  parallax = false,
  parallaxOffset = 60,
}: StackedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax background grid
  const yParallax = useTransform(
    enterProgress,
    [0, 1],
    [`-${parallaxOffset}px`, `${parallaxOffset}px`]
  );

  // Stacking exit animation (when subsequent section covers this one)
  const { scrollYProgress: exitProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(exitProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(exitProgress, [0, 1], [1, 0.35]);
  const overlayOpacity = useTransform(exitProgress, [0, 1], [0, 0.65]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ zIndex, scale, opacity }}
      className={cn(
        "sticky top-[calc(100vh-100%)] w-full transition-shadow duration-300",
        parallax && "overflow-hidden",
        className
      )}
    >
      {/* Optional Parallax Background Grid */}
      {parallax && (
        <motion.div
          style={{ y: yParallax }}
          className="pointer-events-none absolute inset-0 z-0 opacity-40 select-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#16161608_1px,transparent_1px),linear-gradient(to_bottom,#16161608_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </motion.div>
      )}

      {/* Dimming Overlay for depth when covered */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 z-50 bg-charcoal"
        aria-hidden="true"
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
}

interface HorizontalScrollTrackProps {
  children: ReactNode;
  className?: string;
  id?: string;
  heightClass?: string; // e.g., "h-[350vh]"
  onProgressChange?: (progress: number) => void;
  topBar?: ReactNode;
  bottomBar?: ReactNode;
  leftPanel?: ReactNode;
}

export function HorizontalScrollTrack({
  children,
  className,
  id,
  heightClass = "h-[350vh]",
  onProgressChange,
  topBar,
  bottomBar,
  leftPanel,
}: HorizontalScrollTrackProps) {
  const [scrollRange, setScrollRange] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateRange = () => {
      if (viewportRef.current && trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = trackRef.current.parentElement?.clientWidth || viewportRef.current.clientWidth;
        setScrollRange(Math.max(0, trackWidth - containerWidth));
      }
    };
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, [children, leftPanel]);

  const { scrollYProgress } = useScroll({
    target: viewportRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (onProgressChange) {
        onProgressChange(latest);
      }
    });
  }, [scrollYProgress, onProgressChange]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section id={id} ref={viewportRef} className={cn("relative w-full bg-floral-white", heightClass)}>
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden border-b-3 border-charcoal">
        {topBar && <div className="z-20 w-full shrink-0">{topBar}</div>}
        <div className="flex flex-1 items-center overflow-hidden">
          {leftPanel && (
            <div className="hidden lg:flex z-10 shrink-0 px-8 xl:pl-16 xl:pr-10 py-8 items-center h-full bg-floral-white border-r-3 border-charcoal w-[400px] xl:w-[460px]">
              {leftPanel}
            </div>
          )}
          <div className="flex-1 overflow-hidden h-full flex items-center">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className={cn("flex items-stretch gap-8 px-6 sm:px-12 lg:px-16 pr-12 lg:pr-24 py-8", className)}
            >
              {leftPanel && (
                <div className="flex lg:hidden w-[85vw] sm:w-[450px] shrink-0 items-center py-4">
                  {leftPanel}
                </div>
              )}
              {children}
            </motion.div>
          </div>
        </div>
        {bottomBar && <div className="z-20 w-full shrink-0">{bottomBar}</div>}
      </div>
    </section>
  );
}

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number; // e.g., -40 for slower, +60 for faster
}

export function ParallaxElement({ children, className, speed = -30 }: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  index?: number;
  delay?: number;
  variant?: "slide-up" | "fade-in" | "scale-in" | "mixed";
}

export function AnimatedCard({
  children,
  className,
  index = 0,
  delay,
  variant = "mixed",
  ...props
}: AnimatedCardProps) {
  // Enforce 0.1s stagger increment per card as requested, capped at 0.6s
  const calculatedDelay = delay !== undefined ? delay : Math.min(index * 0.1, 0.6);

  const getVariants = () => {
    switch (variant) {
      case "slide-up":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        };
      case "fade-in":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "scale-in":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        };
      case "mixed":
      default:
        return {
          hidden: { opacity: 0, y: 40, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      transition={{
        duration: 0.65,
        delay: calculatedDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedGridProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function AnimatedGrid({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: AnimatedGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
