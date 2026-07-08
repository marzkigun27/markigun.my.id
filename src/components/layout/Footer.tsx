"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Mail, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-floral-white neo-border border-x-0 border-b-0 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b-2 border-floral-white/20">
          {/* Col 1: Identity & Quote */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 font-mono font-bold text-xl tracking-tight text-light-salmon-2">
              <Terminal className="w-6 h-6 animate-pulse" />
              <span>UMAR ZAKI GUNAWAN</span>
            </div>
            <p className="font-mono text-sm text-floral-white/80 max-w-md leading-relaxed">
              &quot;The full stack starts at the atom. Bridging software engineering, scientific computing, embedded systems, and semiconductor physics.&quot;
            </p>
            <div className="pt-2 flex items-center gap-3 font-mono text-xs text-floral-white/60">
              <span className="inline-block w-2 h-2 bg-emerald-green rounded-full animate-ping" />
              <span>STATUS: AVAILABLE FOR SUMMER 2026 R&amp;D INTERNSHIPS</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-navajo-white font-bold pb-1 border-b border-floral-white/20">
              LAB DIRECTORIES
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link href="#about" className="hover:text-light-sky-blue transition-colors flex items-center gap-1">
                  <span>&gt; About &amp; Physics Journey</span>
                </Link>
              </li>
              <li>
                <Link href="#skills" className="hover:text-light-sky-blue transition-colors flex items-center gap-1">
                  <span>&gt; Interactive Skills Matrix</span>
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-light-sky-blue transition-colors flex items-center gap-1">
                  <span>&gt; Featured Case Studies</span>
                </Link>
              </li>
              <li>
                <Link href="#research" className="hover:text-light-sky-blue transition-colors flex items-center gap-1">
                  <span>&gt; Research Publications</span>
                </Link>
              </li>
              <li>
                <Link href="#teaching" className="hover:text-light-sky-blue transition-colors flex items-center gap-1">
                  <span>&gt; Teaching Assistantship</span>
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-light-sky-blue transition-colors flex items-center gap-1">
                  <span>&gt; Engineering Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect & Credentials */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-navajo-white font-bold pb-1 border-b border-floral-white/20">
              CONNECT &amp; CODE
            </h4>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <a
                href="https://github.com/umarzakigunawan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-floral-white/10 neo-border-sm border-floral-white/30 hover:bg-dodger-blue hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub @umarzaki</span>
                <ArrowUpRight className="w-3 h-3 ml-auto" />
              </a>
              <a
                href="https://linkedin.com/in/umarzakigunawan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-floral-white/10 neo-border-sm border-floral-white/30 hover:bg-dodger-blue hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 ml-auto" />
              </a>
              <a
                href="mailto:umar.zaki@itb.ac.id"
                className="inline-flex items-center gap-2 px-3 py-2 bg-floral-white/10 neo-border-sm border-floral-white/30 hover:bg-brick hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>umar.zaki@itb.ac.id</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-floral-white/60">
          <div>
            &copy; {currentYear} Umar Zaki Gunawan. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>BUILT WITH: NEXT.JS 16</span>
            <span>&bull;</span>
            <span>BUN</span>
            <span>&bull;</span>
            <span>R3F &amp; THREE.JS</span>
            <span>&bull;</span>
            <span>TAILWIND CSS v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
