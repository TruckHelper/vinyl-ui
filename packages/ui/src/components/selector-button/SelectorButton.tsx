'use client';

import type { ReactNode } from 'react';

import { ToggleGroup as ArkToggleGroup } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkToggleGroup.Item, {
  base: {
    textStyle: 'button.medium-normal',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: '16',
    paddingBlock: '12',
    border: '1px solid',
    borderColor: 'layout.default-line',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light',
    color: 'text.default',
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: { borderColor: 'layout.highlight-line' },
    '&[data-state=on]': {
      backgroundColor: 'layout.primary-subtle',
      borderColor: 'layout.highlight-line',
      color: 'text.accent-primary',
      _disabled: {
        backgroundColor: 'layout.bg-disable',
        borderColor: 'transparent',
        color: 'text.disable',
      },
    },
    '[data-invalid] > &': {
      backgroundColor: 'layout.bg-issue',
      borderColor: 'layout.issue-line',
      color: 'text.default',
      _hover: { borderColor: 'layout.issue-line' },
      '&[data-state=on]': {
        backgroundColor: 'layout.primary-subtle',
        borderColor: 'layout.issue-line',
        color: 'text.accent-primary',
        _disabled: {
          backgroundColor: 'layout.bg-disable',
          borderColor: 'transparent',
          color: 'text.disable',
          _hover: { borderColor: 'transparent' },
        },
      },
      _disabled: {
        backgroundColor: 'layout.bg-disable',
        borderColor: 'transparent',
        color: 'text.disable',
        _hover: { borderColor: 'transparent' },
      },
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      borderColor: 'transparent',
      color: 'text.disable',
      cursor: 'not-allowed',
      _hover: { borderColor: 'transparent' },
    },
  },
});

export type SelectorButtonProps = {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

export function SelectorButton({
  value,
  disabled = false,
  className,
  children,
}: SelectorButtonProps) {
  return (
    <Container
      className={className}
      value={value}
      disabled={disabled}
    >
      {children}
    </Container>
  );
}
