'use client';

import type { ReactNode } from 'react';

import { Tabs as ArkTabs } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import type { TabsVariant } from './TabsContext';
import { TabsContextProvider } from './TabsContext';
import { TabIndicator } from './TabIndicator';

const Container = styled(ArkTabs.List, {
  base: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
});

export type TabListProps = {
  variant?: TabsVariant;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
};

export function TabList({
  variant = 'border',
  'aria-label': ariaLabel,
  className,
  children,
}: TabListProps) {
  return (
    <TabsContextProvider value={variant}>
      <Container
        className={className}
        aria-label={ariaLabel}
      >
        {children}
        <TabIndicator variant={variant} />
      </Container>
    </TabsContextProvider>
  );
}
