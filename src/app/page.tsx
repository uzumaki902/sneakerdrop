
import Link from "next/link";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Footer from "./components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  availability: "available" | "sold_out" | "upcoming";
}

const availabilityStyles = {
  available: "bg-emerald-500/10 text-emerald-700",
  sold_out: "bg-red-500/10 text-red-700",
  upcoming: "bg-amber-500/10 text-amber-700",
};

const availabilityLabels = {
  available: "Available",
  sold_out: "Sold Out",
  upcoming: "Upcoming",
};

export default async function Home() {
  const supabase = await createClient();

  const { data: productsData, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, price, image_url, availability"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Homepage product query failed:", error.message);
  }

  const products: Product[] = (productsData ?? []) as Product[];

  return (
    <main className="min-h-screen bg-[#F5F3EE]">

      <Navbar />

      <Hero />

 
      <section
        id="story"
        className="bg-[#171717] px-6 py-28 text-white md:px-12 md:py-36"
      >
        <div className="mx-auto max-w-[1440px]">

          <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-[#E53935]">
            More than footwear
          </p>

          <h2 className="max-w-5xl text-4xl font-black leading-tight tracking-[-0.06em] sm:text-5xl md:text-7xl">
            NOT JUST SNEAKERS.
            <br />
            <span className="text-white/35">
              A STATEMENT.
            </span>
          </h2>

          <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/15 pt-8 md:flex-row">

            <p className="max-w-lg text-sm leading-7 text-white/55">
              SneakerDrop is built around the culture, creativity
              and individuality behind every pair. Discover
              sneakers that represent more than just a style.
            </p>

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Move differently. / 001
            </p>

          </div>
        </div>
      </section>

      
      <section
        id="collection"
        className="px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto max-w-[1440px]">

          {/* COLLECTION HEADING */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#E53935]">
                The collection / {String(products.length).padStart(2, "0")} pieces
              </p>

              <h2 className="text-5xl font-black tracking-[-0.07em] text-[#171717] md:text-7xl">
                THE LATEST
                <br />
                DROPS.
              </h2>
            </div>

            <div className="max-w-sm">
              <p className="text-sm leading-7 text-black/55">
                Every drop has a story. Discover our curated
                collection of sneakers, updated as new pairs
                enter the collection.
              </p>

              <Link
                href="/products"
                className="group mt-5 inline-flex items-center gap-3 border-b border-[#171717] pb-2 text-xs font-bold uppercase tracking-wider text-[#171717] transition-colors hover:border-[#E53935] hover:text-[#E53935]"
              >
                Explore All Sneakers
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

          </div>

          {products.length === 0 ? (
            <div className="mt-14 border border-black/10 bg-white px-6 py-20 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E53935]">
                Collection Update
              </p>

              <h3 className="mt-4 text-2xl font-black text-[#171717]">
                New drops are on the way.
              </h3>

              <p className="mt-3 text-sm text-neutral-500">
                Check back soon for the latest sneakers.
              </p>
            </div>
          ) : (
            <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

              {products.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block"
                >

                  {/* PRODUCT IMAGE */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#E9E6DF]">

                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${
                          availabilityStyles[product.availability]
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {availabilityLabels[product.availability]}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-lg text-[#171717] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      ↗
                    </div>

                  </div>

                  <div className="flex items-start justify-between gap-4 pt-5">

                    <div className="min-w-0 flex-1">

                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E53935]">
                        SneakerDrop / {String(index + 1).padStart(3, "0")}
                      </p>

                      <h3 className="text-lg font-black tracking-tight text-[#171717] transition-colors group-hover:text-[#E53935]">
                        {product.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-black/50">
                        {product.description}
                      </p>

                    </div>

                    <p className="shrink-0 pt-5 text-sm font-bold text-[#171717]">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>

                  </div>

                </Link>
              ))}

            </div>
          )}

      
          <div className="mt-16 flex justify-center border-t border-black/10 pt-10">
            <Link
              href="/products"
              className="group inline-flex items-center gap-4 bg-[#171717] px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#E53935] hover:shadow-lg"
            >
              Discover The Full Collection
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

        </div>
      </section>

   
      <section className="bg-[#E53935] px-6 py-24 text-white md:px-12 md:py-32">

        <div className="mx-auto max-w-[1440px]">

          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
            Stay ahead of the drop
          </p>

          <h2 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-8xl">
            DON'T MISS
            <br />
            WHAT'S NEXT.
          </h2>

          <p className="mt-8 max-w-md text-sm leading-7 text-white/75">
            The next drop could be the one.
            Stay connected with SneakerDrop.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-4 border border-white/50 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[#E53935]"
          >
            Explore Sneakers <span>→</span>
          </Link>

        </div>

      </section>

      <Footer />

    </main>
  );
}
