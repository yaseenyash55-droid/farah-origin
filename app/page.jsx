import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-atelier-cream">
      <Navbar />
      
      {/* Editorial Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20 md:pt-48 flex flex-col md:flex-row items-start justify-between">
        
        {/* Left Content Area */}
        <div className="max-w-2xl">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 border border-atelier-dark rounded-full px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-atelier-dark"></span>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-atelier-dark">
              Erode Boutique Atelier
            </span>
          </div>

          {/* Main Heading styled exactly like the screenshot */}
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 text-atelier-dark">
            Aesthetic <br />
            <span className="text-atelier-rose italic font-medium">Crochet &</span> <br />
            Henna
          </h1>

          {/* Subtext */}
          <p className="text-sm md:text-base text-atelier-dark/80 max-w-md leading-relaxed font-light mb-12">
            Crafting premium luxury solutions at the intersection of beautiful cotton fibers and intricate skin art stains. Designed precisely for landmark moments, boutique gifts, and bridal celebrations.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-6">
            <a href="#collections" className="bg-atelier-rose text-white px-8 py-4 rounded text-xs font-bold tracking-widest uppercase hover:bg-atelier-rose/90 transition-colors flex items-center gap-3">
              View Showcase
              <span className="text-lg leading-none">↗</span>
            </a>
            <div className="flex items-center gap-3 border-l border-atelier-dark/20 pl-6">
              <span className="w-1 h-6 bg-atelier-rose block"></span>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-atelier-dark/60">
                Shipping Pan-India
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - The floating menu card from your screenshot */}
        <div className="hidden md:block mt-12 bg-white p-8 rounded-xl shadow-2xl border border-atelier-border w-80 relative z-10">
          <div className="text-center mb-6">
             <p className="text-[10px] text-atelier-dark/50 tracking-widest uppercase mb-2">Est. 2026</p>
             <h3 className="font-serif text-2xl text-atelier-dark">Farah Origin</h3>
          </div>
          <div className="space-y-4 text-xs font-semibold tracking-widest text-atelier-dark uppercase mb-8">
            <p className="border-b border-dashed border-atelier-border pb-2">01 / Custom Crochet</p>
            <p className="border-b border-dashed border-atelier-border pb-2">02 / Bridal Henna</p>
            <p className="border-b border-dashed border-atelier-border pb-2">03 / Forever Florals</p>
          </div>
          <a href="#contact" className="block w-full text-center bg-atelier-rose text-white py-3 text-[10px] font-bold tracking-widest uppercase rounded hover:bg-atelier-rose/90 transition-colors">
            Tailored With Care
          </a>
        </div>

      </main>

      {/* Curated Collections Section Preview */}
      <section className="container mx-auto px-6 py-20">
         <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-atelier-dark/50 mb-4">Curated Collections</h4>
         <h2 className="font-serif text-4xl text-atelier-dark mb-12">The Atelier Catalog</h2>
         {/* Insert your Gallery component here */}
      </section>
    </div>
  );
}