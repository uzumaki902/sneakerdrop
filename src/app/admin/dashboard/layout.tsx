
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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

    if (error || !user) redirect("/admin/login");

    if (user.app_metadata?.role !== "admin") {
        redirect("/admin/login?error=unauthorized");
    }

    const navigation = [
        { label: "Overview", href: "/admin/dashboard", number: "01" },
        { label: "Products", href: "/admin/dashboard/products", number: "02" },
        { label: "Waitlist", href: "/admin/dashboard/waitlist", number: "03" },
    ];

    return (
        <div className="min-h-screen bg-[#F4F2ED] text-[#171717]">
            <header className="border-b border-white/10 bg-[#171717] text-white">
                <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
                    <Link href="/" className="text-xl font-black tracking-[-0.08em] sm:text-2xl">
                        SNEAKER<span className="text-[#E53935]">DROP.</span>
                    </Link>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <span className="hidden text-sm text-white/60 md:block">
                            {user.email}
                        </span>

                        <form action={signOut}>
                            <button
                                type="submit"
                                className="border border-white/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition hover:border-white hover:bg-white hover:text-black"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <nav className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-[1600px] items-center gap-1 overflow-x-auto px-5 sm:px-8 lg:px-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 py-4 text-xs font-bold uppercase tracking-[0.12em] text-neutral-500 transition hover:border-[#E53935] hover:text-black sm:px-6"
                        >
                            <span className="text-[10px] text-neutral-400">
                                {item.number}
                            </span>
                            {item.label}
                            <span className="h-1 w-1 rounded-full bg-[#E53935] opacity-0 transition group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>
            </nav>

            <main className="mx-auto min-h-[calc(100vh-130px)] max-w-[1600px] px-5 py-9 sm:px-8 sm:py-12 lg:px-12">
                {children}
            </main>

            <footer className="border-t border-black/10 px-5 py-5 sm:px-8 lg:px-12">
                <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400 sm:flex-row">
                    <span>SneakerDrop Administration</span>
                    <span>Manage your collection. Own your drops.</span>
                </div>
            </footer>
        </div>
    );
}
