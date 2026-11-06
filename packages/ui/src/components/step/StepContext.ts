'use client';

import { createContext, useContext } from 'react';

export type StepItemState = 'upcoming' | 'current' | 'complete';

export type StepItemContextValue = {
  number?: number;
  state: StepItemState;
  label: boolean;
};

const StepItemContext = createContext<StepItemContextValue>({
  state: 'upcoming',
  label: true,
});

export const StepItemContextProvider = StepItemContext.Provider;

export function useStepItemContext() {
  return useContext(StepItemContext);
}
