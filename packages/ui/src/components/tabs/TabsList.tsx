'use client';

import type { ReactNode } from 'react';

import { Tabs as ArkTabs } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import type { TabsType } from './TabsContext';
import { TabsContextProvider } from './TabsContext';

const Container = styled(ArkTabs.List, {
  base: {
    display: 'flex',
    width: '100%',
  },
});

export type TabsListProps = {
  type?: TabsType;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
};

export function TabsList({
  type = 'border',
  'aria-label': ariaLabel,
  className,
  children,
}: TabsListProps) {
  return (
    <TabsContextProvider value={type}>
      <Container
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </Container>
    </TabsContextProvider>
  );
}
