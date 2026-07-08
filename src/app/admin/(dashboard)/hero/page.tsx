import React from "react";
import { getHeroData } from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import { HeroForm } from "@/components/admin/forms/HeroForm";

export default async function AdminHeroPage() {
  const heroData = getHeroData();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <AdminSectionHeader
        title="Hero Section Editor"
        description="Modify the primary landing page banner, introduction bio, status badges, and academic metrics."
        badge="MODULE 01 // HERO"
      />
      <HeroForm initialData={heroData} />
    </div>
  );
}
