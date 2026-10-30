
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "../../actions";

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({
    params,
}: EditProductPageProps) {
    const { id } = await params;

    const supabase = await createClient();

    const { data: product, error } = await supabase
        .from("products")
        .select(
            "id, name, slug, description, price, image_url, availability"
        )
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error("Failed to load product.");
    }

    if (!product) {
        notFound();
    }

    const updateProductWithId = updateProduct.bind(null, product.id);

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div>
                <Link
                    href="/admin/dashboard/products"
                    className="text-sm text-neutral-500 hover:text-black"
                >
                    ← Back to Products
                </Link>

                <h1 className="mt-5 text-3xl font-semibold">
                    Edit Product
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                    Update the details for {product.name}.
                </p>
            </div>

            <form
                action={updateProductWithId}
                className="space-y-6 border border-neutral-200 bg-white p-6 sm:p-8"
            >
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Product Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        defaultValue={product.name}
                        className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div>
                    <label htmlFor="slug" className="mb-2 block text-sm font-medium">
                        Product Slug
                    </label>
                    <input
                        id="slug"
                        name="slug"
                        type="text"
                        required
                        pattern="[a-z0-9]+(-[a-z0-9]+)*"
                        defaultValue={product.slug}
                        className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        rows={5}
                        defaultValue={product.description}
                        className="w-full resize-y border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="mb-2 block text-sm font-medium">
                        Price (INR)
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        required
                        defaultValue={product.price}
                        className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div>
                    <label
                        htmlFor="image_url"
                        className="mb-2 block text-sm font-medium"
                    >
                        Product Image URL
                    </label>
                    <input
                        id="image_url"
                        name="image_url"
                        type="url"
                        required
                        defaultValue={product.image_url}
                        className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div>
                    <label
                        htmlFor="availability"
                        className="mb-2 block text-sm font-medium"
                    >
                        Availability
                    </label>
                    <select
                        id="availability"
                        name="availability"
                        defaultValue={product.availability}
                        required
                        className="w-full border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-black"
                    >
                        <option value="available">Available</option>
                        <option value="sold_out">Sold Out</option>
                        <option value="upcoming">Upcoming</option>
                    </select>
                </div>

                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                    <Link
                        href="/admin/dashboard/products"
                        className="border border-neutral-300 px-5 py-3 text-center text-sm font-medium hover:bg-neutral-50"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
