import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type CardProps = ComponentProps<'article'>;

export const Card = styled('article', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12',
    flexShrink: 0,
    width: '32rem',
  },
}) as unknown as FC<CardProps>;
