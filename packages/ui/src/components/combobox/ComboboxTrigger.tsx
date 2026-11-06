'use client';

import type { ComponentProps, FC } from 'react';

import { Combobox as ArkCombobox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type ComboboxTriggerProps = Omit<ComponentProps<typeof ArkCombobox.Trigger>, 'asChild'>;

export const ComboboxTrigger = styled(ArkCombobox.Trigger, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '2rem',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'text.input-strong',
    cursor: 'pointer',
    transitionProperty: 'transform',
    transitionDuration: '0.2s',
    _open: {
      transform: 'rotate(180deg)',
    },
    '&[data-invalid]': {
      color: 'text.input-soft',
    },
    _disabled: {
      color: 'text.input-soft',
      cursor: 'not-allowed',
    },
  },
}) as unknown as FC<ComboboxTriggerProps>;
