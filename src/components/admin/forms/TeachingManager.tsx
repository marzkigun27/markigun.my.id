"use client";

import React, { useState, useTransition } from "react";
import { saveTeaching, deleteTeaching } from "@/app/admin/(dashboard)/actions";
import { AdminFormField, SaveStatus } from "@/components/admin/AdminFormComponents";
import type { TeachingExperience } from "@/types";
import { Save, Plus, Trash2, Edit3, Loader2 } from "lucide-react";

export function TeachingManager({ initialData }: { initialData: TeachingExperience[] }) {
  const [editingItem, setEditingItem] = useState<TeachingExperience | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setError(undefined);
    startTransition(async () => {
      const res = await saveTeaching(formData);
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
    if (confirm("Are you sure you want to delete this teaching module?")) {
      setStatus("saving");
      startTransition(async () => {
        const fd = new FormData();
        fd.set("id", id);
        const res = await deleteTeaching(fd);
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

  return (
    <div className="space-y-8">
      <SaveStatus status={status} error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Teaching List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-floral-white/20">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-floral-white">
              &gt; Courses Taught ({initialData.length})
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-3 py-1.5 bg-brick text-white neo-border-sm font-mono text-xs font-bold uppercase tracking-wider hover:bg-light-salmon hover:text-charcoal transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>New Course</span>
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
                        {item.code}
                      </span>
                      <span className="font-mono text-[9px] font-bold opacity-80">
                        {item.semester} // {item.studentCount} Students
                      </span>
                    </div>
                    <h4 className="font-bold text-base truncate">{item.course}</h4>
                    <p className="font-mono text-xs opacity-80 truncate">{item.role}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 hover:bg-black/10"
                      title="Edit Course"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 hover:bg-brick hover:text-white text-brick"
                      title="Delete Course"
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
                {editingItem ? `Edit: ${editingItem.course}` : "Add New Teaching Module"}
              </h3>
              <p className="font-mono text-xs text-charcoal/60 mt-0.5">
                // Configure teaching assistant duties, student enrollments, and syllabus topics
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
                label="Course Name *"
                name="course"
                defaultValue={editingItem?.course || ""}
                required
                maxLength={200}
              />
              <AdminFormField
                label="Course Code *"
                name="code"
                defaultValue={editingItem?.code || ""}
                placeholder="e.g. EP-301"
                required
                maxLength={20}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Role *"
                name="role"
                defaultValue={editingItem?.role || "Teaching Assistant"}
                required
                maxLength={200}
              />
              <AdminFormField
                label="Semester / Academic Year *"
                name="semester"
                defaultValue={editingItem?.semester || "Fall 2024"}
                required
                maxLength={50}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Number of Students Enrolled *"
                name="studentCount"
                type="number"
                defaultValue={editingItem?.studentCount || 45}
                required
              />
            </div>

            <AdminFormField
              label="Course & Role Description *"
              name="description"
              type="textarea"
              rows={3}
              defaultValue={editingItem?.description || ""}
              required
              maxLength={2000}
            />

            <AdminFormField
              label="Key Responsibilities (Comma Separated) *"
              name="responsibilities"
              type="textarea"
              rows={3}
              defaultValue={editingItem?.responsibilities.join(", ") || ""}
              required
              hint="Conducted weekly lab sessions, Graded computational physics assignments, etc."
            />

            <AdminFormField
              label="Topics Covered (Comma Separated) *"
              name="topics"
              type="textarea"
              rows={2}
              defaultValue={editingItem?.topics.join(", ") || ""}
              required
              hint="Numerical Differential Equations, Monte Carlo Simulation, Python"
            />

            <AdminFormField
              label="Student Feedback Quote (Optional)"
              name="feedbackQuote"
              type="textarea"
              rows={2}
              defaultValue={editingItem?.feedbackQuote || ""}
              placeholder="Quote from course evaluation..."
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
                    <span>Saving Course...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? "Update Course" : "Add Course"}</span>
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
