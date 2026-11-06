import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type EmptyStateProps = ComponentProps<'div'>;

export const EmptyState = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8',
    textAlign: 'center',
  },
}) as unknown as FC<EmptyStateProps>;
