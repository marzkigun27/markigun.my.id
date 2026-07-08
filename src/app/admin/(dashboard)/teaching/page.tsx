import React from "react";
import { getTeachingExperience } from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import { TeachingManager } from "@/components/admin/forms/TeachingManager";

export default async function AdminTeachingPage() {
  const items = getTeachingExperience();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <AdminSectionHeader
        title="Teaching &amp; Academic Leadership Manager"
        description="Add, edit, or remove university courses taught, teaching assistant responsibilities, and student feedback quotes."
        badge="MODULE 09 // TEACHING"
      />
      <TeachingManager initialData={items} />
    </div>
  );
}
