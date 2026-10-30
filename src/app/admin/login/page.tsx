
import { signIn } from "./actions";

type LoginPageProps = {
    searchParams: Promise<{
        error?: string;
    }>;
};

export default async function AdminLoginPage({
    searchParams,
}: LoginPageProps) {
    const { error } = await searchParams;

    const errorMessages: Record<string, string> = {
        "missing-fields": "Please enter your email and password.",
        "invalid-credentials": "Invalid email or password.",
        unauthorized: "You are not authorized to access the admin dashboard.",
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#171717] px-6 py-12">
            <div className="w-full max-w-md">
                <div className="mb-10 text-center">
                    <a
                        href="/"
                        className="text-3xl font-black tracking-[-0.08em] text-white"
                    >
                        SNEAKER<span className="text-[#E53935]">DROP.</span>
                    </a>

                    <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/40">
                        Administration Portal
                    </p>
                </div>

                <div className="border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                    <h1 className="text-2xl font-bold text-white">
                        Admin Sign In
                    </h1>

                    <p className="mt-2 text-sm text-white/50">
                        Sign in to manage your sneaker collection.
                    </p>

                    {error && (
                        <p
                            role="alert"
                            className="mt-6 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
                        >
                            {errorMessages[error] ?? "Something went wrong. Please try again."}
                        </p>
                    )}

                    <form action={signIn} className="mt-8 space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="username"
                                required
                                className="w-full border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#E53935]"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#E53935]"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#E53935] px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
                        >
                            Sign In <span aria-hidden="true">↗</span>
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-white/35">
                        Authorized administrators only.
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-white/30">
                    <a href="/" className="transition-colors hover:text-white">
                        ← Return to SneakerDrop
                    </a>
                </p>
            </div>
        </main>
    );
}
