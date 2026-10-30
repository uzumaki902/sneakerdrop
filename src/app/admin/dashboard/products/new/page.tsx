
import Link from "next/link";
import { createProduct } from "../actions";

const inputStyles =
  "mt-2 w-full border border-black/10 bg-[#FAFAF9] px-4 py-3.5 text-sm text-[#171717] outline-none transition-all duration-200 placeholder:text-neutral-400 hover:border-black/30 focus:border-[#E53935] focus:bg-white focus:ring-2 focus:ring-[#E53935]/10";

const labelStyles =
  "text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-600";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-[1100px] space-y-8">

      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <Link
          href="/admin/dashboard/products"
          className="transition-colors hover:text-[#E53935]"
        >
          Products
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#171717]">New Product</span>
      </div>

      {/* PAGE HEADER */}
      <section className="border-b border-black/10 pb-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E53935]">
          Inventory Management / 02
        </p>

        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.06em] text-[#171717] sm:text-5xl">
              Create a Drop<span className="text-[#E53935]">.</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-500">
              Add a new sneaker to your collection. Give your next release
              its place in the spotlight.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 border border-black/10 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            New product
          </span>
        </div>
      </section>

      {/* FORM WORKSPACE */}
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.5fr]">

        {/* LEFT EDITORIAL PANEL */}
        <aside className="flex flex-col justify-between bg-[#171717] p-7 text-white sm:p-9">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E53935]">
              SneakerDrop Studio
            </p>

            <h2 className="mt-8 text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl">
              EVERY
              <br />
              DROP HAS
              <br />
              A STORY<span className="text-[#E53935]">.</span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-white/50">
              The details matter. Add accurate product information,
              compelling descriptions and high-quality imagery to
              make every sneaker stand out.
            </p>
          </div>

          <div className="mt-16 border-t border-white/15 pt-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
              Publishing checklist
            </p>

            <div className="mt-5 space-y-4">
              {[
                "Product identity",
                "Description and pricing",
                "Product imagery",
                "Availability status",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center border border-white/20 text-[10px] text-white/60">
                    0{index + 1}
                  </span>
                  <span className="text-xs text-white/65">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
            SneakerDrop / Make your mark
          </p>
        </aside>

        {/* PRODUCT FORM */}
        <form
          action={createProduct}
          className="border border-black/10 bg-white p-6 sm:p-9"
        >
          {/* IDENTITY */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-[#E53935]">01</span>
              <h2 className="text-sm font-black uppercase tracking-wider text-[#171717]">
                Product Identity
              </h2>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="name" className={labelStyles}>
                  Product Name <span className="text-[#E53935]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="e.g. Nike Air Max Pulse"
                  className={inputStyles}
                />
              </div>

              <div>
                <label htmlFor="slug" className={labelStyles}>
                  Product Slug <span className="text-[#E53935]">*</span>
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  required
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  placeholder="nike-air-max-pulse"
                  className={inputStyles}
                />
                <p className="mt-2 text-[10px] text-neutral-400">
                  Use lowercase letters, numbers and hyphens only.
                </p>
              </div>
            </div>
          </div>

          <div className="my-8 border-t border-black/[0.07]" />

          {/* DESCRIPTION */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-[#E53935]">02</span>
              <h2 className="text-sm font-black uppercase tracking-wider text-[#171717]">
                Product Story
              </h2>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className={labelStyles}>
                Description <span className="text-[#E53935]">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                maxLength={2000}
                placeholder="Describe the sneaker, its design, materials and what makes it special..."
                className={`${inputStyles} resize-y leading-6`}
              />
              <p className="mt-2 text-[10px] text-neutral-400">
                Write a clear description that helps customers understand
                the product.
              </p>
            </div>
          </div>

          <div className="my-8 border-t border-black/[0.07]" />

          {/* PRICING */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-[#E53935]">03</span>
              <h2 className="text-sm font-black uppercase tracking-wider text-[#171717]">
                Pricing
              </h2>
            </div>

            <div className="mt-6">
              <label htmlFor="price" className={labelStyles}>
                Price (INR) <span className="text-[#E53935]">*</span>
              </label>

              <div className="mt-2 flex items-center border border-black/10 bg-[#FAFAF9] transition-all focus-within:border-[#E53935] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#E53935]/10 hover:border-black/30">
                <span className="border-r border-black/10 px-4 py-3.5 text-sm font-semibold text-neutral-500">
                  ₹
                </span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  placeholder="12999"
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-[#171717] outline-none placeholder:text-neutral-400"
                />
              </div>
            </div>
          </div>

          <div className="my-8 border-t border-black/[0.07]" />

          {/* IMAGE */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-[#E53935]">04</span>
              <h2 className="text-sm font-black uppercase tracking-wider text-[#171717]">
                Product Imagery
              </h2>
            </div>

            <div className="mt-6">
              <label htmlFor="image_url" className={labelStyles}>
                Product Image URL <span className="text-[#E53935]">*</span>
              </label>

              <input
                id="image_url"
                name="image_url"
                type="url"
                required
                placeholder="https://example.com/sneaker.jpg"
                className={inputStyles}
              />

              <p className="mt-2 text-[10px] text-neutral-400">
                Provide a publicly accessible HTTPS image URL.
              </p>
            </div>
          </div>

          <div className="my-8 border-t border-black/[0.07]" />

          {/* AVAILABILITY */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-[#E53935]">05</span>
              <h2 className="text-sm font-black uppercase tracking-wider text-[#171717]">
                Release Status
              </h2>
            </div>

            <div className="mt-6">
              <label htmlFor="availability" className={labelStyles}>
                Availability
              </label>

              <select
                id="availability"
                name="availability"
                defaultValue="available"
                className={`${inputStyles} cursor-pointer`}
              >
                <option value="available">Available</option>
                <option value="upcoming">Upcoming</option>
                <option value="sold_out">Sold Out</option>
              </select>
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div className="mt-10 flex flex-col-reverse justify-between gap-3 border-t border-black/10 pt-7 sm:flex-row sm:items-center">
            <Link
              href="/admin/dashboard/products"
              className="inline-flex h-12 items-center justify-center border border-black/10 px-6 text-xs font-semibold text-neutral-600 transition-all hover:border-black hover:bg-neutral-50 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="group inline-flex h-12 items-center justify-center gap-3 bg-[#171717] px-7 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E53935] hover:shadow-lg active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2"
            >
              Create Product
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <p className="mt-5 text-center text-[10px] text-neutral-400">
            Your product will be saved to the SneakerDrop database.
          </p>
        </form>
      </div>
    </div>
  );
}
