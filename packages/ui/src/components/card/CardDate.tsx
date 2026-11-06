import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type CardDateProps = ComponentProps<'time'>;

export const CardDate = styled('time', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
  },
}) as unknown as FC<CardDateProps>;
