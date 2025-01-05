'use client';

import { useTheme } from "@/lib/store/theme";
import { Moon, Sun } from "lucide-react";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
      aria-label='Toggle Theme'
    >
      {theme === 'light' ? (
        <Moon className='h-5 w-5 text-gray-800 dark:text-gray-200' />
      ) : (
        <Sun className='h-5 w-5 text-gray-800 dark:text-gray-200' />
      )}
    </button>
  );
}

export default ThemeSwitch