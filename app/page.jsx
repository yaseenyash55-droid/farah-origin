import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:py-40 flex items-center justify-center overflow-hidden">
        <div className="container relative z-10 text-center max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-3 block">
            Erode, Tamil Nadu
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-wide leading-tight mb-6">
            Handcrafted Luxury, Designed to Endure
          </h1>
          <p className="text-base md:text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Discover heirloom-quality crochet creations and custom-drawn bridal henna artistry tailored for your memorable milestones.
          </p>
          <a
            href="#gallery"
            className="inline-block border border-[var(--accent)] text-[var(--accent)] px-8 py-3 rounded-full text-sm tracking-wider uppercase font-medium hover:bg-[var(--accent)] hover:text-[#0d0c0c] transition-all duration-300"
          >
            Explore Portfolio
          </a>
        </div>
      </header>

      <main>
        <Gallery />
        <Testimonials />
      </main>

      {/* Footer Element */}
      <footer className="py-8 text-center text-xs text-gray-600 border-t border-[var(--border)]">
        <p>&copy; {new Date().getFullYear()} Farah Origin. All Rights Reserved.</p>
      </footer>

      <WhatsAppButton />
    </>
  );
}