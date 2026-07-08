import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/content";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeoCard } from "@/components/ui/NeoCard";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  BookOpen, 
  Terminal, 
  Share2, 
  Tag
} from "lucide-react";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Parse markdown-like content into clean JSX blocks safely
  const paragraphs = post.content.trim().split("\n\n");

  return (
    <div className="min-h-screen bg-floral-white text-charcoal flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-dodger-blue hover:text-charcoal transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>&gt; RETURN TO ENGINEERING BLOG</span>
            </Link>
          </div>

          {/* Article Header Banner */}
          <NeoCard variant="charcoal" shadow="lg" badge={post.category} badgeColor="blue" className="mb-12 bg-charcoal text-floral-white border-floral-white">
            <div className="space-y-4">
              <div className="flex items-center gap-4 font-mono text-xs text-light-salmon-2 font-bold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 text-emerald-green">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {post.title}
              </h1>
              <p className="font-mono text-base text-floral-white/80 leading-relaxed bg-white/10 p-4 neo-border-sm">
                {post.excerpt}
              </p>
            </div>
          </NeoCard>

          {/* Article Body */}
          <NeoCard variant="white" shadow="md" className="p-8 sm:p-12 mb-12">
            <article className="space-y-6 text-base sm:text-lg text-charcoal/90 leading-relaxed font-sans">
              {paragraphs.map((para, idx) => {
                const trimmed = para.trim();
                if (trimmed.startsWith("# ")) {
                  return (
                    <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-charcoal pt-4 border-b-2 border-charcoal/20 pb-2">
                      {trimmed.replace("# ", "")}
                    </h2>
                  );
                }
                if (trimmed.startsWith("## ")) {
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-bold text-dodger-blue pt-3">
                      {trimmed.replace("## ", "")}
                    </h3>
                  );
                }
                if (trimmed.startsWith("### ")) {
                  return (
                    <h4 key={idx} className="text-lg sm:text-xl font-bold text-charcoal pt-2 font-mono">
                      // {trimmed.replace("### ", "")}
                    </h4>
                  );
                }
                if (trimmed.startsWith("```")) {
                  const codeLines = trimmed.split("\n").slice(1, -1).join("\n");
                  return (
                    <div key={idx} className="bg-charcoal text-emerald-green p-6 neo-border font-mono text-sm overflow-x-auto my-6 shadow-[4px_4px_0px_#1C8DF0]">
                      <div className="text-[11px] text-light-salmon-2 uppercase tracking-widest pb-2 mb-2 border-b border-floral-white/20">
                        // CODE SNIPPET
                      </div>
                      <pre><code>{codeLines}</code></pre>
                    </div>
                  );
                }
                if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n");
                  return (
                    <ul key={idx} className="space-y-2 pl-4 font-mono text-sm sm:text-base my-4">
                      {items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <span className="text-brick font-bold shrink-0">&gt;</span>
                          <span>{item.replace(/^[0-9]+\. |- /, "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </article>

            {/* Tags Footer */}
            <div className="mt-12 pt-6 border-t-2 border-charcoal/20 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase text-charcoal/70 mr-2">
                // ARTICLE TAGS:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gainsboro neo-border-sm font-mono text-xs font-bold text-charcoal"
                >
                  # {tag}
                </span>
              ))}
            </div>
          </NeoCard>

          {/* Author Bio Box */}
          <NeoCard variant="gainsboro" shadow="md" className="flex flex-col sm:flex-row items-center gap-6 p-6">
            <div className="w-16 h-16 rounded-full bg-charcoal text-floral-white neo-border flex items-center justify-center font-mono font-bold text-xl shrink-0 shadow-[2px_2px_0px_#DA7438]">
              UZ
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-mono text-xs text-brick uppercase font-bold">
                // WRITTEN BY
              </div>
              <h4 className="text-lg font-bold">Umar Zaki Gunawan</h4>
              <p className="font-mono text-xs text-charcoal/80">
                Undergraduate Engineering Physics Student at ITB. Specializing in computational physics, embedded firmware, and full-stack software systems.
              </p>
            </div>
          </NeoCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
