'use client';

import type { ComponentProps } from 'react';

import { Combobox as ArkCombobox, useComboboxContext } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkCombobox.Item, {
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

export type ComboboxItemProps = Omit<ComponentProps<typeof ArkCombobox.Item>, 'asChild'>;

export function ComboboxItem({ item, ...props }: ComboboxItemProps) {
  const combobox = useComboboxContext();

  if (!combobox.collection.has(combobox.collection.getItemValue(item))) {
    return null;
  }

  return (
    <Container
      item={item}
      {...props}
    />
  );
}
