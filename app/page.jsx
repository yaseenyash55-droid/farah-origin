import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8F3]">

      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Content */}
          <div>

            <span className="inline-block px-5 py-2 rounded-full bg-pink-100 text-[#C97B8D] font-semibold tracking-widest uppercase text-xs mb-8">
              Handmade with Love
            </span>

            <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-[#3B241C]">
              Customized
              <br />
              <span className="text-[#D98B9B] italic">
                Crochet &
              </span>
              <br />
              Henna
            </h1>

            <div className="inline-block mt-6 bg-pink-200 px-6 py-3 rounded-xl">
              <p className="text-3xl italic text-[#3B241C]">
                by Farah Origin
              </p>
            </div>

            <p className="mt-8 text-lg text-[#6B5247] leading-8 max-w-xl">
              Handmade crochet gifts, elegant mehendi, customized bouquets,
              personalized gifts and premium handcrafted creations made with
              love for every special occasion.
            </p>

            <div className="mt-10 flex gap-4">

              <button className="bg-[#D98B9B] text-white px-8 py-4 rounded-xl hover:bg-[#C97B8D] transition">
                View Collection
              </button>

              <button className="border border-[#D98B9B] text-[#3B241C] px-8 py-4 rounded-xl hover:bg-pink-50 transition">
                Contact Us
              </button>

            </div>

          </div>

          {/* Right Card */}

          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-10">

            <h2 className="text-4xl text-center font-bold text-[#3B241C]">
              Our Services
            </h2>

            <div className="mt-8 space-y-4">

              <div className="rounded-xl bg-pink-50 p-5">
                🧶 Handmade Crochet
              </div>

              <div className="rounded-xl bg-pink-50 p-5">
                🌸 Bridal Mehendi
              </div>

              <div className="rounded-xl bg-pink-50 p-5">
                💐 Crochet Flower Bouquet
              </div>

              <div className="rounded-xl bg-pink-50 p-5">
                🎁 Customized Gifts
              </div>

            </div>

            <button className="w-full mt-8 bg-[#D98B9B] text-white py-4 rounded-xl hover:bg-[#C97B8D]">
              Order Now
            </button>

          </div>

        </div>

      </section>

      {/* Collection */}

      <section className="container mx-auto px-6 pb-24">

        <div className="text-center mb-14">

          <p className="uppercase tracking-widest text-[#C97B8D]">
            Handmade Collection
          </p>

          <h2 className="text-5xl mt-3 font-bold text-[#3B241C]">
            Crafted with Love
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">

            <img
              src="/crochet.jpg"
              className="w-full h-72 object-cover"
              alt="Crochet"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold text-[#3B241C]">
                Crochet
              </h3>

              <p className="mt-3 text-[#6B5247]">
                Handmade dolls, flowers, keychains, bouquets and gifts.
              </p>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">

            <img
              src="/mehendi.jpg"
              className="w-full h-72 object-cover"
              alt="Mehendi"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold text-[#3B241C]">
                Mehendi
              </h3>

              <p className="mt-3 text-[#6B5247]">
                Bridal, engagement and festive mehendi designs.
              </p>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">

            <img
              src="/bouquet.jpg"
              className="w-full h-72 object-cover"
              alt="Bouquet"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold text-[#3B241C]">
                Flower Bouquet
              </h3>

              <p className="mt-3 text-[#6B5247]">
                Beautiful everlasting crochet flower bouquets.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}