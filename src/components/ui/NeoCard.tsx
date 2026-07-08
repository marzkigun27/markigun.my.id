"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "floral" | "gainsboro" | "white" | "salmon" | "sky" | "charcoal" | "steel";
  shadow?: "none" | "sm" | "md" | "lg";
  hoverEffect?: boolean;
  badge?: string;
  badgeColor?: "emerald" | "blue" | "brick" | "charcoal" | "salmon";
  className?: string;
}

export function NeoCard({
  children,
  variant = "floral",
  shadow = "md",
  hoverEffect = false,
  badge,
  badgeColor = "emerald",
  className,
  ...props
}: NeoCardProps) {
  const variantStyles = {
    floral: "bg-floral-white text-charcoal",
    gainsboro: "bg-gainsboro text-charcoal",
    white: "bg-white text-charcoal",
    salmon: "bg-light-salmon text-charcoal",
    sky: "bg-light-sky-blue text-charcoal",
    charcoal: "bg-charcoal text-floral-white border-floral-white",
    steel: "bg-light-steel-blue text-charcoal",
  };

  const shadowStyles = {
    none: "",
    sm: "shadow-[2px_2px_0px_#161616]",
    md: "shadow-[4px_4px_0px_#161616]",
    lg: "shadow-[6px_6px_0px_#161616]",
  };

  const badgeColorStyles = {
    emerald: "bg-emerald-green text-white",
    blue: "bg-dodger-blue text-white",
    brick: "bg-brick text-white",
    charcoal: "bg-charcoal text-floral-white",
    salmon: "bg-light-salmon-2 text-charcoal font-bold",
  };

  return (
    <div
      className={cn(
        "relative rounded-none neo-border p-6 transition-all duration-300",
        variantStyles[variant],
        shadowStyles[shadow],
        hoverEffect &&
          "hover:-translate-y-1 hover:shadow-[8px_8px_0px_#161616] cursor-pointer",
        className
      )}
      {...props}
    >
      {badge && (
        <div
          className={cn(
            "absolute -top-3.5 right-6 px-3 py-0.5 text-xs font-mono uppercase tracking-widest neo-border-sm z-30 shadow-[2px_2px_0px_#161616]",
            badgeColorStyles[badgeColor]
          )}
        >
          {badge}
        </div>
      )}
      {children}
    </div>
  );
}
