'use client';

import { createContext, useContext } from 'react';

export type FieldContextValue = {
  inputId: string;
  errorId: string;
  required: boolean;
  hasError: boolean;
  disabled: boolean;
};

const FieldContext = createContext<FieldContextValue | null>(null);

export const FieldContextProvider = FieldContext.Provider;

export function useFieldContext() {
  return useContext(FieldContext);
}
