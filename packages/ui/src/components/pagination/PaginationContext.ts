'use client';

import { createContext, useContext } from 'react';

import { DEFAULT_GROUP_SIZE } from './utils';

export type PaginationContextValue = {
  groupSize: number;
};

const PaginationContext = createContext<PaginationContextValue | null>(null);

export const PaginationContextProvider = PaginationContext.Provider;

export function usePaginationGroupSize() {
  return useContext(PaginationContext)?.groupSize ?? DEFAULT_GROUP_SIZE;
}
