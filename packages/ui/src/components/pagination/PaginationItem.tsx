'use client';

import type { ComponentProps } from 'react';

import { ItemContainer } from './PaginationParts';

export type PaginationItemProps = Omit<ComponentProps<typeof ItemContainer>, 'type'>;

export function PaginationItem({ children, value, ...props }: PaginationItemProps) {
  return (
    <ItemContainer
      type="page"
      value={value}
      {...props}
    >
      {children ?? value}
    </ItemContainer>
  );
}
