import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  },
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const productId = typeof body.productId === "string" ? body.productId : "";

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!productId || !email) {
      return NextResponse.json(
        { error: "Product and email are required." },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length > 254 || !emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const { data: product, error: productError } = await supabaseAdmin
      .from("products")
      .select("id, availability")
      .eq("id", productId)
      .maybeSingle();

    if (productError) {
      console.error("Product lookup failed:", productError.message);

      return NextResponse.json(
        { error: "Unable to process your request." },
        { status: 500 },
      );
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 },
      );
    }

    if (!["upcoming", "sold_out"].includes(product.availability)) {
      return NextResponse.json(
        { error: "This product is not accepting waitlist registrations." },
        { status: 400 },
      );
    }

    const { error: insertError } = await supabaseAdmin.from("waitlist").insert({
      product_id: product.id,
      email,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "This email is already registered for this sneaker." },
          { status: 409 },
        );
      }

      console.error("Waitlist insertion failed:", insertError.message);

      return NextResponse.json(
        { error: "Unable to join the waitlist. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "You have successfully joined the waitlist!" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
