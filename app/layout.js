import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import BottomNavigation from "../components/BottomNavigation";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";

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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon-192x192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground`}>
        <CartProvider>
          <AuthProvider>
            <ThemeProvider>
              <div className="pb-16 md:pb-0 min-h-screen flex flex-col justify-between">
                {children}
              </div>
              <BottomNavigation />
            </ThemeProvider>
          </AuthProvider>
        </CartProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
