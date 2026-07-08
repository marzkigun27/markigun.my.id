"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface TactileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "blue" | "green" | "peach" | "brick" | "charcoal" | "white";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  external?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export function TactileButton({
  href,
  variant = "blue",
  size = "md",
  children,
  icon,
  external = false,
  className,
  fullWidth = false,
  onClick,
  ...props
}: TactileButtonProps) {
  const variantStyles = {
    blue: "tactile-btn-blue text-white",
    green: "tactile-btn-green text-white",
    peach: "tactile-btn-peach text-charcoal font-semibold",
    brick:
      "bg-brick neo-border text-white shadow-[inset_-2px_2px_#f09d6b,inset_2px_-2px_#9c491a] hover:rounded-none transition-all duration-500",
    charcoal:
      "bg-charcoal neo-border text-floral-white shadow-[inset_-2px_2px_#3f3f3f,inset_2px_-2px_#000000] hover:rounded-none hover:bg-light-salmon-2 hover:text-charcoal transition-all duration-500",
    white:
      "bg-floral-white neo-border text-charcoal shadow-[inset_-2px_2px_#ffffff,inset_2px_-2px_#c7c5be] hover:rounded-none hover:bg-light-sky-blue transition-all duration-500",
  };

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs font-mono tracking-wider",
    md: "px-6 py-2.5 text-sm font-mono tracking-wider",
    lg: "px-8 py-3.5 text-base font-mono tracking-wider",
  };

  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide neo-border cursor-pointer select-none transition-all duration-500 ease-out hover:scale-[1.02] active:scale-[0.98]",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, "group")}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cn(baseStyles, "group")}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseStyles, "group")}
      {...props}
    >
      {content}
    </button>
  );
}
