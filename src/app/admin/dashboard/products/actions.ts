"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getAuthorizedClient() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || user.app_metadata?.role !== "admin") {
    throw new Error("Unauthorized access.");
  }

  return supabase;
}

function validateProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim();
  const price = Number(formData.get("price"));
  const availability = String(formData.get("availability") ?? "");

  if (!name || !slug || !description || !image_url) {
    throw new Error("All product fields are required.");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      "Slug must contain lowercase letters, numbers and hyphens.",
    );
  }

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Enter a valid product price.");
  }

  try {
    const imageUrl = new URL(image_url);

    if (!["http:", "https:"].includes(imageUrl.protocol)) {
      throw new Error();
    }
  } catch {
    throw new Error("Enter a valid image URL.");
  }

  if (!["available", "sold_out", "upcoming"].includes(availability)) {
    throw new Error("Invalid availability status.");
  }

  return {
    name,
    slug,
    description,
    image_url,
    price,
    availability,
  };
}

export async function createProduct(formData: FormData) {
  const supabase = await getAuthorizedClient();
  const product = validateProduct(formData);

  const { error } = await supabase.from("products").insert(product);

  if (error) {
    if (error.code === "23505") {
      throw new Error("A product with this slug already exists.");
    }

    throw new Error("Could not create product.");
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/dashboard/products");

  redirect("/admin/dashboard/products");
}

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = await getAuthorizedClient();
  const product = validateProduct(formData);

  const { error } = await supabase
    .from("products")
    .update(product)
    .eq("id", productId);

  if (error) {
    if (error.code === "23505") {
      throw new Error("A product with this slug already exists.");
    }

    throw new Error("Could not update product.");
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  revalidatePath("/admin/dashboard/products");

  redirect("/admin/dashboard/products");
}

export async function deleteProduct(productId: string) {
  const supabase = await getAuthorizedClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    throw new Error("Could not delete product.");
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/dashboard/products");

  redirect("/admin/dashboard/products");
}

export async function changeAvailability(
  productId: string,
  formData: FormData,
) {
  const supabase = await getAuthorizedClient();

  const availability = String(formData.get("availability") ?? "");

  if (!["available", "sold_out", "upcoming"].includes(availability)) {
    throw new Error("Invalid availability status.");
  }

  const { error } = await supabase
    .from("products")
    .update({ availability })
    .eq("id", productId);

  if (error) {
    throw new Error("Could not update product availability.");
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/dashboard/products");
}
