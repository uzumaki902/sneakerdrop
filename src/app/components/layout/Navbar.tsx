
import Link from "next/link";

const navigation = [
    { label: "Collection", href: "#collection" },
    { label: "Our Story", href: "#story" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171717] text-white">
            <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 md:px-12">

                {/* Brand */}
                <Link
                    href="/"
                    className="shrink-0 text-lg font-black tracking-[-0.08em] sm:text-xl md:text-2xl"
                >
                    SNEAKER<span className="text-[#E53935]">DROP.</span>
                </Link>

                {/* Desktop Navigation */}
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
                    className="shrink-0 whitespace-nowrap bg-[#E53935] px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black sm:px-5 sm:text-xs"
                >
                    Explore Drops <span aria-hidden="true">↗</span>
                </Link>

            </nav>
        </header>
    );
}
