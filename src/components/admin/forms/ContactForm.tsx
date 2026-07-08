"use client";

import React, { useState, useTransition } from "react";
import { updateContact } from "@/app/admin/(dashboard)/actions";
import { AdminFormField, SaveStatus } from "@/components/admin/AdminFormComponents";
import type { ContactData } from "@/content/server";
import { Save, Loader2 } from "lucide-react";

export function ContactForm({ initialData }: { initialData: ContactData }) {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setError(undefined);
    startTransition(async () => {
      const res = await updateContact(formData);
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
          label="Section Title"
          name="sectionTitle"
          defaultValue={initialData.sectionTitle}
          required
          maxLength={200}
        />
        <AdminFormField
          label="Primary Email Address"
          name="email"
          type="email"
          defaultValue={initialData.email}
          required
          maxLength={150}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminFormField
          label="Location Text"
          name="location"
          defaultValue={initialData.location}
          required
          maxLength={200}
        />
        <AdminFormField
          label="Bottom Banner Text"
          name="bottomBanner"
          defaultValue={initialData.bottomBanner}
          required
          maxLength={200}
        />
      </div>

      <AdminFormField
        label="Section Description"
        name="sectionDescription"
        type="textarea"
        rows={3}
        defaultValue={initialData.sectionDescription}
        required
        maxLength={1000}
      />

      <AdminFormField
        label="Availability Status Box"
        name="availabilityStatus"
        type="textarea"
        rows={3}
        defaultValue={initialData.availabilityStatus}
        required
        maxLength={500}
      />

      <div className="space-y-6 pt-4 border-t-2 border-charcoal/10">
        <h3 className="font-bold font-mono text-sm uppercase text-charcoal tracking-wider">
          &gt; Interactive Form &amp; Social Configurations
        </h3>

        <AdminFormField
          label="Form Inquiry Subjects (Comma Separated)"
          name="formSubjects"
          type="textarea"
          rows={3}
          defaultValue={initialData.formSubjects.join(", ")}
          hint="Separate each dropdown option with a comma."
        />

        <AdminFormField
          label="Social Links (JSON Array)"
          name="socialLinks"
          type="textarea"
          rows={5}
          defaultValue={JSON.stringify(initialData.socialLinks, null, 2)}
          hint='Format: [{"label": "GitHub @...", "url": "https://github.com/...", "icon": "Github"}]'
        />
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
              <span>Save Contact Configuration</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
