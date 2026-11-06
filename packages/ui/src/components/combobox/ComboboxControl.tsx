'use client';

import type { ComponentProps } from 'react';

import { Combobox as ArkCombobox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

import { ComboboxTrigger } from './ComboboxTrigger';

const Container = styled(ArkCombobox.Control, {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12',
    paddingInline: '12',
    width: '100%',
    minHeight: 'input-height',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'layout.default-line',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: {
      borderColor: 'layout.strong-line',
    },
    _focusWithin: {
      borderColor: 'layout.strong-line',
    },
    '&[data-state=open]': {
      borderColor: 'layout.strong-line',
    },
    '&:has(input:focus-visible)': {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    '&[data-invalid]': {
      backgroundColor: 'layout.bg-issue',
      borderColor: 'layout.issue-line',
    },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      borderColor: 'layout.default-line',
      cursor: 'not-allowed',
    },
  },
});

export type ComboboxControlProps = Omit<ComponentProps<typeof ArkCombobox.Control>, 'asChild'> & {
  hasIndicator?: boolean;
};

export function ComboboxControl({
  children,
  hasIndicator = true,
  ...props
}: ComboboxControlProps) {
  return (
    <Container {...props}>
      {children}
      {hasIndicator && (
        <ComboboxTrigger>
          <Icon name="chevron-down" />
        </ComboboxTrigger>
      )}
    </Container>
  );
}
