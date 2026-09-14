'use client';

import { usePaginationContext } from '@ark-ui/react';

import { usePaginationGroupSize } from './PaginationContext';
import { PaginationItem } from './PaginationItem';
import { getPageGroup } from './utils';

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
