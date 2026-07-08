import React from "react";
import { getBlogPosts } from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import { BlogManager } from "@/components/admin/forms/BlogManager";

export default async function AdminBlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <AdminSectionHeader
        title="Blog &amp; Articles Manager"
        description="Write, update, or delete technical essays, computational tutorials, and engineering physics blog posts."
        badge="MODULE 06 // BLOG"
      />
      <BlogManager initialData={posts} />
    </div>
  );
}
