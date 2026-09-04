'use client';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export const SelectValue = styled(ArkSelect.ValueText, {
  base: {
    flex: '1 0 0',
    minWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    color: 'text.input',
    '&[data-placeholder-shown]': {
      color: 'text.input-soft',
    },
  },
});