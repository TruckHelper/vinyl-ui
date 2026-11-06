import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type BottomActionsProps = ComponentProps<'div'> & {
  variant?: 'single' | 'weighted' | 'equal';
};

export const BottomActions = styled('div', {
  base: {
    position: 'sticky',
    insetBlockEnd: '0',
    zIndex: 'sticky',
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    width: '100%',
    paddingBlockStart: '16',
    paddingBlockEnd: 'calc({spacing.24} + env(safe-area-inset-bottom, 0px))',
    paddingInlineStart: 'calc({spacing.16} + env(safe-area-inset-left, 0px))',
    paddingInlineEnd: 'calc({spacing.16} + env(safe-area-inset-right, 0px))',
    backgroundImage: 'linear-gradient(to bottom, transparent 20.652%, {colors.layout.bg-light})',
    pointerEvents: 'none',
    '& > *': {
      flex: '1 1 0',
      minWidth: '0',
      pointerEvents: 'auto',
    },
  },
  variants: {
    variant: {
      single: {},
      weighted: {
        '& > :first-child:not(:last-child)': {
          flex: '0 0 12rem',
        },
      },
      equal: {},
    },
  },
  defaultVariants: {
    variant: 'single',
  },
}) as unknown as FC<BottomActionsProps>;
