"use client";

import React, { useState, useTransition } from "react";
import { saveExperience, deleteExperience } from "@/app/admin/(dashboard)/actions";
import { AdminFormField, SaveStatus } from "@/components/admin/AdminFormComponents";
import type { ExperienceItem } from "@/types";
import { Save, Plus, Trash2, Edit3, Loader2 } from "lucide-react";

export function ExperienceManager({ initialData }: { initialData: ExperienceItem[] }) {
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setError(undefined);
    startTransition(async () => {
      const res = await saveExperience(formData);
      if (res.success) {
        setStatus("success");
        setEditingItem(null);
      } else {
        setStatus("error");
        setError(res.error);
      }
    });
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this experience entry?")) {
      setStatus("saving");
      startTransition(async () => {
        const fd = new FormData();
        fd.set("id", id);
        const res = await deleteExperience(fd);
        if (res.success) {
          setStatus("success");
          if (editingItem?.id === id) setEditingItem(null);
        } else {
          setStatus("error");
          setError(res.error);
        }
      });
    }
  }

  const EXPERIENCE_TYPES = [
    { label: "Work / Professional", value: "work" },
    { label: "Education / Academic", value: "education" },
    { label: "Research / Laboratory", value: "research" },
  ];

  return (
    <div className="space-y-8">
      <SaveStatus status={status} error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Experience List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-floral-white/20">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-floral-white">
              &gt; Timeline ({initialData.length})
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-3 py-1.5 bg-brick text-white neo-border-sm font-mono text-xs font-bold uppercase tracking-wider hover:bg-light-salmon hover:text-charcoal transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>New Entry</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
            {initialData.map((item) => (
              <div
                key={item.id}
                className={`p-4 neo-border border-2 transition-all ${
                  editingItem?.id === item.id
                    ? "bg-brick text-white border-white shadow-[6px_6px_0px_#DA7438]"
                    : "bg-floral-white text-charcoal border-charcoal hover:translate-x-1"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 bg-charcoal text-white">
                        {item.type}
                      </span>
                      <span className="font-mono text-[9px] font-bold opacity-80">
                        {item.period}
                      </span>
                    </div>
                    <h4 className="font-bold text-base truncate">{item.role}</h4>
                    <p className="font-mono text-xs opacity-80 truncate">{item.organization} — {item.location}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 hover:bg-black/10"
                      title="Edit Entry"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 hover:bg-brick hover:text-white text-brick"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Edit / Add Form */}
        <div className="lg:col-span-7 bg-floral-white neo-border border-3 border-charcoal shadow-[8px_8px_0px_#161616] p-6 sm:p-8">
          <div className="border-b-2 border-charcoal/20 pb-4 mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-charcoal">
                {editingItem ? `Edit: ${editingItem.role}` : "Add New Experience Entry"}
              </h3>
              <p className="font-mono text-xs text-charcoal/60 mt-0.5">
                // Configure career history, academic degrees, or research positions
              </p>
            </div>
            {editingItem && (
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="font-mono text-xs font-bold text-brick uppercase hover:underline"
              >
                Cancel / Reset
              </button>
            )}
          </div>

          <form key={editingItem?.id ?? "new"} action={handleSubmit} className="space-y-6">
            <input type="hidden" name="id" value={editingItem?.id || ""} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Role / Degree / Position *"
                name="role"
                defaultValue={editingItem?.role || ""}
                required
                maxLength={200}
              />
              <AdminFormField
                label="Type *"
                name="type"
                type="select"
                options={EXPERIENCE_TYPES}
                defaultValue={editingItem?.type || ""}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Organization / University *"
                name="organization"
                defaultValue={editingItem?.organization || ""}
                required
                maxLength={200}
              />
              <AdminFormField
                label="Location *"
                name="location"
                defaultValue={editingItem?.location || ""}
                required
                maxLength={200}
              />
            </div>

            <AdminFormField
              label="Time Period *"
              name="period"
              defaultValue={editingItem?.period || "2024 — Present"}
              required
              maxLength={100}
            />

            <AdminFormField
              label="Overview Description *"
              name="description"
              type="textarea"
              rows={3}
              defaultValue={editingItem?.description || ""}
              required
              maxLength={2000}
            />

            <AdminFormField
              label="Key Highlights & Achievements (Comma Separated) *"
              name="highlights"
              type="textarea"
              rows={4}
              defaultValue={editingItem?.highlights.join(", ") || ""}
              required
              hint="Led DFT simulation pipeline development, Co-authored 2 conference papers, etc."
            />

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="tactile-btn-blue text-white px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 rounded-full hover:rounded-none transition-all disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Entry...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? "Update Entry" : "Add Entry"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
