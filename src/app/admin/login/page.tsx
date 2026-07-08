"use client";

import React, { useState, useTransition } from "react";
import { loginAction } from "./actions";
import { Cpu, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FCF5EB 1px, transparent 1px), linear-gradient(to bottom, #FCF5EB 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brick text-white neo-border mx-auto shadow-[6px_6px_0px_#F69B66]">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-floral-white tracking-tight">
              CMS Admin
            </h1>
            <p className="font-mono text-xs text-floral-white/50 mt-1 uppercase tracking-widest">
              // Authenticated Access Required
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-floral-white neo-border border-3 border-charcoal shadow-[8px_8px_0px_#DA7438] p-8 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-brick uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Identity Verification</span>
          </div>

          <form action={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="admin-password"
                className="block font-mono text-xs font-bold uppercase tracking-wider text-charcoal"
              >
                Admin Password
              </label>
              <input
                type="password"
                id="admin-password"
                name="password"
                required
                maxLength={128}
                autoComplete="current-password"
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 bg-white neo-border-sm font-mono text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-dodger-blue focus:border-dodger-blue transition-all"
              />
            </div>

            {error && (
              <div className="p-3 bg-brick/10 neo-border-sm border-brick flex items-center gap-2 font-mono text-xs font-bold text-brick">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full tactile-btn-blue text-white px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 neo-border rounded-full hover:rounded-none transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Authenticate</span>
              )}
            </button>
          </form>

          <div className="pt-4 border-t-2 border-charcoal/10 font-mono text-[10px] text-charcoal/40 uppercase tracking-widest text-center">
            Protected endpoint • Rate-limited • Secure session
          </div>
        </div>
      </div>
    </div>
  );
}
