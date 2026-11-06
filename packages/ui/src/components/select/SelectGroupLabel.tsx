'use client';

import type { ComponentProps, FC } from 'react';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type SelectGroupLabelProps = Omit<ComponentProps<typeof ArkSelect.ItemGroupLabel>, 'asChild'>;

export const SelectGroupLabel = styled(ArkSelect.ItemGroupLabel, {
  base: {
    textStyle: 'body.large-normal',
    display: 'flex',
    alignItems: 'center',
    paddingInline: '12',
    minHeight: 'input-height',
    borderBlockWidth: '1px',
    borderBlockStyle: 'solid',
    borderBlockColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light-gray',
    color: 'text.strong',
  },
}) as unknown as FC<SelectGroupLabelProps>;
