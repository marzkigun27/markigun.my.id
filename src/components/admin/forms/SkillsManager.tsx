"use client";

import React, { useState, useTransition } from "react";
import { saveSkill, deleteSkill } from "@/app/admin/(dashboard)/actions";
import { AdminFormField, SaveStatus } from "@/components/admin/AdminFormComponents";
import type { Skill } from "@/types";
import { Save, Plus, Trash2, Edit3, Loader2 } from "lucide-react";

export function SkillsManager({ initialData }: { initialData: Skill[] }) {
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setError(undefined);
    startTransition(async () => {
      const res = await saveSkill(formData);
      if (res.success) {
        setStatus("success");
        setEditingItem(null);
      } else {
        setStatus("error");
        setError(res.error);
      }
    });
  }

  async function handleDelete(name: string) {
    if (confirm(`Are you sure you want to delete the skill "${name}"?`)) {
      setStatus("saving");
      startTransition(async () => {
        const fd = new FormData();
        fd.set("name", name);
        const res = await deleteSkill(fd);
        if (res.success) {
          setStatus("success");
          if (editingItem?.name === name) setEditingItem(null);
        } else {
          setStatus("error");
          setError(res.error);
        }
      });
    }
  }

  const SKILL_CATEGORIES = [
    { label: "Programming", value: "Programming" },
    { label: "Scientific Computing", value: "Scientific Computing" },
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Engineering & Tools", value: "Engineering & Tools" },
  ];

  const PROFICIENCY_LEVELS = [
    { label: "Expert", value: "Expert" },
    { label: "Advanced", value: "Advanced" },
    { label: "Proficient", value: "Proficient" },
    { label: "Familiar", value: "Familiar" },
  ];

  return (
    <div className="space-y-8">
      <SaveStatus status={status} error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skills List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-floral-white/20">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-floral-white">
              &gt; Technical Arsenal ({initialData.length})
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-3 py-1.5 bg-brick text-white neo-border-sm font-mono text-xs font-bold uppercase tracking-wider hover:bg-light-salmon hover:text-charcoal transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>New Skill</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
            {initialData.map((skill) => (
              <div
                key={skill.name}
                className={`p-4 neo-border border-2 transition-all ${
                  editingItem?.name === skill.name
                    ? "bg-brick text-white border-white shadow-[6px_6px_0px_#DA7438]"
                    : "bg-floral-white text-charcoal border-charcoal hover:translate-x-1"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 bg-charcoal text-white">
                        {skill.category}
                      </span>
                      <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 bg-dodger-blue text-white">
                        {skill.proficiency} // {skill.yearsOfExperience}y
                      </span>
                    </div>
                    <h4 className="font-bold text-base truncate">{skill.name}</h4>
                    <p className="font-mono text-xs opacity-80 truncate">{skill.description}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingItem(skill)}
                      className="p-1.5 hover:bg-black/10"
                      title="Edit Skill"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(skill.name)}
                      className="p-1.5 hover:bg-brick hover:text-white text-brick"
                      title="Delete Skill"
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
                {editingItem ? `Edit: ${editingItem.name}` : "Add New Skill / Tool"}
              </h3>
              <p className="font-mono text-xs text-charcoal/60 mt-0.5">
                // Configure proficiency metrics, related stacks, and project usage
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

          <form key={editingItem?.name ?? "new"} action={handleSubmit} className="space-y-6">
            <input type="hidden" name="originalName" value={editingItem?.name || ""} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Skill / Tool Name *"
                name="name"
                defaultValue={editingItem?.name || ""}
                required
                maxLength={200}
              />
              <AdminFormField
                label="Category *"
                name="category"
                type="select"
                options={SKILL_CATEGORIES}
                defaultValue={editingItem?.category || ""}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Proficiency Level *"
                name="proficiency"
                type="select"
                options={PROFICIENCY_LEVELS}
                defaultValue={editingItem?.proficiency || ""}
                required
              />
              <AdminFormField
                label="Years of Experience *"
                name="yearsOfExperience"
                type="number"
                defaultValue={editingItem?.yearsOfExperience || 3}
                required
              />
            </div>

            <AdminFormField
              label="Description / Application *"
              name="description"
              type="textarea"
              rows={3}
              defaultValue={editingItem?.description || ""}
              required
              maxLength={1000}
            />

            <AdminFormField
              label="Projects Used In (Comma Separated) *"
              name="projectsUsedIn"
              type="textarea"
              rows={2}
              defaultValue={editingItem?.projectsUsedIn.join(", ") || ""}
              required
              hint="Indoor Air Quality Dashboard, DFT Simulation Pipeline, etc."
            />

            <AdminFormField
              label="Related Technologies & Libraries (Comma Separated) *"
              name="relatedTech"
              type="textarea"
              rows={2}
              defaultValue={editingItem?.relatedTech.join(", ") || ""}
              required
              hint="NumPy, SciPy, Matplotlib, Pandas, PyTorch"
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
                    <span>Saving Skill...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? "Update Skill" : "Add Skill"}</span>
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
