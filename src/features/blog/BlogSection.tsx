"use client";

import React, { useState } from "react";
import { BLOG_POSTS } from "@/content";
import { BlogPost } from "@/types";
import { NeoCard, type NeoCardProps } from "@/components/ui/NeoCard";
import { HorizontalScrollTrack, AnimatedCard, ParallaxElement } from "@/components/ui/AnimatedScroll";
import { TactileButton } from "@/components/ui/TactileButton";
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Tag, 
  Terminal,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: string[] = [
  "ALL",
  "Physics",
  "Programming",
  "Embedded Systems",
  "Semiconductor",
  "Linux",
  "Quantum Computing",
];

export function BlogSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const filteredPosts =
    activeCategory === "ALL"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const topBar = (
    <div className="flex items-center justify-between border-b-2 border-charcoal/20 bg-gainsboro/95 px-6 sm:px-12 py-3.5 backdrop-blur-md">
      <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-charcoal">
        <BookOpen className="h-4 w-4 text-brick" />
        <span>MODULE 06 // ENGINEERING WRITING &amp; THOUGHTS</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex h-2 w-32 bg-white neo-border-sm overflow-hidden">
          <div 
            className="h-full bg-brick transition-all duration-150" 
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="font-mono text-xs font-bold text-brick">
          [ ARTICLES: {Math.round(scrollProgress * 100)}% ]
        </span>
      </div>
    </div>
  );

  const bottomBar = (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-charcoal/20 bg-gainsboro/95 px-6 sm:px-12 py-3 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-1.5">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "ALL"
              ? BLOG_POSTS.length
              : BLOG_POSTS.filter((p) => p.category === cat).length;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider neo-border-sm transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-charcoal text-floral-white shadow-[2px_2px_0px_#1C8DF0]"
                  : "bg-floral-white text-charcoal hover:bg-light-sky-blue"
              )}
            >
              [ {cat} ({count}) ]
            </button>
          );
        })}
      </div>
      <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold text-charcoal/70">
        <span>SCROLL DOWN TO TRAVERSE ARTICLES</span>
        <ArrowRight className="w-3.5 h-3.5 animate-pulse text-brick" />
      </div>
    </div>
  );

  return (
    <HorizontalScrollTrack
      id="blog"
      heightClass="h-[380vh]"
      onProgressChange={setScrollProgress}
      topBar={topBar}
      bottomBar={bottomBar}
    >
      {/* Intro Panel (Card 0) */}
      <div className="w-[85vw] sm:w-[480px] lg:w-[520px] shrink-0 flex flex-col justify-center space-y-6 select-none">
        <ParallaxElement speed={-25} className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-charcoal leading-none">
            The Engineering Blog.
          </h2>
          <p className="text-lg sm:text-xl font-bold text-dodger-blue font-mono">
            &gt; First-principles breakdowns &amp; hardware tutorials.
          </p>
          <p className="text-base text-charcoal/85 max-w-md leading-relaxed pt-2 font-medium">
            Writing is the ultimate test of understanding. Here I dissect complex topics in semiconductor physics, low-level systems programming, and high-performance computing into clear, actionable guides.
          </p>
        </ParallaxElement>
        <div className="p-4 bg-white neo-border font-mono text-xs text-charcoal/80 space-y-2">
          <div className="font-bold text-dodger-blue">[ TELEMETRY INSTRUCTIONS ]</div>
          <div>&gt; Use the category buttons in the bottom dock to filter engineering articles.</div>
        </div>
      </div>

      {/* Blog Post Cards (Cards 1-N) */}
      {filteredPosts.map((post, idx) => {
        const cardVariants: NeoCardProps["variant"][] = ["floral", "white", "salmon", "sky"];
        const variant = cardVariants[idx % cardVariants.length];

        return (
          <div
            key={post.id}
            className="w-[85vw] sm:w-[500px] lg:w-[560px] h-[75vh] max-h-[660px] shrink-0 flex flex-col"
          >
            <AnimatedCard index={idx} variant="scale-in" className="h-full flex flex-col">
              <NeoCard
                variant={variant}
                shadow="lg"
                badge={`// ${post.category.toUpperCase()}`}
                badgeColor="blue"
                className="flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Date & Read Time Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-charcoal/20 font-mono text-xs text-charcoal/80">
                    <span className="flex items-center gap-1 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-brick" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-brick">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 group-hover:text-dodger-blue transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base text-charcoal/90 leading-relaxed mb-6 font-medium">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/90 neo-border-sm font-mono text-xs font-bold text-charcoal"
                      >
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 border-t-2 border-charcoal/20 flex items-center justify-between">
                  <TactileButton
                    href={`/blog/${post.slug}`}
                    variant="charcoal"
                    size="sm"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    READ FULL ARTICLE
                  </TactileButton>

                  <span className="font-mono text-xs font-bold text-charcoal/60 group-hover:text-charcoal transition-colors">
                    &gt; ITB.LABS/BLOG
                  </span>
                </div>
              </NeoCard>
            </AnimatedCard>
          </div>
        );
      })}
    </HorizontalScrollTrack>
  );
}
