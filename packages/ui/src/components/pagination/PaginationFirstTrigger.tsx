'use client';

import type { ComponentProps } from 'react';

import { Icon } from '../icon/Icon';

import { GroupJumpTriggerContainer } from './PaginationParts';
import { useGroupJumpTrigger } from './useGroupJumpTrigger';

export type PaginationFirstTriggerProps = ComponentProps<typeof GroupJumpTriggerContainer>;

export function PaginationFirstTrigger({ children, ...props }: PaginationFirstTriggerProps) {
  const triggerProps = useGroupJumpTrigger('first');

  return (
    <GroupJumpTriggerContainer
      {...triggerProps}
      {...props}
    >
      {children ?? <Icon name="chevrons-left" />}
    </GroupJumpTriggerContainer>
  );
}
