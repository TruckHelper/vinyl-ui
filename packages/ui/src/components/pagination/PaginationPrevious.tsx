'use client';

import type { ComponentProps } from 'react';

import { Icon } from '../icon/Icon';

import { PreviousContainer } from './PaginationParts';

export type PaginationPreviousProps = ComponentProps<typeof PreviousContainer>;

export function PaginationPrevious({ children, ...props }: PaginationPreviousProps) {
  return (
    <PreviousContainer {...props}>
      {children ?? <Icon name="chevron-left" />}
    </PreviousContainer>
  );
}
