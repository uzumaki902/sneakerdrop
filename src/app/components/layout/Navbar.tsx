import Link from "next/link";

const navigation = [
    { label: "Collection", href: "#collection" },
    { label: "Our Story", href: "#story" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171717] text-white">
            <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12">

                {/* Brand */}
                <Link href="/" className="text-2xl font-black tracking-[-0.08em]">
                    SNEAKER<span className="text-[#E53935]">DROP.</span>
                </Link>

                {/* Navigation links */}
                <div className="hidden items-center gap-10 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-xs font-medium uppercase tracking-[0.15em] text-white/65 transition-colors hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    href="#collection"
                    className="bg-[#E53935] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
                >
                    Explore Drops <span aria-hidden="true">↗</span>
                </Link>

            </nav>
        </header>
    );
}