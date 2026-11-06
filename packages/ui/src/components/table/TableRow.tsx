import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type TableRowProps = ComponentProps<'tr'>;

export const TableRow = styled('tr', {
  base: {
    '& > th, & > td': {
      borderBottom: '1px solid',
      borderBottomColor: 'layout.default-line',
    },
  },
}) as unknown as FC<TableRowProps>;
