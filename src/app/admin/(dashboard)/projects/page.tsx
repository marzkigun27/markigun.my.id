import React from "react";
import { getProjects } from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import { ProjectsManager } from "@/components/admin/forms/ProjectsManager";

export default async function AdminProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <AdminSectionHeader
        title="Projects &amp; Systems Manager"
        description="Create, update, and remove engineering case studies, full-stack web applications, and embedded hardware projects."
        badge="MODULE 03 // PROJECTS"
      />
      <ProjectsManager initialData={projects} />
    </div>
  );
}
