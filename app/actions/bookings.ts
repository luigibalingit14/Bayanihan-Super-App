"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const BookingSchema = z.object({
  service_type: z.enum(["healthcare", "employment", "transportation", "agriculture"]),
  provider_name: z.string().min(2),
  scheduled_at: z.string().optional(),
  notes: z.string().optional(),
});

export async function submitBooking(formData: FormData) {
  const raw = {
    service_type: formData.get("service_type"),
    provider_name: formData.get("provider_name"),
    scheduled_at: formData.get("scheduled_at") ?? undefined,
    notes: formData.get("notes") ?? undefined,
  };

  const parsed = BookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to book an appointment." };
  }

  const { error } = await supabase.from("bookings").insert([{ ...parsed.data, user_id: user.id }]);
  if (error) return { error: error.message };

  return { success: true };
}
