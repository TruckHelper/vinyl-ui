import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type CardContentProps = ComponentProps<'div'>;

export const CardContent = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
  },
}) as unknown as FC<CardContentProps>;
