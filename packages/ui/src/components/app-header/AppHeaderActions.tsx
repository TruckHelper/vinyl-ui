import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type AppHeaderActionsProps = ComponentProps<'div'>;

export const AppHeaderActions = styled('div', {
  base: {
    gridColumn: '3',
    justifySelf: 'end',
    display: 'flex',
    alignItems: 'center',
    gap: '8',
  },
}) as unknown as FC<AppHeaderActionsProps>;
