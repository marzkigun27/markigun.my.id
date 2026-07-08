"use client";

import React, { useState, useTransition } from "react";
import { updateHero } from "@/app/admin/(dashboard)/actions";
import { AdminFormField, SaveStatus } from "@/components/admin/AdminFormComponents";
import type { HeroData } from "@/content/server";
import { Save, Loader2 } from "lucide-react";

export function HeroForm({ initialData }: { initialData: HeroData }) {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setError(undefined);
    startTransition(async () => {
      const res = await updateHero(formData);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(res.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8 bg-floral-white neo-border border-3 border-charcoal shadow-[8px_8px_0px_#161616] p-6 sm:p-8">
      <SaveStatus status={status} error={error} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminFormField
          label="Name"
          name="name"
          defaultValue={initialData.name}
          required
          maxLength={100}
        />
        <AdminFormField
          label="Highlighted Name"
          name="highlightedName"
          defaultValue={initialData.highlightedName}
          required
          maxLength={100}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminFormField
          label="Tagline"
          name="tagline"
          defaultValue={initialData.tagline}
          required
          maxLength={200}
        />
        <AdminFormField
          label="Status Badge Text"
          name="statusBadge"
          defaultValue={initialData.statusBadge}
          required
          maxLength={200}
        />
      </div>

      <AdminFormField
        label="Bio (HTML supported)"
        name="bio"
        type="textarea"
        rows={3}
        defaultValue={initialData.bio}
        required
        maxLength={1000}
        hint="You can use standard bold/italic tags like <strong>Engineering Physics</strong>."
      />

      <AdminFormField
        label="Bio Terminal Quote"
        name="bioTerminal"
        type="textarea"
        rows={2}
        defaultValue={initialData.bioTerminal}
        required
        maxLength={500}
      />

      <div className="space-y-4 pt-4 border-t-2 border-charcoal/10">
        <h3 className="font-bold font-mono text-sm uppercase text-charcoal tracking-wider">
          &gt; Structured JSON Configurations
        </h3>
        <p className="font-mono text-xs text-charcoal/70">
          Modify the JSON arrays below to update badges, profile photos, CTA buttons, and stats. Must be valid JSON format.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminFormField
            label="Badges (JSON Array)"
            name="badges"
            type="textarea"
            rows={5}
            defaultValue={JSON.stringify(initialData.badges, null, 2)}
            hint='Format: [{"label": "...", "icon": "Cpu", "color": "light-salmon"}]'
          />
          <AdminFormField
            label="Stats (JSON Array)"
            name="stats"
            type="textarea"
            rows={5}
            defaultValue={JSON.stringify(initialData.stats, null, 2)}
            hint='Format: [{"value": "3.85", "suffix": "/4.0", "label": "..."}]'
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminFormField
            label="Profile Photos (JSON Array)"
            name="profilePhotos"
            type="textarea"
            rows={6}
            defaultValue={JSON.stringify(initialData.profilePhotos, null, 2)}
            hint='Format: [{"src": "/path.jpg", "alt": "...", "label": "CAM_01"}]'
          />
          <AdminFormField
            label="CTA Buttons (JSON Array)"
            name="ctaButtons"
            type="textarea"
            rows={6}
            defaultValue={JSON.stringify(initialData.ctaButtons, null, 2)}
            hint='Format: [{"label": "...", "href": "#projects", "variant": "blue"}]'
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="tactile-btn-blue text-white px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 rounded-full hover:rounded-none transition-all disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Telemetry...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Hero Configuration</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
