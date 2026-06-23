import "./globals.css";

export const metadata = {
  title: "Farah Origin | Crochet Gifts & Bridal Henna Art — Erode",
  description: "Bespoke handcrafted crochet bouquets, custom plushies, and elegant bridal henna designs based in Erode, Tamil Nadu.",
  keywords: "crochet gifts erode, henna artist erode, bridal mehendi erode, custom crochet gifts",
  openGraph: {
    title: "Farah Origin | Crochet Gifts & Bridal Henna Art — Erode",
    description: "Premium custom crochet work and professional intricate bridal henna services.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }) {
  // Local SEO Structured Data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Farah Origin",
    "image": "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Erode",
      "addressRegion": "TN",
      "addressCountry": "IN"
    },
    "description": "Premium crochet gift item curation and professional bridal henna services.",
    "priceRange": "₹₹"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}