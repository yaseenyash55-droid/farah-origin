import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Load the elegant Serif font for headings
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ['normal', 'italic']
});

// Load the clean Sans-Serif font for body/labels
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Farah Origin | Aesthetic Crochet & Henna Atelier",
  description: "Crafting premium luxury solutions at the intersection of beautiful cotton fibers and intricate skin art stains.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#f8f5f2] text-[#2c2421]`}>
        {children}
      </body>
    </html>
  );
}