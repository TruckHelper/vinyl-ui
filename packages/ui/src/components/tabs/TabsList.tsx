'use client';

import type { ReactNode } from 'react';

import { Tabs as ArkTabs } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import type { TabsVariant } from './TabsContext';
import { TabsContextProvider } from './TabsContext';

const Container = styled(ArkTabs.List, {
  base: {
    display: 'flex',
    width: '100%',
  },
});

export type TabsListProps = {
  variant?: TabsVariant;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
};

export function TabsList({
  variant = 'border',
  'aria-label': ariaLabel,
  className,
  children,
}: TabsListProps) {
  return (
    <TabsContextProvider value={variant}>
      <Container
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </Container>
    </TabsContextProvider>
  );
}
