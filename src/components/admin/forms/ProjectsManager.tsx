"use client";

import React, { useState, useTransition } from "react";
import { saveProject, deleteProject } from "@/app/admin/(dashboard)/actions";
import { AdminFormField, SaveStatus } from "@/components/admin/AdminFormComponents";
import type { Project } from "@/types";
import { Save, Plus, Trash2, Edit3, Loader2, Star } from "lucide-react";

export function ProjectsManager({ initialData }: { initialData: Project[] }) {
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setError(undefined);
    startTransition(async () => {
      const res = await saveProject(formData);
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
    if (confirm("Are you sure you want to delete this project? This cannot be undone.")) {
      setStatus("saving");
      startTransition(async () => {
        const fd = new FormData();
        fd.set("id", id);
        const res = await deleteProject(fd);
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

  const PROJECT_CATEGORIES = [
    { label: "Engineering Physics", value: "Engineering Physics" },
    { label: "Full-Stack Software", value: "Full-Stack Software" },
    { label: "Hardware & Embedded", value: "Hardware & Embedded" },
  ];

  return (
    <div className="space-y-8">
      <SaveStatus status={status} error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Project List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-floral-white/20">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-floral-white">
              &gt; Active Projects ({initialData.length})
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-3 py-1.5 bg-brick text-white neo-border-sm font-mono text-xs font-bold uppercase tracking-wider hover:bg-light-salmon hover:text-charcoal transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
            {initialData.map((proj) => (
              <div
                key={proj.id}
                className={`p-4 neo-border border-2 transition-all ${
                  editingItem?.id === proj.id
                    ? "bg-brick text-white border-white shadow-[6px_6px_0px_#DA7438]"
                    : "bg-floral-white text-charcoal border-charcoal hover:translate-x-1"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 bg-charcoal text-white">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase text-brick bg-navajo-white px-1.5 py-0.5">
                          <Star className="w-3 h-3 fill-brick" /> Featured
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-base truncate">{proj.title}</h4>
                    <p className="font-mono text-xs opacity-80 truncate">{proj.tagline}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingItem(proj)}
                      className="p-1.5 hover:bg-black/10"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 hover:bg-brick hover:text-white text-brick"
                      title="Delete Project"
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
                {editingItem ? `Edit: ${editingItem.title}` : "Create New Project"}
              </h3>
              <p className="font-mono text-xs text-charcoal/60 mt-0.5">
                // Configure project metadata, architecture, and telemetry
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
                label="Project Title *"
                name="title"
                defaultValue={editingItem?.title || ""}
                required
                maxLength={200}
              />
              <AdminFormField
                label="URL Slug (Optional)"
                name="slug"
                defaultValue={editingItem?.slug || ""}
                placeholder="auto-generated-from-title"
                maxLength={100}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Category *"
                name="category"
                type="select"
                options={PROJECT_CATEGORIES}
                defaultValue={editingItem?.category || ""}
                required
              />
              <AdminFormField
                label="Date / Year *"
                name="date"
                defaultValue={editingItem?.date || "2025"}
                required
                maxLength={20}
              />
            </div>

            <AdminFormField
              label="Tagline *"
              name="tagline"
              defaultValue={editingItem?.tagline || ""}
              required
              maxLength={300}
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
              label="Technologies Used (Comma Separated) *"
              name="technologies"
              type="textarea"
              rows={2}
              defaultValue={editingItem?.technologies.join(", ") || ""}
              required
              hint="Next.js, TypeScript, Tailwind CSS, TimescaleDB"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="GitHub Repository URL"
                name="githubUrl"
                type="url"
                defaultValue={editingItem?.githubUrl || ""}
                placeholder="https://github.com/..."
              />
              <AdminFormField
                label="Live Demo URL"
                name="liveUrl"
                type="url"
                defaultValue={editingItem?.liveUrl || ""}
                placeholder="https://..."
              />
            </div>

            <div className="p-4 bg-charcoal/5 neo-border-sm space-y-3">
              <label className="flex items-center gap-3 cursor-pointer font-mono text-xs font-bold uppercase text-charcoal">
                <input
                  type="checkbox"
                  name="featured"
                  value="true"
                  defaultChecked={editingItem?.featured || false}
                  className="w-4 h-4 accent-brick"
                />
                <span>Feature on Landing Page Grid</span>
              </label>
            </div>

            <div className="space-y-4 pt-4 border-t-2 border-charcoal/10">
              <h4 className="font-bold font-mono text-xs uppercase tracking-wider text-charcoal">
                &gt; Deep Dive Case Study Content
              </h4>

              <AdminFormField
                label="The Problem"
                name="problem"
                type="textarea"
                rows={3}
                defaultValue={editingItem?.problem || ""}
              />

              <AdminFormField
                label="The Solution"
                name="solution"
                type="textarea"
                rows={3}
                defaultValue={editingItem?.solution || ""}
              />

              <AdminFormField
                label="System Architecture"
                name="architecture"
                type="textarea"
                rows={3}
                defaultValue={editingItem?.architecture || ""}
              />

              <AdminFormField
                label="Key Challenges (Comma Separated)"
                name="challenges"
                type="textarea"
                rows={2}
                defaultValue={editingItem?.challenges?.join(", ") || ""}
              />

              <AdminFormField
                label="Results & Outcomes (Comma Separated)"
                name="results"
                type="textarea"
                rows={2}
                defaultValue={editingItem?.results?.join(", ") || ""}
              />

              <AdminFormField
                label="Lessons Learned (Comma Separated)"
                name="lessonsLearned"
                type="textarea"
                rows={2}
                defaultValue={editingItem?.lessonsLearned?.join(", ") || ""}
              />

              <AdminFormField
                label="Metrics (JSON Array)"
                name="metrics"
                type="textarea"
                rows={4}
                defaultValue={JSON.stringify(editingItem?.metrics || [], null, 2)}
                hint='Format: [{"value": "60 FPS", "label": "Simulation Speed"}]'
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
                    <span>Saving Project...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? "Update Project" : "Create Project"}</span>
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
