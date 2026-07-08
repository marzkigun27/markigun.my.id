"use server";

import { attemptLogin } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
  formData: FormData
): Promise<{ error: string } | undefined> {
  const password = formData.get("password");

  if (typeof password !== "string") {
    return { error: "Invalid credentials." };
  }

  // Get client IP for rate limiting
  const headersList = await headers();
  const clientIp =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const result = await attemptLogin(password, clientIp);

  if (!result.success) {
    return { error: result.error || "Invalid credentials." };
  }

  redirect("/admin");
}
