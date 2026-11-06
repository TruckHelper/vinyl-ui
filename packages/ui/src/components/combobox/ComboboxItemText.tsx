'use client';

import type { ComponentProps, FC } from 'react';

import { Combobox as ArkCombobox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type ComboboxItemTextProps = Omit<ComponentProps<typeof ArkCombobox.ItemText>, 'asChild'>;

export const ComboboxItemText = styled(ArkCombobox.ItemText, {
  base: {},
}) as unknown as FC<ComboboxItemTextProps>;
