import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type CardTitleProps = ComponentProps<'h3'>;

export const CardTitle = styled('h3', {
  base: {
    textStyle: 'heading.medium-bold',
    color: 'text.heading',
  },
}) as unknown as FC<CardTitleProps>;
