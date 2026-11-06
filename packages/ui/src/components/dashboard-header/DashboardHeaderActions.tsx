import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type DashboardHeaderActionsProps = ComponentProps<'div'>;

export const DashboardHeaderActions = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '16',
    paddingBlock: '4',
  },
}) as unknown as FC<DashboardHeaderActionsProps>;
