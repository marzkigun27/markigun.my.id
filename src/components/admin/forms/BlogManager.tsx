"use client";

import React, { useState, useTransition } from "react";
import { saveBlogPost, deleteBlogPost } from "@/app/admin/(dashboard)/actions";
import { AdminFormField, SaveStatus } from "@/components/admin/AdminFormComponents";
import type { BlogPost } from "@/types";
import { Save, Plus, Trash2, Edit3, Loader2 } from "lucide-react";

export function BlogManager({ initialData }: { initialData: BlogPost[] }) {
  const [editingItem, setEditingItem] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("saving");
    setError(undefined);
    startTransition(async () => {
      const res = await saveBlogPost(formData);
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
    if (confirm("Are you sure you want to delete this blog post?")) {
      setStatus("saving");
      startTransition(async () => {
        const fd = new FormData();
        fd.set("id", id);
        const res = await deleteBlogPost(fd);
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

  const BLOG_CATEGORIES = [
    { label: "Engineering Physics", value: "Engineering Physics" },
    { label: "Full-Stack Software", value: "Full-Stack Software" },
    { label: "Hardware & Embedded", value: "Hardware & Embedded" },
  ];

  return (
    <div className="space-y-8">
      <SaveStatus status={status} error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Blog List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-floral-white/20">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-floral-white">
              &gt; Articles ({initialData.length})
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-3 py-1.5 bg-brick text-white neo-border-sm font-mono text-xs font-bold uppercase tracking-wider hover:bg-light-salmon hover:text-charcoal transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
            {initialData.map((post) => (
              <div
                key={post.id}
                className={`p-4 neo-border border-2 transition-all ${
                  editingItem?.id === post.id
                    ? "bg-brick text-white border-white shadow-[6px_6px_0px_#DA7438]"
                    : "bg-floral-white text-charcoal border-charcoal hover:translate-x-1"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 bg-charcoal text-white">
                        {post.category}
                      </span>
                      <span className="font-mono text-[9px] font-bold opacity-80">
                        {post.readTime}
                      </span>
                    </div>
                    <h4 className="font-bold text-base truncate">{post.title}</h4>
                    <p className="font-mono text-xs opacity-80 truncate">{post.date}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingItem(post)}
                      className="p-1.5 hover:bg-black/10"
                      title="Edit Post"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 hover:bg-brick hover:text-white text-brick"
                      title="Delete Post"
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
        <div className="lg:col-span-8 bg-floral-white neo-border border-3 border-charcoal shadow-[8px_8px_0px_#161616] p-6 sm:p-8">
          <div className="border-b-2 border-charcoal/20 pb-4 mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-charcoal">
                {editingItem ? `Edit: ${editingItem.title}` : "Write New Blog Post"}
              </h3>
              <p className="font-mono text-xs text-charcoal/60 mt-0.5">
                // Compose markdown articles, code blocks, and technical tutorials
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
              label="Article Title *"
              name="title"
              defaultValue={editingItem?.title || ""}
              required
              maxLength={300}
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
                label="Category *"
                name="category"
                type="select"
                options={BLOG_CATEGORIES}
                defaultValue={editingItem?.category || ""}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField
                label="Publish Date *"
                name="date"
                defaultValue={editingItem?.date || new Date().toISOString().split("T")[0]}
                required
                maxLength={30}
              />
              <AdminFormField
                label="Estimated Read Time *"
                name="readTime"
                defaultValue={editingItem?.readTime || "5 min read"}
                required
                maxLength={20}
              />
            </div>

            <AdminFormField
              label="Article Excerpt (Summary) *"
              name="excerpt"
              type="textarea"
              rows={2}
              defaultValue={editingItem?.excerpt || ""}
              required
              maxLength={1000}
            />

            <AdminFormField
              label="Tags (Comma Separated) *"
              name="tags"
              type="textarea"
              rows={2}
              defaultValue={editingItem?.tags.join(", ") || ""}
              required
              hint="DFT, Quantum ESPRESSO, Python, Physics"
            />

            <div className="space-y-2 pt-2">
              <label htmlFor="content" className="block font-mono text-[11px] font-bold uppercase tracking-wider text-charcoal/80">
                Full Markdown Content * <span className="text-brick ml-1">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                rows={16}
                defaultValue={editingItem?.content || ""}
                required
                placeholder="# Introduction&#10;&#10;Write your technical blog post in Markdown format..."
                className="w-full px-4 py-3 bg-white neo-border-sm font-mono text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-dodger-blue transition-all resize-y"
              />
              <p className="font-mono text-[10px] text-charcoal/60">
                &gt; Markdown headings (#, ##), code blocks (```python ... ```), and lists are fully supported and rendered securely.
              </p>
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
                    <span>Publishing Article...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? "Update Article" : "Publish Article"}</span>
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
