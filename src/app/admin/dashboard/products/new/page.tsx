
import Link from "next/link";
import { createProduct } from "../actions";

export default function NewProductPage() {
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
                    Add New Product
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                    Add a new sneaker to your collection.
                </p>
            </div>

            <form
                action={createProduct}
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
                        placeholder="Nike Air Max Pulse"
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
                        placeholder="nike-air-max-pulse"
                        pattern="[a-z0-9]+(-[a-z0-9]+)*"
                        className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                    />
                    <p className="mt-2 text-xs text-neutral-500">
                        Use lowercase letters, numbers and hyphens only.
                    </p>
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
                        placeholder="Describe the sneaker..."
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
                        placeholder="12999"
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
                        placeholder="https://example.com/sneaker.jpg"
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
                        defaultValue="available"
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
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}
