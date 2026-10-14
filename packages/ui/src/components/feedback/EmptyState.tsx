import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

export const EmptyState = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8',
    textAlign: 'center',
  },
});

export type EmptyStateProps = ComponentProps<typeof EmptyState>;
