'use client';

import { createContext, useContext } from 'react';

export type ProcessItemState = 'upcoming' | 'current' | 'complete';

export type ProcessItemContextValue = {
  state: ProcessItemState;
};

const ProcessItemContext = createContext<ProcessItemContextValue>({
  state: 'upcoming',
});

export const ProcessItemContextProvider = ProcessItemContext.Provider;

export function useProcessItemContext() {
  return useContext(ProcessItemContext);
}
