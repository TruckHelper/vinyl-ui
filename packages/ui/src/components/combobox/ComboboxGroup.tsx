'use client';

import type { ComponentProps, FC } from 'react';

import { Combobox as ArkCombobox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type ComboboxGroupProps = Omit<ComponentProps<typeof ArkCombobox.ItemGroup>, 'asChild'>;

export const ComboboxGroup = styled(ArkCombobox.ItemGroup, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    '&:not(:has([data-part=item]))': {
      display: 'none',
    },
  },
}) as unknown as FC<ComboboxGroupProps>;
