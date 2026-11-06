'use client';

import { createContext, useContext } from 'react';

export type TabsVariant = 'border' | 'fill';

const TabsContext = createContext<TabsVariant>('border');

export const TabsContextProvider = TabsContext.Provider;

export function useTabsVariant() {
  return useContext(TabsContext);
}
