'use client';

import type { ComponentProps } from 'react';

import { Icon } from '../icon/Icon';

import { GroupJumpTriggerContainer } from './PaginationParts';
import { useGroupJumpTrigger } from './useGroupJumpTrigger';

export type PaginationLastTriggerProps = ComponentProps<typeof GroupJumpTriggerContainer>;

export function PaginationLastTrigger({ children, ...props }: PaginationLastTriggerProps) {
  const triggerProps = useGroupJumpTrigger('last');

  return (
    <GroupJumpTriggerContainer
      {...triggerProps}
      {...props}
    >
      {children ?? <Icon name="chevrons-right" />}
    </GroupJumpTriggerContainer>
  );
}
