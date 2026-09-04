'use client';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export const SelectItem = styled(ArkSelect.Item, {
  base: {
    textStyle: 'input.medium-light',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12',
    paddingInline: '12',
    minHeight: 'input-height',
    backgroundColor: 'layout.bg-light',
    color: 'text.input',
    cursor: 'pointer',
    _highlighted: {
      backgroundColor: 'layout.primary-subtle',
      color: 'text.accent-primary',
    },
    '&[data-state=checked]': {
      backgroundColor: 'layout.primary-subtle',
      color: 'text.accent-primary',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});