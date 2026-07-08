import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/content";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeoCard } from "@/components/ui/NeoCard";
import { TactileButton } from "@/components/ui/TactileButton";
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Layers, 
  AlertTriangle, 
  BookOpen,
  Activity
} from "lucide-react";
import { Github } from "@/components/ui/Icons";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-floral-white text-charcoal flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-dodger-blue hover:text-charcoal transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>&gt; RETURN TO CASE STUDIES MATRIX</span>
            </Link>
          </div>

          {/* Header Banner */}
          <NeoCard variant="charcoal" shadow="lg" badge={project.category} badgeColor="salmon" className="mb-12 bg-charcoal text-floral-white border-floral-white">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-light-salmon-2 font-bold uppercase">
                <Terminal className="w-4 h-4" />
                <span>CASE STUDY RECORD // {project.date}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {project.title}
              </h1>
              <p className="font-mono text-base text-floral-white/80 leading-relaxed bg-white/10 p-4 neo-border-sm">
                {project.tagline}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-floral-white/20">
                {project.liveUrl && (
                  <TactileButton
                    href={project.liveUrl}
                    variant="blue"
                    size="md"
                    external
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    LAUNCH LIVE DEMO
                  </TactileButton>
                )}
                {project.githubUrl && (
                  <TactileButton
                    href={project.githubUrl}
                    variant="white"
                    size="md"
                    external
                    icon={<Github className="w-4 h-4" />}
                  >
                    VIEW GITHUB REPO
                  </TactileButton>
                )}
              </div>
            </div>
          </NeoCard>

          {/* Key Metrics Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {project.metrics.map((m) => (
                <NeoCard key={m.label} variant="gainsboro" shadow="sm" className="text-center p-4">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-brick">
                    {m.value}
                  </div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mt-1">
                    {m.label}
                  </div>
                </NeoCard>
              ))}
            </div>
          )}

          {/* Main Content Sections */}
          <div className="space-y-12">
            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <NeoCard variant="salmon" shadow="md" badge="01. THE PROBLEM" badgeColor="brick">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-brick" />
                    <span>Real-World Bottleneck</span>
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-charcoal/90">
                    {project.problem}
                  </p>
                </div>
              </NeoCard>

              <NeoCard variant="sky" shadow="md" badge="02. THE SOLUTION" badgeColor="blue">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-dodger-blue" />
                    <span>Engineering Breakdown</span>
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-charcoal/90">
                    {project.solution}
                  </p>
                </div>
              </NeoCard>
            </div>

            {/* Architecture Flow */}
            <NeoCard variant="white" shadow="lg" badge="03. SYSTEM ARCHITECTURE" badgeColor="charcoal">
              <div className="space-y-4">
                <div className="font-mono text-xs text-charcoal/70 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-brick" />
                  <span>END-TO-END DATA &amp; HARDWARE PIPELINE</span>
                </div>
                <div className="p-6 bg-charcoal text-emerald-green font-mono text-sm sm:text-base neo-border leading-relaxed tracking-wide">
                  {project.architecture}
                </div>
              </div>
            </NeoCard>

            {/* Technical Challenges */}
            <NeoCard variant="gainsboro" shadow="md" badge="04. TECHNICAL CHALLENGES" badgeColor="emerald">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-charcoal/70">
                  // HARDWARE &amp; SOFTWARE HURDLES OVERCOME
                </div>
                <ul className="space-y-3 font-mono text-sm">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-white p-4 neo-border-sm">
                      <span className="text-brick font-bold shrink-0">&gt;</span>
                      <span className="text-charcoal/90">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </NeoCard>

            {/* Empirical Results & Lessons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <NeoCard variant="white" shadow="md" badge="05. RESULTS &amp; IMPACT" badgeColor="emerald">
                <ul className="space-y-3 font-mono text-xs sm:text-sm">
                  {project.results.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-charcoal/90">
                      <CheckCircle2 className="w-4 h-4 text-emerald-green shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </NeoCard>

              <NeoCard variant="floral" shadow="md" badge="06. LESSONS LEARNED" badgeColor="salmon">
                <ul className="space-y-3 font-mono text-xs sm:text-sm">
                  {project.lessonsLearned.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-charcoal/90">
                      <BookOpen className="w-4 h-4 text-brick shrink-0 mt-0.5" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </NeoCard>
            </div>

            {/* Technology Stack Matrix */}
            <NeoCard variant="charcoal" shadow="md" className="bg-charcoal text-floral-white">
              <div className="space-y-4">
                <div className="font-mono text-xs text-light-salmon-2 font-bold uppercase tracking-widest">
                  // COMPLETE TECHNOLOGY STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-white/10 neo-border-sm font-mono text-xs text-white font-bold"
                    >
                      # {tech}
                    </span>
                  ))}
                </div>
              </div>
            </NeoCard>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t-3 border-charcoal flex justify-between items-center">
            <Link
              href="/#projects"
              className="tactile-btn-peach text-charcoal px-6 py-3 rounded-full font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ALL CASE STUDIES</span>
            </Link>
            <Link
              href="/#contact"
              className="tactile-btn-blue text-white px-6 py-3 rounded-full font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2"
            >
              <span>DISCUSS THIS PROJECT</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
