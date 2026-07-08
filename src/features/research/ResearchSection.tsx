"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RESEARCH_PUBLICATIONS } from "@/content";
import {
  BookOpen,
  FileText,
  ExternalLink,
  Download,
  CheckCircle2,
  Atom,
  Info,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ResearchSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const expandedPub = RESEARCH_PUBLICATIONS.find((p) => p.id === expandedId);
  const expandedIndex = RESEARCH_PUBLICATIONS.findIndex((p) => p.id === expandedId);

  const handleNextModal = () => {
    if (expandedIndex !== -1 && RESEARCH_PUBLICATIONS.length > 0) {
      const nextIdx = (expandedIndex + 1) % RESEARCH_PUBLICATIONS.length;
      setExpandedId(RESEARCH_PUBLICATIONS[nextIdx].id);
    }
  };

  const handlePrevModal = () => {
    if (expandedIndex !== -1 && RESEARCH_PUBLICATIONS.length > 0) {
      const prevIdx = (expandedIndex - 1 + RESEARCH_PUBLICATIONS.length) % RESEARCH_PUBLICATIONS.length;
      setExpandedId(RESEARCH_PUBLICATIONS[prevIdx].id);
    }
  };

  // Colors matching the orange / salmon / yellow palette in the wireframe
  const pubColors = [
    { bg: "bg-brick", text: "text-white", border: "border-brick", shadow: "#1C8DF0", badgeBg: "bg-white/20" },
    { bg: "bg-salmon", text: "text-charcoal", border: "border-salmon", shadow: "#161616", badgeBg: "bg-charcoal/15" },
    { bg: "bg-[#FFD166]", text: "text-charcoal", border: "border-[#FFD166]", shadow: "#DA7438", badgeBg: "bg-charcoal/15" },
  ];

  const statusColors = {
    Published: "bg-emerald-green text-white",
    "Under Review": "bg-dodger-blue text-white",
    "In Preparation": "bg-charcoal text-white",
  };

  return (
    <section id="research" className="py-20 sm:py-32 bg-floral-white relative overflow-hidden border-b-3 border-charcoal">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16161608_1px,transparent_1px),linear-gradient(to_bottom,#16161608_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">

        {/* 2-Column Grid Layout (matching Wireframe: Left = Stacked Cards + Pagination, Right = Title & Narration) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start">

          {/* Right Column in Desktop (lg:col-span-5, order-1 lg:order-2): Section Title & Narration Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 order-1 lg:order-2 lg:sticky lg:top-28">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gainsboro neo-border-sm font-mono text-xs font-bold uppercase tracking-widest text-charcoal shadow-[2px_2px_0px_#161616]">
                <Atom className="h-4 w-4 animate-spin text-emerald-green" />
                <span>MODULE 04 // SCIENTIFIC PUBLICATIONS</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-charcoal leading-none">
                Research &amp; Physics.
              </h2>
              <p className="text-lg sm:text-xl font-bold text-dodger-blue underline decoration-charcoal decoration-4 underline-offset-8 font-mono">
                &gt; Published Papers &amp; Simulations.
              </p>
            </div>

            {/* Section Description / Narration Box (Grey box on the right matching wireframe) */}
            {/* <div className="bg-gainsboro neo-border border-3 border-charcoal shadow-[8px_8px_0px_#161616] p-6 sm:p-8 space-y-6">
              <div className="font-mono text-xs font-bold text-dodger-blue uppercase tracking-widest flex items-center gap-2">
                <Info className="w-4 h-4 text-brick" />
                <span>EXECUTIVE NARRATION</span>
              </div>
              <p className="text-sm sm:text-base text-charcoal/90 leading-relaxed font-medium">
                My research bridges Density Functional Theory (DFT) materials discovery with real-time embedded signal processing and computational fluid dynamics.
              </p>
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-mono bg-white/60 p-3 neo-border-sm">
                &gt; Each item on the left represents an academic study. Click any card to pop up the modal card with full empirical results and mathematical formulations.
              </p>

              <div className="pt-4 border-t-2 border-charcoal/20 flex items-center justify-between font-mono text-xs text-charcoal/70">
                <span>&gt; ITB SOLID STATE LAB</span>
                <span>VERIFIED</span>
              </div>
            </div> */}

            <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold text-charcoal/60">
              <span>&gt; CLICK ANY PUBLICATION CARD FOR MODAL SPECIFICATION</span>
            </div>
          </div>

          {/* Left Column in Desktop (lg:col-span-7, order-2 lg:order-1): Paginated Research Card Deck */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1 w-full">

            <div className="flex items-center justify-between border-b-2 border-charcoal/20 pb-4 font-mono text-xs font-bold text-charcoal/70 uppercase">
              <span>&gt; PUBLICATION ARCHIVES // COMPACT DECK</span>
              <span>TOTAL PAPERS: 0{RESEARCH_PUBLICATIONS.length}</span>
            </div>

            {/* Scrollable Stack of Compact Clickable Cards (Orange, Salmon, Yellow palette) */}
            <div
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              className="space-y-4 max-h-[580px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-charcoal scrollbar-track-gainsboro"
            >
              {RESEARCH_PUBLICATIONS.map((pub, idx) => {
                const style = pubColors[idx % pubColors.length];

                return (
                  <motion.div
                    key={pub.id}
                    onClick={() => setExpandedId(pub.id)}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "p-6 sm:p-8 neo-border border-3 border-charcoal cursor-pointer transition-shadow duration-200 select-none overflow-hidden rounded-xl sm:rounded-2xl shadow-[6px_6px_0px_#161616] hover:shadow-[10px_10px_0px_#1C8DF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                      style.bg,
                      style.text
                    )}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center font-mono text-xs font-bold uppercase">
                        <span className={cn("px-2.5  neo-border-sm", statusColors[pub.status])}>
                          [ {pub.status} ]
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-snug line-clamp-2">
                        {pub.title}
                      </h3>
                      <p className="font-mono text-xs opacity-85 line-clamp-1">
                        <span className="underline font-bold">Authors:</span> {pub.authors.join(", ")}
                      </p>
                    </div>

                    {/* Click to Expand Modal Badge */}
                    <div className={cn(
                      "shrink-0 font-mono text-xs font-bold uppercase px-4 py-2.5 neo-border-sm self-start sm:self-center flex items-center gap-1.5 shadow-[2px_2px_0px_#161616]",
                      style.badgeBg
                    )}>
                      <span>VIEW DETAILS</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Scrollable Deck Status Footer */}
            <div className="pt-4 border-t-3 border-charcoal flex flex-wrap items-center justify-between gap-4 bg-gainsboro p-4 neo-border shadow-[4px_4px_0px_#161616]">
              <div className="font-mono text-xs font-bold text-charcoal uppercase">
                SHOWING ALL 0{RESEARCH_PUBLICATIONS.length} SCIENTIFIC PUBLICATIONS // SCROLL TO VIEW MORE
              </div>
              <div className="font-mono text-xs font-bold text-brick uppercase">
                [ ITB // RESEARCH ARCHIVE ]
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* EXPANDED POPUP MODAL CARD (ON-CLICK) */}
      <AnimatePresence>
        {expandedPub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedId(null)}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            className="fixed inset-0 z-50 bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              className="bg-white neo-border border-3 border-charcoal shadow-[16px_16px_0px_#2ECC71] w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col justify-between rounded-xl"
            >
              {/* Modal Header */}
              <div className="bg-charcoal text-floral-white p-6 sm:p-8 flex items-start justify-between gap-4 border-b-3 border-charcoal sticky top-0 z-20">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase">
                    <span className={cn("px-2.5 py-0.5 neo-border-sm", statusColors[expandedPub.status])}>
                      [ {expandedPub.status} ]
                    </span>
                    <span className="text-light-salmon-2">
                      // {expandedPub.venue} ({expandedPub.year})
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                    {expandedPub.title}
                  </h3>
                  <div className="font-mono text-xs sm:text-sm text-floral-white/80 pt-1">
                    <span className="text-emerald-green font-bold">Authors:</span> {expandedPub.authors.join(", ")}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setExpandedId(null)}
                  className="p-2.5 bg-brick text-white neo-border-sm hover:bg-salmon hover:text-charcoal transition-colors cursor-pointer shrink-0 shadow-[2px_2px_0px_#ffffff]"
                  title="Close Modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 font-sans">

                {/* Abstract */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-brick font-bold flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>// ABSTRACT &amp; PROBLEM STATEMENT</span>
                  </h4>
                  <p className="text-base leading-relaxed text-charcoal/90 font-medium bg-gainsboro p-5 neo-border-sm">
                    {expandedPub.abstract}
                  </p>
                </div>

                {/* Equations Section */}
                {expandedPub.equations && expandedPub.equations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-dodger-blue font-bold flex items-center gap-1.5">
                      <Atom className="w-4 h-4" />
                      <span>// KEY MATHEMATICAL FORMULATIONS</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {expandedPub.equations.map((eq) => (
                        <div
                          key={eq.label}
                          className="bg-charcoal text-floral-white p-5 neo-border-sm space-y-2 shadow-[4px_4px_0px_#161616]"
                        >
                          <div className="font-mono text-xs text-light-sky-blue font-bold flex items-center justify-between">
                            <span>[{eq.label}]</span>
                            <span className="text-emerald-green">&gt; VERIFIED FORMULATION</span>
                          </div>
                          <div className="py-3 px-3 bg-black/60 neo-border-sm font-mono text-sm sm:text-base text-emerald-green overflow-x-auto text-center font-bold tracking-wider">
                            $$ {eq.latex} $$
                          </div>
                          <p className="font-mono text-xs text-floral-white/80">
                            {eq.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Methodology & Findings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Methods */}
                  <div className="bg-white p-5 neo-border border-2 border-charcoal shadow-[4px_4px_0px_#161616] space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-dodger-blue font-bold border-b-2 border-charcoal/15 pb-2">
                      // COMPUTATIONAL METHODS
                    </h4>
                    <ul className="space-y-2 font-mono text-xs sm:text-sm">
                      {expandedPub.methods.map((method, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2 text-charcoal/90">
                          <span className="text-dodger-blue font-bold shrink-0">&gt;</span>
                          <span>{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Findings */}
                  <div className="bg-white p-5 neo-border border-2 border-charcoal shadow-[4px_4px_0px_#161616] space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-green font-bold border-b-2 border-charcoal/15 pb-2">
                      // EMPIRICAL RESULTS
                    </h4>
                    <ul className="space-y-2 font-mono text-xs sm:text-sm">
                      {expandedPub.keyFindings.map((finding, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-charcoal/90">
                          <CheckCircle2 className="w-4 h-4 text-emerald-green shrink-0 mt-0.5" />
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Keywords */}
                <div className="space-y-2 pt-2">
                  <div className="font-mono text-xs font-bold text-charcoal/70 uppercase">
                    // RESEARCH KEYWORDS:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {expandedPub.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-3 py-1 bg-gainsboro neo-border-sm font-mono text-xs font-bold text-charcoal shadow-[2px_2px_0px_#161616]"
                      >
                        # {kw}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="bg-gainsboro p-6 sm:p-8 border-t-3 border-charcoal flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {expandedPub.pdfUrl && (
                    <a
                      href={expandedPub.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-charcoal text-floral-white neo-border font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-dodger-blue hover:text-white transition-colors shadow-[4px_4px_0px_#161616]"
                    >
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD PDF</span>
                    </a>
                  )}
                  {expandedPub.doiUrl && (
                    <a
                      href={expandedPub.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white text-charcoal neo-border font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-emerald-green hover:text-white transition-colors shadow-[4px_4px_0px_#161616]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>VIEW DOI</span>
                    </a>
                  )}
                </div>

                {/* Prev / Next Modal Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevModal}
                    className="px-4 py-2.5 bg-white hover:bg-light-salmon neo-border-sm font-mono text-xs font-bold flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_#161616]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>PREV</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextModal}
                    className="px-4 py-2.5 bg-white hover:bg-light-salmon neo-border-sm font-mono text-xs font-bold flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_#161616]"
                  >
                    <span>NEXT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
