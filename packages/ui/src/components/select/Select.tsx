'use client';

import type { ComponentProps } from 'react';
import { useMemo } from 'react';

import { createListCollection, Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

const Container = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    width: '100%',
  },
});

export type SelectItemData = {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
};

type RootProps = ComponentProps<typeof ArkSelect.Root<SelectItemData>>;
type ValueChangeDetails = Parameters<NonNullable<RootProps['onValueChange']>>[0];

type SelectProps = Omit<Partial<RootProps>, 'value' | 'onValueChange'> & {
  items: SelectItemData[];
  name: string;
  value: string[];
  disabled?: boolean;
  hasError?: boolean;
  multiple?: boolean;
  onChangeValue: ({ name, value }: {
    name: string;
    value: string[];
  }) => void;
};

export function Select({
  items,
  name,
  value,
  disabled = false,
  hasError = false,
  multiple = false,
  children,
  onChangeValue,
  ...props
}: SelectProps) {
  const collection = useMemo(() => {
    return createListCollection<SelectItemData>({
      items,
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
      isItemDisabled: (item) => item.disabled ?? false,
    });
  }, [items]);

  const handleChangeValue = (details: ValueChangeDetails) => {
    onChangeValue({
      name,
      value: details.value,
    });
  };

  return (
    <Container>
      <ArkSelect.Root
        collection={collection}
        disabled={disabled}
        invalid={hasError}
        name={name}
        value={value}
        multiple={multiple}
        onValueChange={handleChangeValue}
        {...props}
      >
        {children}
      </ArkSelect.Root>
    </Container>
  );
}
