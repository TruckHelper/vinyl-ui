'use client';

import type { ComponentProps } from 'react';

import { useGroupJump } from './useGroupJump';

import { Icon } from '../icon/Icon';

import { GroupJumpContainer } from './PaginationParts';

export type PaginationFirstProps = ComponentProps<typeof GroupJumpContainer>;

export function PaginationFirst({ children, ...props }: PaginationFirstProps) {
  const triggerProps = useGroupJump('first');

  return (
    <GroupJumpContainer
      {...triggerProps}
      {...props}
    >
      {children ?? <Icon name="chevrons-left" />}
    </GroupJumpContainer>
  );
}
