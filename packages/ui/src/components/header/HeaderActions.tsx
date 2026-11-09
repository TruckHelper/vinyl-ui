import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type HeaderActionsProps = ComponentProps<'div'>;

export const HeaderActions = styled('div', {
  base: {
    gridArea: 'actions',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    justifySelf: 'end',
    gap: '8',
  },
}) as unknown as FC<HeaderActionsProps>;
