import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type DashboardHeaderLogoProps = ComponentProps<'div'>;

export const DashboardHeaderLogo = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexShrink: 0,
    width: '16rem',
    overflow: 'hidden',
  },
}) as unknown as FC<DashboardHeaderLogoProps>;
