'use client';

import type { ReactNode } from 'react';

import { Tabs as ArkTabs } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { useTabsVariant } from './TabsContext';

const Container = styled(ArkTabs.Trigger, {
  base: {
    textStyle: 'button.medium-normal',
    position: 'relative',
    zIndex: '1',
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '4.8rem',
    color: 'text.default',
    cursor: 'pointer',
    transitionProperty: 'color',
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
    variant: {
      border: {
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
      },
      fill: {
        borderRadius: '8',
        _selected: {
          color: 'text.accent-primary',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'border',
  },
});

export type TabProps = {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Tab({
  value,
  disabled = false,
  className,
  children,
}: TabProps) {
  const variant = useTabsVariant();

  return (
    <Container
      className={className}
      variant={variant}
      value={value}
      disabled={disabled}
    >
      {children}
    </Container>
  );
}
