import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type ListTitleProps = ComponentProps<'div'>;

export const ListTitle = styled('div', {
  base: {
    textStyle: 'body.medium-light',
    flexShrink: 0,
    width: '10rem',
    color: 'text.default',
    overflowWrap: 'break-word',
  },
}) as unknown as FC<ListTitleProps>;
