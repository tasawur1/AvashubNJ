import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase-server";
import { BlogsContent } from "./BlogsContent";
import type { BlogPost } from "@/data/blogs";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Blogs | Ava's Hub",
  description:
    "Read our blogs for awareness, practical guidance, and therapy insights on pediatric occupational therapy, sensory processing, independence, and family support.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  let initialPosts: BlogPost[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .or("hidden.is.null,hidden.eq.false")
      .order("created_at", { ascending: false });

    if (error) throw error;
    initialPosts = (data ?? []) as BlogPost[];
  } catch {
    // Falls through to empty state in BlogsContent
  }

  return <BlogsContent initialPosts={initialPosts} />;
}
