"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <Sun className="h-6 w-6 dark:hidden" />
      <Moon className="hidden h-6 w-6 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
