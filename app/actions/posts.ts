"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const PostSchema = z.object({
  category: z.enum(["disinfo", "employment", "agriculture", "announcement"]),
  title: z.string().min(3),
  content: z.string().optional(),
  tags: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export async function createPost(formData: FormData) {
  const raw = {
    category: formData.get("category"),
    title: formData.get("title"),
    content: formData.get("content") ?? undefined,
    tags: formData.get("tags") ?? undefined,
    metadata: undefined,
  };

  const parsed = PostSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const tagsArray = parsed.data.tags
    ? parsed.data.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to share an update." };
  }

  const { error } = await supabase.from("posts").insert([
    { ...parsed.data, tags: tagsArray, user_id: user.id },
  ]);
  if (error) return { error: error.message };

  return { success: true };
}

export async function flagPost(id: string) {
  const supabase = createClient();
  const { error } = await supabase.rpc("increment_flag_count", { post_id: id });
  if (error) {
    // Fallback: manual increment
    const { data } = await supabase.from("posts").select("flag_count").eq("id", id).single();
    if (data) {
      await supabase
        .from("posts")
        .update({ flag_count: (data.flag_count || 0) + 1, flagged: true })
        .eq("id", id);
    }
  }
  return { success: true };
}
