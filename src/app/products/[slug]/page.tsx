import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products/queries";
import WaitlistForm from "../WaitlistForm";

type ProductPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
}

function getAvailabilityDetails(availability: string) {
    switch (availability) {
        case "available":
            return {
                label: "Available",
                description: "This sneaker is currently available.",
                className: "bg-green-100 text-green-800",
            };

        case "sold_out":
            return {
                label: "Sold Out",
                description: "This sneaker is currently sold out.",
                className: "bg-red-100 text-red-800",
            };

        case "upcoming":
            return {
                label: "Coming Soon",
                description: "This sneaker will be available soon.",
                className: "bg-yellow-100 text-yellow-800",
            };

        default:
            return {
                label: "Unknown",
                description: "Availability information is unavailable.",
                className: "bg-gray-100 text-gray-800",
            };
    }
}

export async function generateMetadata({
    params,
}: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: "Product Not Found | SneakerDrop",
        };
    }

    return {
        title: `${product.name} | SneakerDrop`,
        description: product.description,
    };
}

export default async function ProductDetailsPage({
    params,
}: ProductPageProps) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const availability = getAvailabilityDetails(product.availability);

    return (
        <main className="min-h-screen bg-[#F5F3EE] px-6 py-12 md:px-12 md:py-20">
            <div className="mx-auto max-w-[1200px]">


                <Link
                    href="/products"
                    className="text-xs font-semibold uppercase tracking-wider text-black/50 transition-colors hover:text-[#E53935]"
                >
                    ← Back to Collection
                </Link>


                <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">


                    <div className="relative aspect-square overflow-hidden bg-[#E9E6DF]">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />

                        <span
                            className={`absolute left-5 top-5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${availability.className}`}
                        >
                            {availability.label}
                        </span>
                    </div>


                    <div className="flex flex-col justify-center">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E53935]">
                            SneakerDrop Collection
                        </p>

                        <h1 className="mt-5 text-4xl font-black leading-tight tracking-[-0.06em] text-[#171717] sm:text-5xl md:text-6xl">
                            {product.name}
                        </h1>

                        <p className="mt-6 text-2xl font-bold text-[#171717]">
                            {formatPrice(Number(product.price))}
                        </p>

                        <div className="my-8 border-y border-black/10 py-6">
                            <p className="text-xs font-bold uppercase tracking-wider text-black/50">
                                Product Description
                            </p>

                            <p className="mt-4 text-sm leading-8 text-black/65">
                                {product.description}
                            </p>
                        </div>


                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-black/50">
                                Availability
                            </p>

                            <p className="mt-3 text-sm font-semibold text-[#171717]">
                                {availability.description}
                            </p>
                        </div>

                        {["upcoming", "sold_out"].includes(product.availability) && (
                            <WaitlistForm productId={product.id} />
                        )}

                        <div className="mt-10">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-3 bg-[#171717] px-8 py-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#E53935]"
                            >
                                Explore More Sneakers
                                <span aria-hidden="true">↗</span>
                            </Link>
                        </div>

                        <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-black/35">
                            Curated. Limited. Different.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
