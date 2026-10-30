import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative flex min-h-[680px] items-center overflow-hidden bg-[#171717] md:min-h-[760px]">


            <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000&q=85')",
                }}
            />


            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />


            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-28 md:px-12">

                <p className="mb-8 text-xs font-bold uppercase tracking-[0.35em] text-[#E53935]">
                    The next generation of sneaker culture
                </p>

                <h1 className="max-w-4xl text-6xl font-black leading-[0.95] tracking-[-0.07em] text-white sm:text-7xl md:text-8xl lg:text-[112px]">
                    STEP INTO
                    <br />
                    YOUR NEXT
                    <br />
                    <span className="text-[#E53935]">ERA.</span>
                </h1>

                <p className="mt-8 max-w-md text-sm leading-7 text-white/65 md:text-base">
                    More than just sneakers. Discover a curated collection
                    built for those who move differently.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-6">

                    <Link
                        href="#collection"
                        className="bg-[#E53935] px-8 py-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white hover:text-black"
                    >
                        Explore Collection <span aria-hidden="true">↗</span>
                    </Link>

                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/50">
                        Curated. Limited. Different.
                    </span>

                </div>

            </div>


            <div className="absolute bottom-8 right-8 hidden text-right text-[10px] uppercase tracking-[0.25em] text-white/40 md:block">
                <p>Discover your next favourite</p>
                <p className="mt-1">SneakerDrop © 2026</p>
            </div>

        </section>
    );
}