"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// ─── Form Field ───
export function AdminFormField({
  label,
  name,
  type = "text",
  defaultValue = "",
  placeholder = "",
  required = false,
  maxLength,
  rows,
  hint,
  options,
}: {
  label: string;
  name: string;
  type?: "text" | "textarea" | "select" | "number" | "url" | "email";
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  hint?: string;
  options?: Array<{ label: string; value: string }>;
}) {
  const baseClass =
    "w-full px-3.5 py-2.5 bg-white neo-border-sm font-mono text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-dodger-blue transition-all";

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block font-mono text-[11px] font-bold uppercase tracking-wider text-charcoal/80"
      >
        {label}
        {required && <span className="text-brick ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          defaultValue={String(defaultValue)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          rows={rows || 4}
          className={cn(baseClass, "resize-y")}
        />
      ) : type === "select" && options ? (
        <select
          id={name}
          name={name}
          defaultValue={String(defaultValue)}
          required={required}
          className={cn(baseClass, "cursor-pointer")}
        >
          <option value="">-- Select --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          defaultValue={String(defaultValue)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={baseClass}
        />
      )}
      {hint && (
        <p className="font-mono text-[10px] text-charcoal/50">{hint}</p>
      )}
    </div>
  );
}

// ─── Save Status Banner ───
export function SaveStatus({
  status,
  error,
}: {
  status: "idle" | "saving" | "success" | "error";
  error?: string;
}) {
  if (status === "idle") return null;

  return (
    <div
      className={cn(
        "p-3 neo-border-sm flex items-center gap-2 font-mono text-xs font-bold",
        status === "success" && "bg-emerald-green/10 text-emerald-green border-emerald-green",
        status === "error" && "bg-brick/10 text-brick border-brick",
        status === "saving" && "bg-dodger-blue/10 text-dodger-blue border-dodger-blue"
      )}
    >
      {status === "success" && <CheckCircle2 className="w-4 h-4" />}
      {status === "error" && <AlertCircle className="w-4 h-4" />}
      <span>
        {status === "success" && "Changes saved successfully!"}
        {status === "error" && (error || "Failed to save changes.")}
        {status === "saving" && "Saving..."}
      </span>
    </div>
  );
}

// ─── Section Header ───
export function AdminSectionHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <div className="space-y-3 pb-6 border-b-3 border-floral-white/20 mb-8">
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brick text-white neo-border-sm font-mono text-[10px] font-bold uppercase tracking-widest shadow-[2px_2px_0px_#F69B66]">
          {badge}
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-floral-white">
        {title}
      </h1>
      {description && (
        <p className="font-mono text-sm text-floral-white/60 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

// ─── Item Card (for list views) ───
export function AdminItemCard({
  title,
  subtitle,
  children,
  onDelete,
  deleteId,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onDelete?: (formData: FormData) => void;
  deleteId?: string;
}) {
  return (
    <div className="bg-floral-white neo-border border-3 border-charcoal shadow-[4px_4px_0px_#161616] p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-bold text-lg text-charcoal truncate">{title}</h3>
          {subtitle && (
            <p className="font-mono text-xs text-charcoal/60 mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
        {onDelete && deleteId && (
          <form action={onDelete}>
            <input type="hidden" name="id" value={deleteId} />
            <input type="hidden" name="name" value={deleteId} />
            <button
              type="submit"
              className="px-3 py-1.5 bg-brick/10 text-brick neo-border-sm font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-brick hover:text-white transition-colors shrink-0"
            >
              Delete
            </button>
          </form>
        )}
      </div>
      {children}
    </div>
  );
}
