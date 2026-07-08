import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { HeroSection } from "@/features/hero/HeroSection";
import { AboutSection } from "@/features/about/AboutSection";
import { SkillsSection } from "@/features/skills/SkillsSection";
import { ProjectsSection } from "@/features/projects/ProjectsSection";
import { ResearchSection } from "@/features/research/ResearchSection";
// import { TeachingSection } from "@/features/teaching/TeachingSection";
import { BlogSection } from "@/features/blog/BlogSection";
import { ExperienceSection } from "@/features/experience/ExperienceSection";
import { ContactSection } from "@/features/contact/ContactSection";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-floral-white text-charcoal flex flex-col font-sans selection:bg-light-salmon-2 selection:text-charcoal">
        <Navbar />

        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ResearchSection />
          {/* <TeachingSection /> */}
          <BlogSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
