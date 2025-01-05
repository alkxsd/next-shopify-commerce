'use client';


import { useTheme } from '@/lib/store/theme';
import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme)
  }, [theme]);

  return children;
}

export default ThemeProvider