'use client';

import type { ComponentProps, FC } from 'react';

import { Combobox as ArkCombobox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type ComboboxInputProps = Omit<ComponentProps<typeof ArkCombobox.Input>, 'asChild'>;

export const ComboboxInput = styled(ArkCombobox.Input, {
  base: {
    textStyle: 'input.medium-light',
    flex: '1 0 0',
    minWidth: 0,
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'text.input',
    outline: 'none',
    _placeholder: {
      color: 'text.input-soft',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
}) as unknown as FC<ComboboxInputProps>;
