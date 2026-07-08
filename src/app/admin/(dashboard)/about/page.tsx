import React from "react";
import { getAboutMilestones } from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import { AboutManager } from "@/components/admin/forms/AboutManager";

export default async function AdminAboutPage() {
  const milestones = getAboutMilestones();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <AdminSectionHeader
        title="About Section &amp; Journey Editor"
        description="Manage the chronological milestones, academic story, and skill evolution displayed on the homepage."
        badge="MODULE 02 // ABOUT"
      />
      <AboutManager initialData={milestones} />
    </div>
  );
}
