import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type ListProps = ComponentProps<'ul'>;

export const List = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0',
    padding: '0',
    width: '100%',
    listStyle: 'none',
  },
}) as unknown as FC<ListProps>;
