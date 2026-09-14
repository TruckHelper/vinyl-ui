'use client';

import type { ComponentProps } from 'react';

import { Icon } from '../icon/Icon';

import { NextTriggerContainer } from './PaginationParts';

export type PaginationNextTriggerProps = ComponentProps<typeof NextTriggerContainer>;

export function PaginationNextTrigger({ children, ...props }: PaginationNextTriggerProps) {
  return (
    <NextTriggerContainer {...props}>
      {children ?? <Icon name="chevron-right" />}
    </NextTriggerContainer>
  );
}
