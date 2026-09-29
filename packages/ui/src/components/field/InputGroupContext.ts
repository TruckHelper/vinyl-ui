'use client';

import { createContext, useContext } from 'react';

export type InputGroupContextValue = {
  hasError: boolean;
  disabled: boolean;
};

const InputGroupContext = createContext<InputGroupContextValue | null>(null);

export const InputGroupContextProvider = InputGroupContext.Provider;

export function useInputGroupContext() {
  return useContext(InputGroupContext);
}
