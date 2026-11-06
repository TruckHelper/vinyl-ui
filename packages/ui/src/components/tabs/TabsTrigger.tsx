'use client';

import type { ReactNode } from 'react';

import { Tabs as ArkTabs } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { useTabsType } from './TabsContext';

const Container = styled(ArkTabs.Trigger, {
  base: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '4.8rem',
    textStyle: 'button.medium-normal',
    color: 'text.default',
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color, color, box-shadow',
    transitionDuration: '0.2s',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
  variants: {
    type: {
      border: {
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
        _selected: {
          borderBottomColor: 'layout.strong-line',
        },
      },
      fill: {
        borderRadius: '8',
        _selected: {
          backgroundColor: 'layout.bg-light',
          boxShadow: 'floating',
          color: 'text.accent-primary',
        },
      },
    },
  },
  defaultVariants: {
    type: 'border',
  },
});

export type TabsTriggerProps = {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

export function TabsTrigger({
  value,
  disabled = false,
  className,
  children,
}: TabsTriggerProps) {
  const type = useTabsType();

  return (
    <Container
      className={className}
      type={type}
      value={value}
      disabled={disabled}
    >
      {children}
    </Container>
  );
}
