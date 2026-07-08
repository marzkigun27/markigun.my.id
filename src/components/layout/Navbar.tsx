"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal, Cpu, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/#about" },
  { label: "SKILLS", href: "/#skills" },
  { label: "PROJECTS", href: "/#projects" },
  { label: "RESEARCH", href: "/#research" },
  // { label: "TEACHING", href: "/#teaching" },
  { label: "BLOG", href: "/#blog" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "CONTACT", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gainsboro/90 backdrop-blur-md neo-border border-t-0 border-x-0 shadow-[0_2px_0_#161616] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base tracking-tighter group"
        >
          <div className="w-8 h-8 bg-charcoal text-floral-white flex items-center justify-center neo-border-sm group-hover:bg-light-salmon-2 group-hover:text-charcoal transition-colors duration-300">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <span className="flex items-center">
            <span className="text-brick">u.zaki</span>
            <span className="text-charcoal">@lab:~#</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-widest transition-all duration-300 relative py-1 flex items-center gap-1 group",
                  isActive
                    ? "text-brick font-bold"
                    : "text-charcoal hover:text-dodger-blue"
                )}
              >
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-dodger-blue font-bold">
                  &gt;
                </span>
                <span className="group-hover:tracking-[0.2em] transition-all duration-300">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Resume Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="tactile-btn-blue text-white px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1 group hover:rounded-none transition-all duration-500"
          >
            <span>RESUME</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden p-2 bg-charcoal text-floral-white neo-border-sm hover:bg-light-salmon-2 hover:text-charcoal transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {isOpen && (
        <div className="xl:hidden bg-gainsboro neo-border border-x-0 border-b-3 mt-3 px-6 py-6 space-y-4 shadow-[0_8px_0_rgba(22,22,22,0.5)] animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 text-xs font-mono text-charcoal/70 pb-2 border-b-2 border-charcoal/20">
            <Terminal className="w-4 h-4 text-brick" />
            <span>SELECT DESTINATION MODULE:</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 bg-floral-white neo-border-sm font-mono text-xs font-bold text-charcoal hover:bg-light-salmon hover:text-charcoal transition-colors"
              >
                &gt; {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t-2 border-charcoal/20 flex justify-between items-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="tactile-btn-blue text-white px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider block text-center w-full"
            >
              DOWNLOAD RESUME (.PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
