"use client";

import React, { useState, useTransition } from "react";
import { updateAbout } from "@/app/admin/(dashboard)/actions";
import { AdminFormField, SaveStatus } from "@/components/admin/AdminFormComponents";
import type { AboutMilestone } from "@/content/server";
import { Save, Plus, Trash2, Edit3, ArrowUp, ArrowDown, Loader2 } from "lucide-react";

export function AboutManager({ initialData }: { initialData: AboutMilestone[] }) {
  const [milestones, setMilestones] = useState<AboutMilestone[]>(initialData);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  // Handle form submission for a single milestone edit/add
  function handleSaveItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const item: AboutMilestone = {
      year: String(fd.get("year") || ""),
      title: String(fd.get("title") || ""),
      subtitle: String(fd.get("subtitle") || ""),
      icon: String(fd.get("icon") || "Atom"),
      description: String(fd.get("description") || ""),
      skills: String(fd.get("skills") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const updated = [...milestones];
    if (editingIdx !== null && editingIdx < updated.length) {
      updated[editingIdx] = item;
    } else {
      updated.push(item);
    }
    setMilestones(updated);
    setEditingIdx(null);
  }

  function handleDelete(idx: number) {
    if (confirm("Are you sure you want to delete this milestone?")) {
      setMilestones(milestones.filter((_, i) => i !== idx));
      if (editingIdx === idx) setEditingIdx(null);
    }
  }

  function handleMove(idx: number, direction: "up" | "down") {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= milestones.length) return;
    const updated = [...milestones];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setMilestones(updated);
  }

  async function handleSaveAll() {
    setStatus("saving");
    setError(undefined);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("milestones", JSON.stringify(milestones));
      const res = await updateAbout(fd);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(res.error);
      }
    });
  }

  const currentItem = editingIdx !== null && editingIdx < milestones.length ? milestones[editingIdx] : null;

  return (
    <div className="space-y-8">
      <SaveStatus status={status} error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-floral-white/20">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-floral-white">
              &gt; Active Milestones ({milestones.length})
            </h3>
            <button
              type="button"
              onClick={() => setEditingIdx(milestones.length)}
              className="px-3 py-1.5 bg-brick text-white neo-border-sm font-mono text-xs font-bold uppercase tracking-wider hover:bg-light-salmon hover:text-charcoal transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add New</span>
            </button>
          </div>

          <div className="space-y-3">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 neo-border border-2 transition-all ${
                  editingIdx === idx
                    ? "bg-brick text-white border-white shadow-[6px_6px_0px_#DA7438]"
                    : "bg-floral-white text-charcoal border-charcoal hover:translate-x-1"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-charcoal text-white inline-block mb-1">
                      {item.year} // {item.icon}
                    </span>
                    <h4 className="font-bold text-base truncate">{item.title}</h4>
                    <p className="font-mono text-xs opacity-80 truncate">{item.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 hover:bg-black/10 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === milestones.length - 1}
                      className="p-1 hover:bg-black/10 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingIdx(idx)}
                      className="p-1 hover:bg-black/10"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="p-1 hover:bg-brick hover:text-white text-brick"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t-2 border-floral-white/20">
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isPending}
              className="w-full tactile-btn-blue text-white px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 rounded-full hover:rounded-none transition-all disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Timeline...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save All Changes to Server</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Edit / Add Form */}
        <div className="lg:col-span-6 bg-floral-white neo-border border-3 border-charcoal shadow-[8px_8px_0px_#161616] p-6 sm:p-8">
          <div className="border-b-2 border-charcoal/20 pb-4 mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-charcoal">
                {editingIdx !== null && editingIdx < milestones.length
                  ? `Edit Milestone #${editingIdx + 1}`
                  : "Create New Milestone"}
              </h3>
              <p className="font-mono text-xs text-charcoal/60 mt-0.5">
                // Modify fields and click Apply to update list
              </p>
            </div>
            {editingIdx !== null && (
              <button
                type="button"
                onClick={() => setEditingIdx(null)}
                className="font-mono text-xs font-bold text-brick uppercase hover:underline"
              >
                Cancel / Reset
              </button>
            )}
          </div>

          <form key={editingIdx ?? "new"} onSubmit={handleSaveItem} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Year / Period"
                name="year"
                defaultValue={currentItem?.year || ""}
                placeholder="e.g. 2025 (MID)"
                required
              />
              <AdminFormField
                label="Icon Name"
                name="icon"
                defaultValue={currentItem?.icon || "Atom"}
                placeholder="Atom, Terminal, Cpu, etc."
                required
              />
            </div>

            <AdminFormField
              label="Title"
              name="title"
              defaultValue={currentItem?.title || ""}
              placeholder="e.g. Supercomputers & Materials Simulation"
              required
            />

            <AdminFormField
              label="Subtitle"
              name="subtitle"
              defaultValue={currentItem?.subtitle || ""}
              placeholder="e.g. First-Principles DFT Research Group"
              required
            />

            <AdminFormField
              label="Description"
              name="description"
              type="textarea"
              rows={4}
              defaultValue={currentItem?.description || ""}
              required
            />

            <AdminFormField
              label="Skills (Comma Separated)"
              name="skills"
              type="textarea"
              rows={2}
              defaultValue={currentItem?.skills.join(", ") || ""}
              placeholder="Quantum ESPRESSO, Python, Slurm HPC"
            />

            <div className="pt-2">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-charcoal text-white font-mono text-xs font-bold uppercase tracking-wider neo-border-sm hover:bg-brick transition-colors"
              >
                {editingIdx !== null && editingIdx < milestones.length
                  ? "Apply Changes to List"
                  : "Add Milestone to List"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
