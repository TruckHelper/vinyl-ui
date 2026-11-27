'use client';

import { createContext, useContext } from 'react';

export type FieldGroupContextValue = {
  errorId: string;
  required: boolean;
  hasError: boolean;
  disabled: boolean;
};

const FieldGroupContext = createContext<FieldGroupContextValue | null>(null);

export const FieldGroupContextProvider = FieldGroupContext.Provider;

export function useFieldGroupContext() {
  return useContext(FieldGroupContext);
}
