import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type DashboardHeaderProps = ComponentProps<'header'>;

export const DashboardHeader = styled('header', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: { base: '7.2rem', desktop: '5.6rem' },
    paddingBlock: { base: '16', desktop: '8' },
    paddingInline: { base: '16', desktop: '0' },
    color: 'text.default-light',
    '& :where(a)': { color: 'text.default-light' },
  },
}) as unknown as FC<DashboardHeaderProps>;
