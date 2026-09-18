'use client';

import type { ComponentProps } from 'react';

import { useGroupJump } from './useGroupJump';

import { Icon } from '../icon/Icon';

import { GroupJumpContainer } from './PaginationParts';

export type PaginationLastProps = ComponentProps<typeof GroupJumpContainer>;

export function PaginationLast({ children, ...props }: PaginationLastProps) {
  const triggerProps = useGroupJump('last');

  return (
    <GroupJumpContainer
      {...triggerProps}
      {...props}
    >
      {children ?? <Icon name="chevrons-right" />}
    </GroupJumpContainer>
  );
}
