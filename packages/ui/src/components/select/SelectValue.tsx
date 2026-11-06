'use client';

import type { ComponentProps, FC } from 'react';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type SelectValueProps = Omit<ComponentProps<typeof ArkSelect.ValueText>, 'asChild'>;

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
}) as unknown as FC<SelectValueProps>;
