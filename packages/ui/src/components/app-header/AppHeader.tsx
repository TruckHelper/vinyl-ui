import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type AppHeaderProps = ComponentProps<'header'>;

export const AppHeader = styled('header', {
  base: {
    position: 'sticky',
    insetBlockStart: '0',
    zIndex: 'sticky',
    display: 'grid',
    gridTemplateColumns: '1fr minmax(0, auto) 1fr',
    alignItems: 'center',
    gap: '8',
    width: '100%',
    paddingBlockStart: 'calc({spacing.16} + env(safe-area-inset-top, 0px))',
    paddingBlockEnd: '16',
    paddingInlineStart: 'calc({spacing.16} + env(safe-area-inset-left, 0px))',
    paddingInlineEnd: 'calc({spacing.16} + env(safe-area-inset-right, 0px))',
    backgroundColor: 'layout.bg-light',
  },
}) as unknown as FC<AppHeaderProps>;
