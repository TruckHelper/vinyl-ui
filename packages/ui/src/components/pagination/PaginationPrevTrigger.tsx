'use client';

import type { ComponentProps } from 'react';

import { Icon } from '../icon/Icon';

import { PrevTriggerContainer } from './PaginationParts';

export type PaginationPrevTriggerProps = ComponentProps<typeof PrevTriggerContainer>;

export function PaginationPrevTrigger({ children, ...props }: PaginationPrevTriggerProps) {
  return (
    <PrevTriggerContainer {...props}>
      {children ?? <Icon name="chevron-left" />}
    </PrevTriggerContainer>
  );
}
