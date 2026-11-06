'use client';

import { Tabs as ArkTabs } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import type { TabsVariant } from './TabsContext';

const Container = styled(ArkTabs.Indicator, {
  base: {
    zIndex: '0',
    pointerEvents: 'none',
    '--transition-duration': '0.2s',
    '--transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    _motionReduce: {
      '--transition-duration': '0s',
    },
  },
  variants: {
    variant: {
      border: {
        bottom: '0',
        left: 'var(--left)',
        width: 'var(--width)',
        height: '2px',
        backgroundColor: 'layout.strong-line',
      },
      fill: {
        top: 'var(--top)',
        left: 'var(--left)',
        width: 'var(--width)',
        height: 'var(--height)',
        borderRadius: '8',
        backgroundColor: 'layout.bg-light',
        boxShadow: 'floating',
      },
    },
  },
  defaultVariants: {
    variant: 'border',
  },
});

export type TabIndicatorProps = {
  variant?: TabsVariant;
};

export function TabIndicator({ variant = 'border' }: TabIndicatorProps) {
  return <Container variant={variant} />;
}
