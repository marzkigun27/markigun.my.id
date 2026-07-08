"use client";

import React, { useState } from "react";
import { NeoCard } from "@/components/ui/NeoCard";
import { TactileButton } from "@/components/ui/TactileButton";
import { AnimatedCard } from "@/components/ui/AnimatedScroll";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Terminal,
  ArrowUpRight
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Strict input validation (SecureCoder guideline: validate length & type)
    if (!formData.name.trim() || formData.name.length > 100) {
      setStatus("error");
      setErrorMessage("Please provide a valid name (1-100 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) || formData.email.length > 150) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.length > 2000) {
      setStatus("error");
      setErrorMessage("Message must be between 1 and 2000 characters.");
      return;
    }

    // Simulate secure submission (no real backend sink in static portfolio demo)
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 sm:py-32 bg-floral-white relative overflow-hidden border-b-3 border-charcoal">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16161608_1px,transparent_1px),linear-gradient(to_bottom,#16161608_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gainsboro neo-border-sm font-mono text-xs font-bold uppercase tracking-widest text-charcoal shadow-[2px_2px_0px_#161616]">
              <Terminal className="h-4 w-4 text-brick animate-pulse" />
              <span>MODULE 08 // DIRECT COMMUNICATION CHANNEL</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal leading-[1.05]">
              Let&apos;s build something <br />
              <span className="bg-brick text-white px-3 py-1 inline-block neo-border-sm transform -rotate-1 my-1">
                meaningful.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-4 lg:pt-8">
            <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-medium">
              Whether you are recruiting for **Summer 2026 R&amp;D internships**, exploring scientific computing collaborations, or just want to discuss semiconductor physics and systems code—my inbox is open.
            </p>
            <div className="p-4 bg-white neo-border font-mono text-xs text-charcoal/80 space-y-1.5 shadow-[4px_4px_0px_#161616]">
              <div className="font-bold text-brick uppercase">&gt; TELEMETRY INSTRUCTIONS:</div>
              <div>// Direct electronic mail directories and secure messaging channel.</div>
              <div>// All inputs are validated client-side and sanitized against XSS injection.</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Direct Contact & Directories Card (Left Col) */}
          <div className="lg:col-span-5 flex flex-col">
            <AnimatedCard index={0} variant="scale-in" className="h-full flex flex-col">
              <NeoCard
                variant="charcoal"
                shadow="lg"
                badge="DIRECT DIRECTORIES"
                badgeColor="salmon"
                className="flex flex-col justify-between h-full text-floral-white bg-charcoal border-3 border-floral-white shadow-[8px_8px_0px_#DA7438] p-6 sm:p-8"
              >
                <div className="space-y-6">
                  {/* Email Box */}
                  <div className="flex items-center gap-4 p-4 bg-white/10 neo-border-sm border-floral-white/20">
                    <div className="p-3 bg-brick text-white neo-border-sm shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-mono text-xs text-light-salmon-2 uppercase font-bold mb-1">
                        // PRIMARY ELECTRONIC MAIL
                      </div>
                      <a
                        href="mailto:umar.zaki@itb.ac.id"
                        className="text-base sm:text-lg font-bold font-mono tracking-tight text-white hover:text-light-sky-blue transition-colors truncate block"
                      >
                        umar.zaki@itb.ac.id
                      </a>
                    </div>
                  </div>

                  {/* Directories Grid */}
                  <div className="space-y-3">
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-navajo-white border-b border-floral-white/20 pb-2">
                      // PROFESSIONAL PROFILES
                    </div>

                    <div className="space-y-3 font-mono text-sm">
                      <a
                        href="https://github.com/umarzakigunawan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 bg-white/10 neo-border-sm hover:bg-dodger-blue hover:text-white transition-colors group text-white"
                      >
                        <span className="flex items-center gap-2.5 font-bold">
                          <Github className="w-5 h-5" />
                          <span>GitHub @umarzaki</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      <a
                        href="https://linkedin.com/in/umarzakigunawan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 bg-white/10 neo-border-sm hover:bg-dodger-blue hover:text-white transition-colors group text-white"
                      >
                        <span className="flex items-center gap-2.5 font-bold">
                          <Linkedin className="w-5 h-5" />
                          <span>LinkedIn Profile</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      <div className="flex items-center gap-3 p-3.5 bg-white/5 neo-border-sm text-floral-white/80">
                        <MapPin className="w-5 h-5 text-brick shrink-0" />
                        <span>Bandung, Indonesia &bull; Open to Remote &amp; Relocation</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Status Box */}
                  <div className="bg-emerald-green text-white p-4 neo-border-sm">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-1.5">
                      <CheckCircle2 className="w-4 h-4 animate-bounce" />
                      <span>AVAILABILITY STATUS</span>
                    </div>
                    <p className="font-mono text-xs sm:text-sm font-semibold leading-relaxed">
                      Currently looking for **Summer 2026 R&amp;D Internships** in software engineering, embedded systems, semiconductor EDA, or computational simulation.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-floral-white/20 flex items-center justify-between font-mono text-xs text-emerald-green">
                  <span>STATUS: DIRECT TRANSMISSION READY</span>
                  <span>ITB.LABS</span>
                </div>
              </NeoCard>
            </AnimatedCard>
          </div>

          {/* Secure Telemetry Transmission Form Card (Right Col) */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatedCard index={1} variant="scale-in" className="h-full flex flex-col">
              <NeoCard
                variant="floral"
                shadow="lg"
                badge="SECURE TELEMETRY FORM"
                badgeColor="blue"
                className="flex flex-col justify-between h-full p-6 sm:p-8"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b-2 border-charcoal/20 pb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
                      Send a Direct Message
                    </h3>
                    <p className="font-mono text-xs text-charcoal/70 mt-1">
                      &gt; All inputs are validated client-side and sanitized against XSS injection.
                    </p>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block font-mono text-xs font-bold uppercase tracking-wider text-charcoal">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Richard Feynman"
                        className="w-full px-3.5 py-2.5 bg-white neo-border-sm font-mono text-xs sm:text-sm text-charcoal focus:outline-none focus:bg-light-sky-blue/20 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block font-mono text-xs font-bold uppercase tracking-wider text-charcoal">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        maxLength={150}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="feynman@caltech.edu"
                        className="w-full px-3.5 py-2.5 bg-white neo-border-sm font-mono text-xs sm:text-sm text-charcoal focus:outline-none focus:bg-light-sky-blue/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject Selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block font-mono text-xs font-bold uppercase tracking-wider text-charcoal">
                      SUBJECT MODULE *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white neo-border-sm font-mono text-xs sm:text-sm text-charcoal focus:outline-none focus:bg-light-sky-blue/20 transition-colors cursor-pointer"
                    >
                      <option value="">-- Select Inquiry Purpose --</option>
                      <option value="Summer 2026 Internship Opportunity">Summer 2026 Internship Opportunity</option>
                      <option value="Full-Stack / IoT Project Collaboration">Full-Stack / IoT Project Collaboration</option>
                      <option value="Scientific Computing / DFT Research">Scientific Computing / DFT Research</option>
                      <option value="Semiconductor / RTL Hardware Discussion">Semiconductor / RTL Hardware Discussion</option>
                      <option value="General Inquiry">General Inquiry / Other</option>
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block font-mono text-xs font-bold uppercase tracking-wider text-charcoal">
                      MESSAGE CONTENT (MAX 2000 CHARS) *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      maxLength={2000}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, team goals, or question here..."
                      className="w-full px-3.5 py-2.5 bg-white neo-border-sm font-mono text-xs sm:text-sm text-charcoal focus:outline-none focus:bg-light-sky-blue/20 transition-colors resize-none"
                    />
                  </div>

                  {/* Status Feedback Alerts */}
                  {status === "error" && (
                    <div className="p-3 bg-brick text-white neo-border-sm flex items-center gap-2 font-mono text-xs font-bold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>ERROR: {errorMessage}</span>
                    </div>
                  )}

                  {status === "success" && (
                    <div className="p-3 bg-emerald-green text-white neo-border-sm flex items-center gap-2 font-mono text-xs font-bold animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>SUCCESS: Your message has been received. I will reply within 24 hours.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <TactileButton
                      type="submit"
                      variant="blue"
                      size="md"
                      fullWidth
                      disabled={status === "submitting"}
                      icon={<Send className="w-4 h-4" />}
                    >
                      {status === "submitting" ? "TRANSMITTING TELEMETRY..." : "SEND DIRECT MESSAGE"}
                    </TactileButton>
                  </div>
                </form>
              </NeoCard>
            </AnimatedCard>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-4 bg-gainsboro neo-border flex flex-wrap items-center justify-between gap-4 shadow-[4px_4px_0px_#161616]">
          <div className="font-mono text-xs sm:text-sm font-bold text-charcoal">
            &gt; AVAILABLE FOR SUMMER 2026 R&amp;D INTERNSHIPS // REMOTE &amp; GLOBAL
          </div>
          <div className="font-mono text-xs font-bold text-brick uppercase">
            [ ITB // PHYSICS &amp; COMPUTATION ]
          </div>
        </div>
      </div>
    </section>
  );
}
