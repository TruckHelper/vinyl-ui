import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type CardInfoProps = ComponentProps<'div'>;

export const CardInfo = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
  },
}) as unknown as FC<CardInfoProps>;
