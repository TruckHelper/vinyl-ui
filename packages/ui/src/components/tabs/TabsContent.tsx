'use client';

import type { ComponentProps, FC } from 'react';

import { Tabs as ArkTabs } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type TabsContentProps = Omit<ComponentProps<typeof ArkTabs.Content>, 'asChild'>;

export const TabsContent = styled(ArkTabs.Content) as unknown as FC<TabsContentProps>;
