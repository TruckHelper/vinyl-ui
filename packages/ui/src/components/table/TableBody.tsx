import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type TableBodyProps = ComponentProps<'tbody'>;

export const TableBody = styled('tbody', {
  base: {
    backgroundColor: 'layout.bg-light',
    '& > tr:last-child > td, & > tr:last-child > th': {
      borderBottomWidth: 0,
    },
  },
}) as unknown as FC<TableBodyProps>;
