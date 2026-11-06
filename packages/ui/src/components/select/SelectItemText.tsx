'use client';

import type { ComponentProps, FC } from 'react';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type SelectItemTextProps = Omit<ComponentProps<typeof ArkSelect.ItemText>, 'asChild'>;

export const SelectItemText = styled(ArkSelect.ItemText, {
  base: {},
}) as unknown as FC<SelectItemTextProps>;
