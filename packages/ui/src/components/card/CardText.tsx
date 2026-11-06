import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type CardTextProps = ComponentProps<'p'>;

export const CardText = styled('p', {
  base: {
    textStyle: 'body.medium-light',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'text.default',
  },
}) as unknown as FC<CardTextProps>;
