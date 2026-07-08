"use client";

import React, { useState, useTransition } from "react";
import { saveResearch, deleteResearch } from "@/app/admin/(dashboard)/actions";
import { AdminFormField, SaveStatus } from "@/components/admin/AdminFormComponents";
import type { ResearchPublication } from "@/types";
import { Save, Plus, Trash2, Edit3, Loader2 } from "lucide-react";

export function ResearchManager({ initialData }: { initialData: ResearchPublication[] }) {
  const [editingItem, setEditingItem] = useState<ResearchPublication | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setError(undefined);
    startTransition(async () => {
      const res = await saveResearch(formData);
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
    if (confirm("Are you sure you want to delete this publication?")) {
      setStatus("saving");
      startTransition(async () => {
        const fd = new FormData();
        fd.set("id", id);
        const res = await deleteResearch(fd);
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

  const RESEARCH_STATUSES = [
    { label: "Published", value: "Published" },
    { label: "Under Review", value: "Under Review" },
    { label: "In Preparation", value: "In Preparation" },
    { label: "Conference", value: "Conference" },
  ];

  return (
    <div className="space-y-8">
      <SaveStatus status={status} error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Research List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-floral-white/20">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-floral-white">
              &gt; Publications ({initialData.length})
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-3 py-1.5 bg-brick text-white neo-border-sm font-mono text-xs font-bold uppercase tracking-wider hover:bg-light-salmon hover:text-charcoal transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>New Paper</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
            {initialData.map((pub) => (
              <div
                key={pub.id}
                className={`p-4 neo-border border-2 transition-all ${
                  editingItem?.id === pub.id
                    ? "bg-brick text-white border-white shadow-[6px_6px_0px_#DA7438]"
                    : "bg-floral-white text-charcoal border-charcoal hover:translate-x-1"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 bg-charcoal text-white">
                        {pub.year}
                      </span>
                      <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 bg-dodger-blue text-white">
                        {pub.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-base truncate">{pub.title}</h4>
                    <p className="font-mono text-xs opacity-80 truncate">{pub.venue}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingItem(pub)}
                      className="p-1.5 hover:bg-black/10"
                      title="Edit Paper"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(pub.id)}
                      className="p-1.5 hover:bg-brick hover:text-white text-brick"
                      title="Delete Paper"
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
                {editingItem ? `Edit: ${editingItem.title}` : "Create New Publication"}
              </h3>
              <p className="font-mono text-xs text-charcoal/60 mt-0.5">
                // Configure DFT simulations, LaTeX equations, and findings
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

            <AdminFormField
              label="Paper Title *"
              name="title"
              defaultValue={editingItem?.title || ""}
              required
              maxLength={500}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="URL Slug (Optional)"
                name="slug"
                defaultValue={editingItem?.slug || ""}
                placeholder="auto-generated-from-title"
                maxLength={100}
              />
              <AdminFormField
                label="Publication Year *"
                name="year"
                type="number"
                defaultValue={editingItem?.year || 2025}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Status *"
                name="status"
                type="select"
                options={RESEARCH_STATUSES}
                defaultValue={editingItem?.status || ""}
                required
              />
              <AdminFormField
                label="Venue / Journal / Conference *"
                name="venue"
                defaultValue={editingItem?.venue || ""}
                required
                maxLength={300}
              />
            </div>

            <AdminFormField
              label="Authors (Comma Separated) *"
              name="authors"
              type="textarea"
              rows={2}
              defaultValue={editingItem?.authors.join(", ") || ""}
              required
              hint="Umar Zaki Gunawan, Dr. Ahmad, etc."
            />

            <AdminFormField
              label="Abstract *"
              name="abstract"
              type="textarea"
              rows={5}
              defaultValue={editingItem?.abstract || ""}
              required
              maxLength={5000}
            />

            <AdminFormField
              label="Keywords (Comma Separated) *"
              name="keywords"
              type="textarea"
              rows={2}
              defaultValue={editingItem?.keywords.join(", ") || ""}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="PDF Document URL"
                name="pdfUrl"
                type="url"
                defaultValue={editingItem?.pdfUrl || ""}
                placeholder="/papers/paper.pdf"
              />
              <AdminFormField
                label="DOI External URL"
                name="doiUrl"
                type="url"
                defaultValue={editingItem?.doiUrl || ""}
                placeholder="https://doi.org/..."
              />
            </div>

            <div className="space-y-4 pt-4 border-t-2 border-charcoal/10">
              <h4 className="font-bold font-mono text-xs uppercase tracking-wider text-charcoal">
                &gt; Scientific Methodology &amp; LaTeX Equations
              </h4>

              <AdminFormField
                label="Methods Used (Comma Separated)"
                name="methods"
                type="textarea"
                rows={2}
                defaultValue={editingItem?.methods?.join(", ") || ""}
              />

              <AdminFormField
                label="Key Findings (Comma Separated)"
                name="keyFindings"
                type="textarea"
                rows={3}
                defaultValue={editingItem?.keyFindings?.join(", ") || ""}
              />

              <AdminFormField
                label="LaTeX Equations (JSON Array)"
                name="equations"
                type="textarea"
                rows={4}
                defaultValue={JSON.stringify(editingItem?.equations || [], null, 2)}
                hint='Format: [{"latex": "E = mc^2", "description": "Mass-energy equivalence"}]'
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
                    <span>Saving Publication...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? "Update Publication" : "Create Publication"}</span>
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
