'use client';

import type { ComponentProps } from 'react';

import { Icon } from '../icon/Icon';

import { NextContainer } from './PaginationParts';

export type PaginationNextProps = ComponentProps<typeof NextContainer>;

export function PaginationNext({ children, ...props }: PaginationNextProps) {
  return (
    <NextContainer {...props}>
      {children ?? <Icon name="chevron-right" />}
    </NextContainer>
  );
}
