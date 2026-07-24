'use client';

import { useEffect } from 'react';

import { useTernaryDarkMode } from 'usehooks-ts';

export const THEME_STORAGE_KEY = 'vinyl-ui-theme';

export function useColorMode() {
  const { isDarkMode, setTernaryDarkMode } = useTernaryDarkMode({
    localStorageKey: THEME_STORAGE_KEY,
    initializeWithValue: false,
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggle = () => setTernaryDarkMode(isDarkMode ? 'light' : 'dark');

  return { isDarkMode, toggle };
}
