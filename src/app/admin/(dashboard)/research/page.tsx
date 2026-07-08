import React from "react";
import { getResearchPublications } from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import { ResearchManager } from "@/components/admin/forms/ResearchManager";

export default async function AdminResearchPage() {
  const publications = getResearchPublications();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <AdminSectionHeader
        title="Research &amp; Publications Manager"
        description="Add, edit, or remove Density Functional Theory (DFT) papers, conference journals, LaTeX equations, and methodology highlights."
        badge="MODULE 04 // RESEARCH"
      />
      <ResearchManager initialData={publications} />
    </div>
  );
}
