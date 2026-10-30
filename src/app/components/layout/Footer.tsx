import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#171717] px-6 py-12 text-white md:px-12">

            <div className="mx-auto max-w-[1440px]">

                <div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-12 md:flex-row">

                    <div>
                        <Link
                            href="/"
                            className="text-3xl font-black tracking-[-0.08em]"
                        >
                            SNEAKER<span className="text-[#E53935]">DROP.</span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
                            A curated world of sneakers.
                            Built for those who move differently.
                        </p>
                    </div>

                    <div>
                        <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/40">
                            Explore
                        </p>

                        <div className="flex flex-col gap-3 text-sm text-white/70">
                            <Link href="#collection" className="transition-colors hover:text-white">
                                Collection
                            </Link>

                            <Link href="#story" className="transition-colors hover:text-white">
                                Our Story
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col justify-between gap-3 pt-8 text-[11px] uppercase tracking-wider text-white/40 md:flex-row">
                    <p>© 2026 SneakerDrop. All rights reserved.</p>
                    <p>Curated. Limited. Different.</p>
                </div>

            </div>

        </footer>
    );
}
