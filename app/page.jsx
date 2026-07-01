import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg,#FFFDFB 0%,#FFF8F3 40%,#FFF3EE 100%)",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20 md:pt-44 flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left Content */}
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFF7F3] border border-[#E9D9CF] rounded-full px-5 py-2 mb-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D98B9B]"></span>

            <span className="text-xs tracking-[0.25em] uppercase font-semibold text-[#6B5247]">
              Handmade with Love
            </span>
          </div>

          {/* Heading */}

          <h1 className="font-serif text-5xl md:text-7xl leading-tight text-[#3B241C]">
            Customized
            <br />

            <span className="text-[#D98B9B] italic">
              Crochet &
            </span>

            <br />

            Henna
          </h1>

          {/* Brush Text */}

          <div className="inline-block mt-6 px-6 py-2 rounded-md bg-[#F8CCD3]">
            <span className="text-3xl font-serif text-[#3B241C] italic">
              by Farah Origin
            </span>
          </div>

          {/* Description */}

          <p className="mt-8 max-w-lg leading-8 text-[#6B5247]">
            Handmade crochet gifts, elegant bridal mehendi designs,
            customized bouquets, and personalized creations crafted with
            love for birthdays, weddings, baby showers and every special
            occasion.
          </p>

          {/* Buttons */}

          <div className="flex flex-wrap items-center gap-5 mt-12">

            <a
              href="#collections"
              className="px-8 py-4 rounded-lg bg-[#D98B9B] text-white font-semibold uppercase tracking-widest shadow-lg hover:bg-[#C97B8D] transition"
            >
              View Collection
            </a>

            <a
              href="#contact"
              className="px-8 py-4 rounded-lg border border-[#D98B9B] text-[#3B241C] font-semibold uppercase tracking-widest hover:bg-[#FFF0F3] transition"
            >
              Contact Us
            </a>

          </div>
        </div>

        {/* Right Card */}

        <div className="bg-[#FFFDFC] border border-[#E9D9CF] rounded-3xl p-8 shadow-2xl w-full max-w-sm">

          <p className="text-center uppercase tracking-[0.3em] text-xs text-[#A88B80] mb-2">
            Farah Origin
          </p>

          <h2 className="text-3xl font-serif text-center text-[#3B241C] mb-8">
            Our Services
          </h2>

          <div className="space-y-4">

            <div className="bg-[#FFF7F3] rounded-xl p-4 border border-[#EFE1D7]">
              <h3 className="font-semibold text-[#3B241C]">
                🧶 Handmade Crochet
              </h3>
            </div>

            <div className="bg-[#FFF7F3] rounded-xl p-4 border border-[#EFE1D7]">
              <h3 className="font-semibold text-[#3B241C]">
                🌸 Bridal Mehendi
              </h3>
            </div>

            <div className="bg-[#FFF7F3] rounded-xl p-4 border border-[#EFE1D7]">
              <h3 className="font-semibold text-[#3B241C]">
                💐 Flower Bouquets
              </h3>
            </div>

            <div className="bg-[#FFF7F3] rounded-xl p-4 border border-[#EFE1D7]">
              <h3 className="font-semibold text-[#3B241C]">
                🎁 Customized Gifts
              </h3>
            </div>

          </div>

          <a
            href="#contact"
            className="block mt-8 text-center rounded-xl bg-[#D98B9B] py-4 text-white uppercase tracking-widest font-semibold hover:bg-[#C97B8D] transition"
          >
            Order Now
          </a>

        </div>

      </main>

      {/* Collections */}

      <section
        id="collections"
        className="container mx-auto px-6 py-20"
      >
        <p className="uppercase tracking-[0.25em] text-[#A88B80] text-xs mb-4">
          Handmade Collection
        </p>

        <h2 className="font-serif text-5xl text-[#3B241C] mb-12">
          Crafted with Love
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-[#FFFDFC] rounded-3xl p-6 border border-[#EFE1D7] shadow-lg hover:-translate-y-2 transition">
            <img
              src="/crochet.jpg"
              alt="Crochet"
              className="rounded-2xl h-64 w-full object-cover"
            />
            <h3 className="mt-6 text-2xl font-serif text-[#3B241C]">
              Crochet
            </h3>
            <p className="mt-2 text-[#6B5247]">
              Handmade plushies, flowers, keychains and gift items.
            </p>
          </div>

          <div className="bg-[#FFFDFC] rounded-3xl p-6 border border-[#EFE1D7] shadow-lg hover:-translate-y-2 transition">
            <img
              src="/mehendi.jpg"
              alt="Mehendi"
              className="rounded-2xl h-64 w-full object-cover"
            />
            <h3 className="mt-6 text-2xl font-serif text-[#3B241C]">
              Mehendi
            </h3>
            <p className="mt-2 text-[#6B5247]">
              Elegant bridal and festive henna designs.
            </p>
          </div>

          <div className="bg-[#FFFDFC] rounded-3xl p-6 border border-[#EFE1D7] shadow-lg hover:-translate-y-2 transition">
            <img
              src="/bouquet.jpg"
              alt="Bouquet"
              className="rounded-2xl h-64 w-full object-cover"
            />
            <h3 className="mt-6 text-2xl font-serif text-[#3B241C]">
              Flower Bouquets
            </h3>
            <p className="mt-2 text-[#6B5247]">
              Beautiful everlasting bouquets for every occasion.
            </p>
          </div>

        </div>

      </section>
    </div>
  );
}