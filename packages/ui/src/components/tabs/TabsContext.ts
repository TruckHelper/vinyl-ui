'use client';

import { createContext, useContext } from 'react';

export type TabsType = 'border' | 'fill';

const TabsContext = createContext<TabsType>('border');

export const TabsContextProvider = TabsContext.Provider;

export function useTabsType() {
  return useContext(TabsContext);
}
