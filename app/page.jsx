import Link from 'next/link';
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">

      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Content */}
          <div>

            <span className="inline-block px-5 py-2 rounded-full bg-secondary text-secondary-foreground font-semibold tracking-widest uppercase text-xs mb-8">
              Handmade with Love
            </span>

            <h1 className="text-6xl lg:text-7xl font-playfair font-bold leading-tight text-foreground">
              Customized
              <br />
              <span className="text-primary italic">
                Crochet &
              </span>
              <br />
              Henna
            </h1>

            <div className="inline-block mt-6 bg-secondary px-6 py-3 rounded-xl">
              <p className="text-3xl italic text-foreground">
                by Farah Origin
              </p>
            </div>

            <p className="mt-8 text-lg text-muted-foreground leading-8 max-w-xl">
              Handmade crochet gifts, elegant mehendi, customized bouquets,
              personalized gifts and premium handcrafted creations made with
              love for every special occasion.
            </p>

            <div className="mt-10 flex gap-4">

              <Link href="/view-collection" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition">
                View Collection
              </Link>

              <Link href="/contact-us" className="border border-primary text-foreground px-8 py-4 rounded-xl hover:bg-secondary transition">
                Contact Us
              </Link>

            </div>

          </div>

          {/* Right Card */}

          <div className="bg-card rounded-3xl shadow-xl border border-border p-10">

            <h2 className="text-4xl text-center font-bold text-card-foreground">
              Our Services
            </h2>

            <div className="mt-8 space-y-4">

              <div className="rounded-xl bg-secondary p-5">
                🧶 Handmade Crochet
              </div>

              <div className="rounded-xl bg-secondary p-5">
                🌸 Bridal Mehendi
              </div>

              <div className="rounded-xl bg-secondary p-5">
                💐 Crochet Flower Bouquet
              </div>

              <div className="rounded-xl bg-secondary p-5">
                🎁 Customized Gifts
              </div>

            </div>

            <Link href="/order-now" className="w-full block text-center mt-8 bg-primary text-primary-foreground py-4 rounded-xl hover:bg-primary/90">
              Order Now
            </Link>

          </div>

        </div>

      </section>

      {/* Collection */}

      <section className="container mx-auto px-6 pb-24">

        <div className="text-center mb-14">

          <p className="uppercase tracking-widest text-primary">
            Handmade Collection
          </p>

          <h2 className="text-5xl mt-3 font-bold text-foreground">
            Crafted with Love
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-card rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">

            <img
              src="/crochet.jpg"
              className="w-full h-72 object-cover"
              alt="Crochet"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold text-card-foreground">
                Crochet
              </h3>

              <p className="mt-3 text-muted-foreground">
                Handmade dolls, flowers, keychains, bouquets and gifts.
              </p>

            </div>

          </div>

          <div className="bg-card rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">

            <img
              src="/mehendi.jpg"
              className="w-full h-72 object-cover"
              alt="Mehendi"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold text-card-foreground">
                Mehendi
              </h3>

              <p className="mt-3 text-muted-foreground">
                Bridal, engagement and festive mehendi designs.
              </p>

            </div>

          </div>

          <div className="bg-card rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">

            <img
              src="/bouquet.jpg"
              className="w-full h-72 object-cover"
              alt="Bouquet"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold text-card-foreground">
                Flower Bouquet
              </h3>

              <p className="mt-3 text-muted-foreground">
                Beautiful everlasting crochet flower bouquets.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}