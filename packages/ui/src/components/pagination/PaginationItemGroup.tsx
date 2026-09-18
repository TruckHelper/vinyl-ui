'use client';

import { usePaginationContext } from '@ark-ui/react';

import { usePaginationGroupSize } from './PaginationContext';

import { getPageGroup } from './utils';

import { PaginationItem } from './PaginationItem';

export function PaginationItemGroup() {
  const { page, totalPages } = usePaginationContext();
  const groupSize = usePaginationGroupSize();

  const pages = getPageGroup({ page, totalPages, groupSize });

  return (
    <>
      {pages.map((value) => (
        <PaginationItem
          key={value}
          value={value}
        />
      ))}
    </>
  );
}
