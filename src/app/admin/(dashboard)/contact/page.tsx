import React from "react";
import { getContactData } from "@/content/server";
import { AdminSectionHeader } from "@/components/admin/AdminFormComponents";
import { ContactForm } from "@/components/admin/forms/ContactForm";

export default async function AdminContactPage() {
  const contactData = getContactData();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <AdminSectionHeader
        title="Contact Section Editor"
        description="Modify direct electronic mail directories, availability status banners, social profile links, and inquiry dropdown subjects."
        badge="MODULE 08 // CONTACT"
      />
      <ContactForm initialData={contactData} />
    </div>
  );
}
