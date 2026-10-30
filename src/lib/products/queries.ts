import { createClient } from "@/lib/supabase/server";

export async function getProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, price, image_url, availability, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Unable to load products.");
  }

  return data;
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, price, image_url, availability, created_at",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching product:", error.message);
    throw new Error("Unable to load product.");
  }

  return data;
}
