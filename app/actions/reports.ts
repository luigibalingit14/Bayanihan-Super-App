"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const ReportSchema = z.object({
  category: z.enum(["mobility", "governance", "health", "agriculture", "general"]),
  type: z.string().min(1),
  description: z.string().min(10),
  location: z.string().optional(),
});

export async function submitReport(formData: FormData) {
  const raw = {
    category: formData.get("category"),
    type: formData.get("type"),
    description: formData.get("description"),
    location: formData.get("location") ?? undefined,
  };

  const parsed = ReportSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to submit a report." };
  }

  const { error } = await supabase.from("reports").insert([{ ...parsed.data, user_id: user.id }]);
  if (error) return { error: error.message };

  return { success: true };
}
