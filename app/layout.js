import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { CartProvider } from "../context/CartContext";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground`}>
        <CartProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}