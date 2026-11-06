'use client';

import { RadioGroup as ArkRadioGroup } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkRadioGroup.ItemControl, {
  base: {
    display: 'inline-block',
    flexShrink: 0,
    boxSizing: 'border-box',
    width: '2.4rem',
    height: '2.4rem',
    borderWidth: '6px',
    borderStyle: 'solid',
    borderColor: 'layout.default-line',
    borderRadius: 'full',
    backgroundColor: 'layout.bg-light',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: { borderColor: 'layout.highlight-line' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _checked: {
      borderColor: 'layout.primary',
      _hover: { borderColor: 'layout.primary' },
    },
    _invalid: {
      borderColor: 'layout.issue-line',
      _hover: { borderColor: 'layout.issue-line' },
      _checked: {
        borderColor: 'layout.primary',
        _hover: { borderColor: 'layout.primary' },
      },
      _disabled: {
        borderColor: 'layout.default-line',
        backgroundColor: 'text.disable',
        _hover: { borderColor: 'layout.default-line' },
        _checked: {
          borderColor: 'layout.default-line',
          _hover: { borderColor: 'layout.default-line' },
        },
      },
    },
    _disabled: {
      borderColor: 'layout.default-line',
      backgroundColor: 'text.disable',
      _hover: { borderColor: 'layout.default-line' },
      _checked: {
        borderColor: 'layout.default-line',
        _hover: { borderColor: 'layout.default-line' },
      },
    },
  },
});

export type RadioControlProps = {
  className?: string;
};

export function RadioControl({ className }: RadioControlProps) {
  return <Container className={className} />;
}
