
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

            <main className="mx-auto max-w-[1440px] px-6 py-10 sm:px-10">
                {children}
            </main>
        </div>
    );
}
