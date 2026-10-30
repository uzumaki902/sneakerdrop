
"use client";

import { useState, type FormEvent } from "react";

type WaitlistFormProps = {
    productId: string;
};

export default function WaitlistForm({
    productId,
}: WaitlistFormProps) {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId,
                    email,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setStatus("error");
                setMessage(result.error || "Something went wrong.");
                return;
            }

            setStatus("success");
            setMessage(result.message);
            setEmail("");
        } catch {
            setStatus("error");
            setMessage("Unable to connect. Please try again.");
        }
    }

    return (
        <div className="mt-10 border border-black/10 bg-white/60 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E53935]">
                Get notified
            </p>

            <h2 className="mt-3 text-xl font-bold text-[#171717]">
                Join the Waitlist
            </h2>

            <p className="mt-2 text-sm leading-6 text-black/50">
                Enter your email and we'll keep you updated about this sneaker.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label htmlFor="waitlist-email" className="sr-only">
                    Email address
                </label>

                <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        if (status !== "loading") {
                            setStatus("idle");
                            setMessage("");
                        }
                    }}
                    placeholder="Enter your email address"
                    required
                    maxLength={254}
                    autoComplete="email"
                    disabled={status === "loading" || status === "success"}
                    className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm text-[#171717] outline-none transition-colors placeholder:text-black/35 focus:border-[#E53935] disabled:opacity-50"
                />

                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="w-full bg-[#171717] px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#E53935] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {status === "loading"
                        ? "Submitting..."
                        : status === "success"
                            ? "Successfully Registered"
                            : "Join Waitlist"}
                </button>
            </form>

            {message && (
                <p
                    role="status"
                    aria-live="polite"
                    className={`mt-4 text-sm ${status === "success" ? "text-green-700" : "text-red-600"
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}
