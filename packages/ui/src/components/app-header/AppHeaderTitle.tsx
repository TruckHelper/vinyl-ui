import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type AppHeaderTitleProps = ComponentProps<'h1'>;

export const AppHeaderTitle = styled('h1', {
  base: {
    gridColumn: '2',
    minWidth: '0',
    overflow: 'hidden',
    textStyle: 'heading.medium-bold',
    fontSize: '1.8rem',
    color: 'text.heading',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}) as unknown as FC<AppHeaderTitleProps>;
