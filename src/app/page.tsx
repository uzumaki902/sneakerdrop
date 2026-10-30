import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3EE]">

      <Navbar />

      <Hero />

      <section
        id="story"
        className="bg-[#171717] px-6 py-28 text-white md:px-12 md:py-36"
      >
        <div className="mx-auto max-w-[1440px]">

          <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-[#E53935]">
            More than footwear
          </p>

          <h2 className="max-w-5xl text-4xl font-black leading-tight tracking-[-0.06em] sm:text-5xl md:text-7xl">
            NOT JUST SNEAKERS.
            <br />
            <span className="text-white/35">
              A STATEMENT.
            </span>
          </h2>

          <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/15 pt-8 md:flex-row">

            <p className="max-w-lg text-sm leading-7 text-white/55">
              SneakerDrop is built around the culture, creativity
              and individuality behind every pair. Discover
              sneakers that represent more than just a style.
            </p>

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Move differently. / 001
            </p>

          </div>

        </div>
      </section>


      <section
        id="collection"
        className="px-6 py-28 md:px-12 md:py-36"
      >
        <div className="mx-auto max-w-[1440px]">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#E53935]">
                The collection
              </p>

              <h2 className="text-5xl font-black tracking-[-0.07em] text-[#171717] md:text-7xl">
                THE LATEST
                <br />
                DROPS.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/55">
              Every drop has a story. Discover a carefully
              curated collection of sneakers made to stand out.
            </p>

          </div>

          <div className="mt-16 overflow-hidden bg-[#E9E6DF]">

            <div className="grid min-h-[300px] items-center md:grid-cols-2">

              <div className="p-8 md:p-16">

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E53935]">
                  A new perspective
                </p>

                <h3 className="mt-6 text-4xl font-black leading-tight tracking-[-0.06em] text-[#171717] md:text-5xl">
                  YOUR NEXT
                  <br />
                  FAVOURITE
                  <br />
                  STARTS HERE.
                </h3>

                <p className="mt-6 max-w-sm text-sm leading-7 text-black/55">
                  Explore the SneakerDrop collection and
                  find your next statement piece.
                </p>

              </div>

              <div
                aria-hidden="true"
                className="min-h-[300px] bg-cover bg-center md:min-h-full"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85')",
                }}
              />

            </div>

          </div>

          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-black/35">
            A curated selection · SneakerDrop
          </p>

        </div>
      </section>

      <section className="bg-[#E53935] px-6 py-24 text-white md:px-12 md:py-32">

        <div className="mx-auto max-w-[1440px]">

          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
            Stay ahead of the drop
          </p>

          <h2 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-8xl">
            DON'T MISS
            <br />
            WHAT'S NEXT.
          </h2>

          <p className="mt-8 max-w-md text-sm leading-7 text-white/75">
            The next drop could be the one.
            Stay connected with SneakerDrop.
          </p>

        </div>

      </section>

      <Footer />

    </main>
  );
}