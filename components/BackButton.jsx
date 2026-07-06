"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Allow navigation via ArrowLeft or Backspace
      // Ignore if user is typing in an input or textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }
      
      if (e.key === "ArrowLeft" || e.key === "Backspace") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-24 left-6 z-50 p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-lg border border-pink-100 hover:bg-pink-50 hover:scale-110 transition-all duration-300 text-pink-600 flex items-center justify-center group"
      aria-label="Go Back"
    >
      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      <span className="hidden md:inline-block ml-2 font-medium">Back</span>
    </button>
  );
}
