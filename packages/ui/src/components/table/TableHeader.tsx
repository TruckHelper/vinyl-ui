import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type TableHeaderProps = ComponentProps<'thead'>;

export const TableHeader = styled('thead', {
  base: {
    backgroundColor: 'layout.table-header',
  },
}) as unknown as FC<TableHeaderProps>;
