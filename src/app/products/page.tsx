
import Link from "next/link";
import { getProducts } from "@/lib/products/queries";

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
}

function getAvailabilityLabel(availability: string) {
    switch (availability) {
        case "available":
            return "Available";
        case "sold_out":
            return "Sold Out";
        case "upcoming":
            return "Coming Soon";
        default:
            return availability;
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen bg-[#F5F3EE] px-6 py-16 md:px-12 md:py-24">
            <div className="mx-auto max-w-[1440px]">


                <div className="mb-12">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E53935]">
                        The SneakerDrop Collection
                    </p>

                    <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] text-[#171717] sm:text-6xl md:text-7xl">
                        ALL DROPS<span className="text-[#E53935]">.</span>
                    </h1>

                    <p className="mt-5 max-w-lg text-sm leading-7 text-black/55">
                        Explore our curated selection of sneakers.
                        Discover your next favourite pair.
                    </p>
                </div>


                <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-black/60">
                        {products.length} {products.length === 1 ? "Product" : "Products"}
                    </p>

                    <Link
                        href="/"
                        className="text-xs font-semibold uppercase tracking-wider text-black/60 transition-colors hover:text-[#E53935]"
                    >
                        ← Back Home
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="flex min-h-[300px] flex-col items-center justify-center border border-dashed border-black/20 px-6 text-center">
                        <h2 className="text-2xl font-bold text-[#171717]">
                            No sneakers yet.
                        </h2>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-black/50">
                            Our collection is being prepared. Check back soon for the
                            latest drops.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group block"
                            >

                                <div className="relative aspect-[4/3] overflow-hidden bg-[#E9E6DF]">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />


                                    <span className="absolute left-4 top-4 bg-[#171717] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
                                        {getAvailabilityLabel(product.availability)}
                                    </span>
                                </div>

                                <div className="mt-5 flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-[#171717] transition-colors group-hover:text-[#E53935]">
                                            {product.name}
                                        </h2>

                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/50">
                                            {product.description}
                                        </p>
                                    </div>

                                    <p className="shrink-0 text-sm font-bold text-[#171717]">
                                        {formatPrice(Number(product.price))}
                                    </p>
                                </div>

                                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#E53935]">
                                    View Details ↗
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
