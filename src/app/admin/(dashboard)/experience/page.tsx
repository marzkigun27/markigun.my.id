import React from "react";
import { getExperienceTimeline } from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import { ExperienceManager } from "@/components/admin/forms/ExperienceManager";

export default async function AdminExperiencePage() {
  const items = getExperienceTimeline();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <AdminSectionHeader
        title="Experience &amp; Career Timeline Manager"
        description="Modify professional work history, academic qualifications, and research lab positions."
        badge="MODULE 05 // EXPERIENCE"
      />
      <ExperienceManager initialData={items} />
    </div>
  );
}
