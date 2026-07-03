"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder on the server to avoid hydration mismatch
    return (
        <button aria-label="Toggle theme" disabled>
            <Sun className="h-6 w-6" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
  }

  return (
    <button
      onClick={() => (resolvedTheme === "dark" ? setTheme("light") : setTheme("dark"))}
      aria-label="Toggle theme"
    >
      <Sun className="h-6 w-6 dark:hidden" />
      <Moon className="hidden h-6 w-6 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
