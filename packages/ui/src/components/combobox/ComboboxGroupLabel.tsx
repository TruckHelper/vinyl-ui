'use client';

import type { ComponentProps, FC } from 'react';

import { Combobox as ArkCombobox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type ComboboxGroupLabelProps = Omit<ComponentProps<typeof ArkCombobox.ItemGroupLabel>, 'asChild'>;

export const ComboboxGroupLabel = styled(ArkCombobox.ItemGroupLabel, {
  base: {
    textStyle: 'body.medium-bold',
    paddingInline: '12',
    paddingBlock: '8',
    color: 'text.soft',
  },
}) as unknown as FC<ComboboxGroupLabelProps>;
