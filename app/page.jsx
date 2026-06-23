import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Authentic Hero Section */}
      <header className="relative pt-32 pb-20 md:py-40 flex items-center justify-center overflow-hidden bg-[var(--background)]">
        <div className="container relative z-10 text-center max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4 block letter-spacing-2">
            Erode, Tamil Nadu
          </span>
          <h1 className="text-4xl md:text-6xl font-normal tracking-wide leading-tight mb-6 text-[var(--foreground)]">
            Rooted in Tradition, Crafted with Grace
          </h1>
          <p className="text-base md:text-lg text-[#5d4037] mb-8 max-w-xl mx-auto leading-relaxed font-sans">
            Timeless bridal henna artistry and heirloom-quality crochet, woven with patience and designed to celebrate life's most beautiful moments.
          </p>
          <a
            href="#gallery"
            className="inline-block border border-[var(--accent)] text-[var(--accent)] px-8 py-3 rounded text-sm tracking-wider uppercase font-medium hover:bg-[var(--accent)] hover:text-[#fdfbf7] transition-all duration-300 font-sans"
          >
            View Our Work
          </a>
        </div>
      </header>

      <main>
        <Gallery />
        <Testimonials />
      </main>

      <footer className="py-12 text-center text-sm text-[#795548] border-t border-[var(--border)] font-sans">
        <p>&copy; {new Date().getFullYear()} Farah Origin. All Rights Reserved.</p>
      </footer>

      <WhatsAppButton />
    </>
  );
}