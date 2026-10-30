
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative flex min-h-[680px] items-center overflow-hidden bg-[#171717] sm:min-h-[720px] md:min-h-[760px]">

            {/* Background image */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000&q=85')",
                }}
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />

            {/* Mobile-specific overlay */}
            <div className="absolute inset-0 bg-black/15 md:hidden" />

            {/* Hero content */}
            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-8 md:px-12 md:py-28">

                <p className="mb-7 max-w-[320px] text-[10px] font-bold uppercase leading-relaxed tracking-[0.3em] text-[#E53935] sm:mb-8 sm:text-xs sm:tracking-[0.35em]">
                    The next generation of sneaker culture
                </p>

                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] text-white sm:text-7xl md:text-8xl lg:text-[112px]">
                    STEP INTO
                    <br />
                    YOUR NEXT
                    <br />
                    <span className="text-[#E53935]">ERA.</span>
                </h1>

                <p className="mt-7 max-w-[330px] text-sm leading-7 text-white/70 sm:mt-8 sm:max-w-md sm:text-base">
                    More than just sneakers. Discover a curated collection
                    built for those who move differently.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10 sm:gap-6">
                    <Link
                        href="#collection"
                        className="inline-flex items-center gap-3 bg-[#E53935] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-white hover:text-black sm:px-8 sm:py-5 sm:text-xs sm:tracking-[0.15em]"
                    >
                        Explore Collection
                        <span aria-hidden="true">↗</span>
                    </Link>

                    <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/50 sm:text-xs sm:tracking-[0.15em]">
                        Curated. Limited. Different.
                    </span>
                </div>
            </div>

            {/* Bottom-right editorial caption */}
            <div className="absolute bottom-8 right-8 hidden text-right text-[10px] uppercase tracking-[0.25em] text-white/40 md:block">
                <p>Discover your next favourite</p>
                <p className="mt-1">SneakerDrop © 2026</p>
            </div>
        </section>
    );
}
