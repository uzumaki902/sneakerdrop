
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface WaitlistPageProps {
    searchParams: Promise<{ q?: string }>;
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

const availabilityStyles: Record<string, string> = {
    available: "bg-emerald-500/10 text-emerald-700",
    sold_out: "bg-red-500/10 text-red-700",
    upcoming: "bg-amber-500/10 text-amber-700",
};

const availabilityLabels: Record<string, string> = {
    available: "Available",
    sold_out: "Sold Out",
    upcoming: "Upcoming",
};

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
        return (
            entry.email.toLowerCase().includes(search) ||
            (entry.products?.name.toLowerCase().includes(search) ?? false)
        );
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

            {/* PAGE HEADER */}
            <section className="flex flex-col justify-between gap-5 border-b border-black/10 pb-8 sm:flex-row sm:items-end">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E53935]">
                        <span>Store Management</span>
                        <span className="text-neutral-300">/</span>
                        <span>03</span>
                    </div>

                    <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#171717] sm:text-5xl">
                        The Waitlist<span className="text-[#E53935]">.</span>
                    </h1>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-500">
                        Keep track of customers waiting for their next favourite sneaker.
                    </p>
                </div>

                <div className="flex items-center gap-2 border border-black/10 bg-white px-4 py-3">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                        Live database records
                    </span>
                </div>
            </section>

            {/* STATISTICS */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <div className="group border border-black/10 bg-[#171717] p-6 text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                            Total Signups
                        </p>
                        <span className="text-xs text-white/40">01</span>
                    </div>

                    <p className="mt-7 text-5xl font-black tracking-[-0.07em]">
                        {entries.length.toString().padStart(2, "0")}
                    </p>

                    <p className="mt-3 text-xs text-white/50">
                        All customer registrations
                    </p>
                </div>

                <div className="border border-black/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Matching Results
                        </p>
                        <span className="text-xs text-neutral-300">02</span>
                    </div>

                    <p className="mt-7 text-5xl font-black tracking-[-0.07em] text-[#171717]">
                        {filteredEntries.length.toString().padStart(2, "0")}
                    </p>

                    <p className="mt-3 text-xs text-neutral-400">
                        {search ? "Results for your search" : "Currently displayed"}
                    </p>
                </div>

                <div className="border border-black/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Products With Interest
                        </p>
                        <span className="text-xs text-neutral-300">03</span>
                    </div>

                    <p className="mt-7 text-5xl font-black tracking-[-0.07em] text-[#E53935]">
                        {new Set(entries.map((entry) => entry.product_id)).size
                            .toString()
                            .padStart(2, "0")}
                    </p>

                    <p className="mt-3 text-xs text-neutral-400">
                        Unique sneakers attracting customers
                    </p>
                </div>
            </section>

            {/* SUBMISSIONS */}
            <section className="overflow-hidden border border-black/10 bg-white">

                {/* TABLE HEADER */}
                <div className="flex flex-col justify-between gap-5 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:px-7 sm:py-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E53935]">
                            Customer Activity
                        </p>

                        <h2 className="mt-2 text-xl font-black tracking-tight text-[#171717]">
                            All Submissions
                        </h2>

                        <p className="mt-1 text-xs text-neutral-500">
                            Customer interest across your sneaker collection.
                        </p>
                    </div>

                    <form
                        method="GET"
                        action="/admin/dashboard/waitlist"
                        className="flex w-full gap-2 sm:w-auto"
                    >
                        <div className="relative min-w-0 flex-1 sm:w-72">
                            <input
                                type="search"
                                name="q"
                                defaultValue={q}
                                placeholder="Search email or sneaker..."
                                aria-label="Search waitlist submissions"
                                className="h-11 w-full border border-black/10 bg-[#FAFAF9] px-4 pr-9 text-xs text-[#171717] outline-none transition-all placeholder:text-neutral-400 hover:border-black/30 focus:border-[#E53935] focus:bg-white focus:ring-2 focus:ring-[#E53935]/10"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                ⌕
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="group inline-flex h-11 items-center gap-2 bg-[#171717] px-5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#E53935] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2"
                        >
                            Search
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>

                        {q && (
                            <Link
                                href="/admin/dashboard/waitlist"
                                className="inline-flex h-11 items-center border border-black/10 px-3 text-xs font-semibold text-neutral-600 transition hover:border-black hover:text-black"
                            >
                                Clear
                            </Link>
                        )}
                    </form>
                </div>

                {/* RESULTS COUNT */}
                <div className="flex items-center justify-between border-b border-black/[0.06] bg-[#FAF9F6] px-5 py-3 sm:px-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                        Submissions
                    </p>

                    <p className="text-xs text-neutral-500">
                        <span className="font-bold text-[#171717]">
                            {filteredEntries.length}
                        </span>{" "}
                        of {entries.length} records
                    </p>
                </div>

                {/* EMPTY STATE */}
                {filteredEntries.length === 0 ? (
                    <div className="flex flex-col items-center px-6 py-20 text-center">
                        <div className="flex h-14 w-14 items-center justify-center border border-black/10 bg-[#F4F2ED] text-2xl text-neutral-500">
                            {entries.length === 0 ? "↗" : "⌕"}
                        </div>

                        <h3 className="mt-5 text-xl font-black text-[#171717]">
                            {entries.length === 0
                                ? "No signups yet."
                                : "No matching submissions."}
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                            {entries.length === 0
                                ? "Customer registrations will appear here as soon as someone joins a sneaker waitlist."
                                : "We couldn't find any customers or sneakers matching your search. Try a different keyword."}
                        </p>

                        {q && (
                            <Link
                                href="/admin/dashboard/waitlist"
                                className="mt-6 bg-[#171717] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#E53935]"
                            >
                                Clear Search
                            </Link>
                        )}
                    </div>
                ) : (

                    /* DATA TABLE */
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left">
                            <thead className="bg-[#F4F2ED]">
                                <tr className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500">
                                    <th className="px-5 py-4 sm:px-7">Customer</th>
                                    <th className="px-5 py-4">Sneaker</th>
                                    <th className="px-5 py-4">Availability</th>
                                    <th className="px-5 py-4">Date Registered</th>
                                    <th className="px-5 py-4">Details</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-black/[0.06]">
                                {filteredEntries.map((entry, index) => (
                                    <tr
                                        key={entry.id}
                                        className="group transition-colors duration-200 hover:bg-[#FAF9F6]"
                                    >
                                        <td className="px-5 py-5 sm:px-7">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#171717] text-xs font-bold uppercase text-white">
                                                    {entry.email.charAt(0)}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="max-w-[230px] truncate text-sm font-semibold text-[#171717]">
                                                        {entry.email}
                                                    </p>
                                                    <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-400">
                                                        Customer #{String(index + 1).padStart(3, "0")}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-5">
                                            {entry.products ? (
                                                <Link
                                                    href={`/products/${entry.products.slug}`}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#171717] transition-colors hover:text-[#E53935]"
                                                >
                                                    {entry.products.name}
                                                    <span className="text-xs text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100">
                                                        ↗
                                                    </span>
                                                </Link>
                                            ) : (
                                                <span className="text-xs text-neutral-400">
                                                    Product unavailable
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-5">
                                            {entry.products?.availability ? (
                                                <span
                                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-wide ${
                                                        availabilityStyles[entry.products.availability] ??
                                                        "bg-neutral-100 text-neutral-600"
                                                        }`}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {availabilityLabels[entry.products.availability] ??
                                                        entry.products.availability}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-neutral-400">—</span>
                                            )}
                                        </td>

                                        <td className="px-5 py-5">
                                            <p className="text-xs font-medium text-[#171717]">
                                                {formatDate(entry.created_at)}
                                            </p>
                                        </td>

                                        <td className="px-5 py-5">
                                            {entry.products && (
                                                <Link
                                                    href={`/products/${entry.products.slug}`}
                                                    target="_blank"
                                                    aria-label={`View ${entry.products.name}`}
                                                    className="inline-flex h-9 w-9 items-center justify-center border border-black/10 text-neutral-500 transition-all hover:border-[#E53935] hover:bg-[#E53935] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935]"
                                                >
                                                    ↗
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* FOOTER */}
                <div className="flex flex-col justify-between gap-2 border-t border-black/10 bg-[#FAF9F6] px-5 py-4 sm:flex-row sm:items-center sm:px-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                        SneakerDrop / Customer Intelligence
                    </p>

                    <p className="text-[10px] text-neutral-400">
                        Data sourced from Supabase
                    </p>
                </div>
            </section>
        </div>
    );
}
