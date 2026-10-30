
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
    changeAvailability,
    deleteProduct,
} from "./actions";

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

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                        Store management
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold">
                        Products
                    </h1>

                    <p className="mt-2 text-sm text-neutral-500">
                        Manage your sneaker collection.
                    </p>
                </div>

                <Link
                    href="/admin/dashboard/products/new"
                    className="inline-flex items-center justify-center bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                >
                    + Add Product
                </Link>
            </div>

            <div className="border border-neutral-200 bg-white">
                <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
                    <h2 className="font-medium">All Products</h2>

                    <span className="text-sm text-neutral-500">
                        {products.length} products
                    </span>
                </div>

                {products.length === 0 ? (
                    <div className="px-5 py-16 text-center">
                        <h3 className="text-lg font-medium">
                            No products yet
                        </h3>

                        <p className="mt-2 text-sm text-neutral-500">
                            Add your first sneaker to get started.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4">Product</th>
                                    <th className="px-5 py-4">Price</th>
                                    <th className="px-5 py-4">Availability</th>
                                    <th className="px-5 py-4">Slug</th>
                                    <th className="px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-200">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="h-14 w-14 object-cover"
                                                />

                                                <span className="font-medium">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </td>

                                        <td className="px-5 py-4">
                                            <form
                                                action={changeAvailability.bind(
                                                    null,
                                                    product.id
                                                )}
                                                className="flex items-center gap-2"
                                            >
                                                <select
                                                    name="availability"
                                                    defaultValue={product.availability}
                                                    className="border border-neutral-300 bg-white px-2 py-2 text-xs"
                                                >
                                                    <option value="available">Available</option>
                                                    <option value="sold_out">Sold Out</option>
                                                    <option value="upcoming">Upcoming</option>
                                                </select>

                                                <button
                                                    type="submit"
                                                    className="border border-neutral-300 px-3 py-2 text-xs hover:bg-neutral-100"
                                                >
                                                    Update
                                                </button>
                                            </form>
                                        </td>

                                        <td className="px-5 py-4 text-neutral-500">
                                            {product.slug}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/admin/dashboard/products/${product.id}/edit`}
                                                    className="font-medium underline underline-offset-4"
                                                >
                                                    Edit
                                                </Link>

                                                <form
                                                    action={deleteProduct.bind(
                                                        null,
                                                        product.id
                                                    )}
                                                >
                                                    <button
                                                        type="submit"
                                                        className="text-red-600 underline underline-offset-4"
                                                    >
                                                        Delete
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
