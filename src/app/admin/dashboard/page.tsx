
export default function AdminDashboardPage() {
    return (
        <section>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E53935]">
                SneakerDrop Administration
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-[#171717]">
                Dashboard
            </h1>

            <p className="mt-3 text-sm text-black/50">
                Welcome to your SneakerDrop administration panel.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border border-black/10 bg-white p-6">
                    <p className="text-xs uppercase tracking-wider text-black/50">
                        Product Management
                    </p>
                    <p className="mt-3 text-xl font-bold text-[#171717]">
                        Coming next
                    </p>
                </div>

                <div className="border border-black/10 bg-white p-6">
                    <p className="text-xs uppercase tracking-wider text-black/50">
                        Waitlist Submissions
                    </p>
                    <p className="mt-3 text-xl font-bold text-[#171717]">
                        Coming next
                    </p>
                </div>
            </div>
        </section>
    );
}
