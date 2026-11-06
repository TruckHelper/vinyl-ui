'use client';

import type { ComponentProps, FC } from 'react';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type SelectGroupLabelProps = Omit<ComponentProps<typeof ArkSelect.ItemGroupLabel>, 'asChild'>;

export const SelectGroupLabel = styled(ArkSelect.ItemGroupLabel, {
  base: {
    textStyle: 'body.medium-bold',
    paddingInline: '12',
    paddingBlock: '8',
    color: 'text.soft',
  },
}) as unknown as FC<SelectGroupLabelProps>;
