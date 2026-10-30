
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "../login/actions";

export default async function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/admin/login");
    }

    if (user.app_metadata?.role !== "admin") {
        redirect("/admin/login?error=unauthorized");
    }

    return (
        <div className="min-h-screen bg-[#F5F3EE]">
            <header className="flex items-center justify-between bg-[#171717] px-6 py-5 text-white sm:px-10">
                <a
                    href="/"
                    className="text-xl font-black tracking-[-0.08em]"
                >
                    SNEAKER<span className="text-[#E53935]">DROP.</span>
                </a>

                <div className="flex items-center gap-4">
                    <span className="hidden text-xs text-white/60 sm:block">
                        {user.email}
                    </span>

                    <form action={signOut}>
                        <button
                            type="submit"
                            className="border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-white hover:text-black"
                        >
                            Sign Out
                        </button>
                    </form>
                </div>
            </header>

            <nav className="border-b border-black/10 bg-white">
                <div className="mx-auto flex max-w-[1440px] gap-1 px-6 sm:px-10">
                    <a
                        href="/admin/dashboard"
                        className="border-b-2 border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-wider text-black/60 transition-colors hover:border-black hover:text-black"
                    >
                        Overview
                    </a>
                    <a
                        href="/admin/dashboard/products"
                        className="border-b-2 border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-wider text-black/60 transition-colors hover:border-black hover:text-black"
                    >
                        Products
                    </a>
                    <a
                        href="/admin/dashboard/waitlist"
                        className="border-b-2 border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-wider text-black/60 transition-colors hover:border-black hover:text-black"
                    >
                        Waitlist
                    </a>
                </div>
            </nav>

            <main className="mx-auto max-w-[1440px] px-6 py-10 sm:px-10">
                {children}
            </main>
        </div>
    );
}
