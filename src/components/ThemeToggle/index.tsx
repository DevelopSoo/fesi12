"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { toggleDarkMode } = useTheme();

  return (
    <button
      className="rounded-md border border-gray-300 p-2 dark:text-white"
      onClick={toggleDarkMode}
    >
      다크모드 버튼
    </button>
  );
}
