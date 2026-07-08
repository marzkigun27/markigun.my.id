import React from "react";
import { getSkills } from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import { SkillsManager } from "@/components/admin/forms/SkillsManager";

export default async function AdminSkillsPage() {
  const skills = getSkills();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <AdminSectionHeader
        title="Skills &amp; Technical Arsenal Manager"
        description="Add, edit, or categorize programming languages, scientific computing tools, framework competencies, and hardware experience."
        badge="MODULE 07 // SKILLS"
      />
      <SkillsManager initialData={skills} />
    </div>
  );
}
