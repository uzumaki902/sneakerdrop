import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { changeAvailability, deleteProduct } from "./actions";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  availability: "available" | "sold_out" | "upcoming";
  created_at: string;
}

const availabilityStyles = {
  available: "bg-emerald-50 text-emerald-700",
  sold_out: "bg-red-50 text-red-700",
  upcoming: "bg-amber-50 text-amber-700",
};

const availabilityLabels = {
  available: "Available",
  sold_out: "Sold Out",
  upcoming: "Upcoming",
};

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: productsData, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, price, image_url, availability, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to load products.");
  }

  const products: Product[] = (productsData ?? []) as Product[];

  const availableCount = products.filter(
    (product) => product.availability === "available"
  ).length;

  const upcomingCount = products.filter(
    (product) => product.availability === "upcoming"
  ).length;

  const soldOutCount = products.filter(
    (product) => product.availability === "sold_out"
  ).length;

  const formatPrice = (price: number) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <section className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E53935]">
            <span>Store Management</span>
            <span className="text-neutral-300">/</span>
            <span>Inventory 01</span>
          </div>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#171717] sm:text-5xl">
            The Collection<span className="text-[#E53935]">.</span>
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-500">
            Every drop, in one place. Manage your sneakers, update availability
            and keep your collection moving.
          </p>
        </div>

        <Link
          href="/admin/dashboard/products/new"
          className="group inline-flex h-12 items-center justify-center gap-3 bg-[#E53935] px-6 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#171717] hover:shadow-lg active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2"
        >
          <span className="text-lg transition-transform duration-200 group-hover:rotate-90">
            +
          </span>
          Add New Sneaker
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </section>

      {/* INVENTORY OVERVIEW */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="bg-[#171717] p-5 text-white sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            Total Products
          </p>
          <p className="mt-5 text-4xl font-black tracking-[-0.07em]">
            {products.length.toString().padStart(2, "0")}
          </p>
          <p className="mt-2 text-xs text-white/40">In your collection</p>
        </div>

        <div className="border border-black/10 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            Available
          </p>
          <p className="mt-5 text-4xl font-black tracking-[-0.07em] text-emerald-700">
            {availableCount.toString().padStart(2, "0")}
          </p>
          <p className="mt-2 text-xs text-neutral-400">Ready for customers</p>
        </div>

        <div className="border border-black/10 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            Upcoming
          </p>
          <p className="mt-5 text-4xl font-black tracking-[-0.07em] text-amber-600">
            {upcomingCount.toString().padStart(2, "0")}
          </p>
          <p className="mt-2 text-xs text-neutral-400">Future releases</p>
        </div>

        <div className="border border-black/10 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            Sold Out
          </p>
          <p className="mt-5 text-4xl font-black tracking-[-0.07em] text-red-600">
            {soldOutCount.toString().padStart(2, "0")}
          </p>
          <p className="mt-2 text-xs text-neutral-400">
            Currently unavailable
          </p>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E53935]">
              Inventory / Overview
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#171717]">
              Your sneakers
            </h2>
          </div>

          <p className="text-xs text-neutral-500">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            in your collection
          </p>
        </div>

        {products.length === 0 ? (
          <div className="border border-black/10 bg-white px-6 py-20 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E53935]">
              Empty Collection
            </p>

            <h3 className="mt-4 text-2xl font-black text-[#171717]">
              Your next drop starts here.
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              Add your first sneaker to get started.
            </p>

            <Link
              href="/admin/dashboard/products/new"
              className="mt-7 inline-flex items-center gap-2 bg-[#171717] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#E53935]"
            >
              Add Product <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden border border-black/10 bg-white">
            {/* COLLECTION HEADER */}
            <div className="flex items-center justify-between border-b border-black/10 bg-[#FAF9F6] px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                  Active Inventory
                </span>
              </div>

              <span className="text-xs font-medium text-neutral-400">
                Latest additions first
              </span>
            </div>

            {/* PRODUCT ROWS */}
            <div className="divide-y divide-black/[0.07]">
              {products.map((product, index) => (
                <article
                  key={product.id}
                  className="group relative flex flex-col gap-5 p-5 transition-colors duration-200 hover:bg-[#FAF9F6] sm:p-6 lg:flex-row lg:items-center lg:gap-7 lg:px-7"
                >
                  {/* PRODUCT NUMBER */}
                  <div className="hidden w-6 shrink-0 text-xs font-semibold tabular-nums text-neutral-300 lg:block">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* IMAGE */}
                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    aria-label={`View ${product.name}`}
                    className="relative block h-28 w-full shrink-0 overflow-hidden bg-[#F2F0EB] sm:h-32 sm:w-36 lg:h-28 lg:w-32"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm text-black">
                        ↗
                      </span>
                    </span>
                  </Link>

                  {/* PRODUCT INFORMATION */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                        Sneaker / {String(index + 1).padStart(3, "0")}
                      </span>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="mt-2 inline-block text-lg font-bold tracking-tight text-[#171717] transition-colors hover:text-[#E53935]"
                    >
                      {product.name}
                    </Link>

                    <p className="mt-1 truncate text-xs text-neutral-400">
                      {product.slug}
                    </p>

                    <p className="mt-3 line-clamp-2 max-w-xl text-xs leading-5 text-neutral-500">
                      {product.description}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="shrink-0 border-t border-black/[0.06] pt-4 lg:w-32 lg:border-0 lg:pt-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                      Price
                    </p>

                    <p className="mt-2 text-xl font-black tracking-tight text-[#171717]">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  {/* AVAILABILITY */}
                  <div className="shrink-0 border-t border-black/[0.06] pt-4 lg:w-52 lg:border-0 lg:pt-0">
                    <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                      Availability
                    </p>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                        availabilityStyles[product.availability]
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {availabilityLabels[product.availability]}
                    </span>

                    <form
                      action={changeAvailability.bind(null, product.id)}
                      className="mt-3 flex items-center gap-2"
                    >
                      <div className="relative flex-1">
                        <select
                          name="availability"
                          defaultValue={product.availability}
                          aria-label={`Change availability for ${product.name}`}
                          className="h-10 w-full cursor-pointer appearance-none border border-black/10 bg-[#FAFAF9] px-3 pr-9 text-xs font-semibold text-[#171717] outline-none transition-all duration-200 hover:border-black/30 hover:bg-white focus:border-[#E53935] focus:bg-white focus:ring-2 focus:ring-[#E53935]/10"
                        >
                          <option value="available">Available</option>
                          <option value="sold_out">Sold Out</option>
                          <option value="upcoming">Upcoming</option>
                        </select>

                        <svg
                          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="m5 7.5 5 5 5-5" />
                        </svg>
                      </div>

                      <button
                        type="submit"
                        className="group/save inline-flex h-9 items-center gap-2 bg-[#171717] px-3 text-[9px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#E53935] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2"
                      >
                        Save
                        <span className="transition-transform group-hover/save:translate-x-1">
                          →
                        </span>
                      </button>
                    </form>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex shrink-0 items-center gap-2 border-t border-black/[0.06] pt-4 lg:w-36 lg:flex-col lg:items-stretch lg:border-0 lg:pt-0">
                    <Link
                      href={`/admin/dashboard/products/${product.id}/edit`}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 border border-black/10 bg-white px-4 text-xs font-semibold text-[#171717] transition-all hover:border-black hover:bg-[#171717] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] lg:flex-none"
                    >
                      Edit
                      <span>↗</span>
                    </Link>

                    <form
                      action={deleteProduct.bind(null, product.id)}
                      className="flex-1 lg:flex-none"
                    >
                      <button
                        type="submit"
                        className="inline-flex h-10 w-full items-center justify-center border border-red-100 bg-white px-4 text-xs font-semibold text-red-600 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>

            {/* COLLECTION FOOTER */}
            <div className="flex flex-col justify-between gap-2 border-t border-black/10 bg-[#FAF9F6] px-5 py-4 sm:flex-row sm:items-center sm:px-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                SneakerDrop / Inventory Management
              </p>

              <p className="text-xs text-neutral-400">
                {products.length} products displayed
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
