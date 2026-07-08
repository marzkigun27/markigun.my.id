"use client";

import { ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useLenis(({ scroll }) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Ensure GSAP ticker synchronizes smoothly with Lenis
    const update = (time: number) => {
      // Lenis raf handled automatically by ReactLenis root
    };
    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
