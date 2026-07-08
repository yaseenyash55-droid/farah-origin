import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import BottomNavigation from "../components/BottomNavigation";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground relative overflow-x-hidden`}>
        
        {/* Global Background Design */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-100/40 via-white to-orange-50/40 dark:from-pink-900/20 dark:via-gray-950 dark:to-orange-900/10 pointer-events-none"></div>
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-pink-200/40 dark:bg-pink-800/20 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[50%] rounded-full bg-orange-100/40 dark:bg-orange-900/20 blur-3xl animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] rounded-full bg-rose-100/40 dark:bg-rose-900/20 blur-3xl animate-[pulse_12s_ease-in-out_infinite]"></div>
        </div>

        <CartProvider>
          <AuthProvider>
            <ThemeProvider>
              <div className="pb-16 md:pb-0 min-h-screen flex flex-col justify-between relative z-0">
                {children}
              </div>
              <BottomNavigation />
            </ThemeProvider>
          </AuthProvider>
        </CartProvider>
        <ServiceWorkerRegister />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
