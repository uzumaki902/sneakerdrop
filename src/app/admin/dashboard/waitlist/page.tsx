
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface WaitlistPageProps {
    searchParams: Promise<{
        q?: string;
    }>;
}

interface WaitlistEntry {
    id: string;
    email: string;
    created_at: string;
    product_id: string;
    products: {
        name: string;
        slug: string;
        availability: string;
    } | null;
}

export default async function AdminWaitlistPage({
    searchParams,
}: WaitlistPageProps) {
    const { q = "" } = await searchParams;
    const search = q.trim().toLowerCase();

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("waitlist")
        .select(`
      id,
      email,
      created_at,
      product_id,
      products (
        name,
        slug,
        availability
      )
    `)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error("Failed to load waitlist submissions.");
    }

    const entries = (data ?? []) as unknown as WaitlistEntry[];

    const filteredEntries = entries.filter((entry) => {
        const emailMatches = entry.email.toLowerCase().includes(search);
        const productMatches =
            entry.products?.name.toLowerCase().includes(search) ?? false;

        return emailMatches || productMatches;
    });

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                    Store management
                </p>

                <h1 className="mt-2 text-3xl font-semibold">
                    Waitlist Submissions
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                    View customers interested in your sneakers.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-neutral-200 bg-white p-5">
                    <p className="text-sm text-neutral-500">
                        Total submissions
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                        {entries.length}
                    </p>
                </div>

                <div className="border border-neutral-200 bg-white p-5">
                    <p className="text-sm text-neutral-500">
                        Matching submissions
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                        {filteredEntries.length}
                    </p>
                </div>
            </div>

            <div className="border border-neutral-200 bg-white">
                <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 p-5 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-medium">
                            Customer Submissions
                        </h2>
                        <p className="mt-1 text-xs text-neutral-500">
                            Search by customer email or sneaker name.
                        </p>
                    </div>

                    <form
                        method="GET"
                        action="/admin/dashboard/waitlist"
                        className="flex gap-2"
                    >
                        <input
                            type="search"
                            name="q"
                            defaultValue={q}
                            placeholder="Search submissions..."
                            className="min-w-0 border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
                        />

                        <button
                            type="submit"
                            className="bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800"
                        >
                            Search
                        </button>

                        {q && (
                            <Link
                                href="/admin/dashboard/waitlist"
                                className="border border-neutral-300 px-3 py-2 text-sm"
                            >
                                Clear
                            </Link>
                        )}
                    </form>
                </div>

                {filteredEntries.length === 0 ? (
                    <div className="px-5 py-16 text-center">
                        <h3 className="text-lg font-medium">
                            {entries.length === 0
                                ? "No submissions yet"
                                : "No matching submissions"}
                        </h3>

                        <p className="mt-2 text-sm text-neutral-500">
                            {entries.length === 0
                                ? "Customer waitlist registrations will appear here."
                                : "Try searching with a different email or product name."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[750px] text-left text-sm">
                            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4">Customer Email</th>
                                    <th className="px-5 py-4">Sneaker</th>
                                    <th className="px-5 py-4">Availability</th>
                                    <th className="px-5 py-4">Submitted On</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-200">
                                {filteredEntries.map((entry) => (
                                    <tr key={entry.id}>
                                        <td className="px-5 py-4 font-medium">
                                            {entry.email}
                                        </td>

                                        <td className="px-5 py-4">
                                            {entry.products ? (
                                                <Link
                                                    href={`/products/${entry.products.slug}`}
                                                    target="_blank"
                                                    className="underline underline-offset-4"
                                                >
                                                    {entry.products.name}
                                                </Link>
                                            ) : (
                                                <span className="text-neutral-400">
                                                    Product unavailable
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            {entry.products?.availability
                                                ? entry.products.availability.replace("_", " ")
                                                : "—"}
                                        </td>

                                        <td className="px-5 py-4 text-neutral-500">
                                            {formatDate(entry.created_at)}
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
