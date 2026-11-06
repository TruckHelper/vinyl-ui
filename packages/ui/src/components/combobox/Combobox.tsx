'use client';

import type { ComponentProps } from 'react';
import { useMemo, useState } from 'react';

import { Combobox as ArkCombobox, createListCollection, useFilter } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    width: '100%',
  },
});

export type ComboboxItemData = {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
};

type RootProps = ComponentProps<typeof ArkCombobox.Root<ComboboxItemData>>;
type ValueChangeDetails = Parameters<NonNullable<RootProps['onValueChange']>>[0];
type InputValueChangeDetails = Parameters<NonNullable<RootProps['onInputValueChange']>>[0];
type OpenChangeDetails = Parameters<NonNullable<RootProps['onOpenChange']>>[0];

type OmittedRootProps =
  | 'asChild'
  | 'collection'
  | 'value'
  | 'defaultValue'
  | 'onValueChange'
  | 'inputValue'
  | 'defaultInputValue'
  | 'open'
  | 'defaultOpen'
  | 'defaultHighlightedValue';

export type ComboboxProps = Omit<Partial<RootProps>, OmittedRootProps> & {
  items: ComboboxItemData[];
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

export function Combobox({
  items,
  name,
  value,
  disabled = false,
  hasError = false,
  multiple = false,
  positioning,
  translations,
  children,
  onChangeValue,
  onInputValueChange,
  onOpenChange,
  ...props
}: ComboboxProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const { contains } = useFilter({ sensitivity: 'base' });

  const collection = useMemo(() => {
    return createListCollection<ComboboxItemData>({
      items: items.filter((item) => contains(item.label, query)),
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
      isItemDisabled: (item) => item.disabled ?? false,
    });
  }, [items, query, contains]);

  const handleChangeValue = (details: ValueChangeDetails) => {
    onChangeValue({
      name,
      value: details.value,
    });
  };

  const handleInputValueChange = (details: InputValueChangeDetails) => {
    setQuery(details.reason === 'input-change' ? details.inputValue : '');
    onInputValueChange?.(details);
  };

  const handleOpenChange = (details: OpenChangeDetails) => {
    if (details.open && details.reason !== 'input-change') {
      setQuery('');
    }
    setOpen(details.open);
    onOpenChange?.(details);
  };

  return (
    <Container>
      <ArkCombobox.Root
        collection={collection}
        disabled={disabled}
        invalid={hasError}
        name={name}
        value={value}
        multiple={multiple}
        open={open && collection.size > 0}
        openOnClick
        positioning={{
          gutter: 4,
          ...positioning,
        }}
        translations={{
          triggerLabel: '목록 열기',
          clearTriggerLabel: '입력 지우기',
          ...translations,
        }}
        onValueChange={handleChangeValue}
        onInputValueChange={handleInputValueChange}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {children}
      </ArkCombobox.Root>
    </Container>
  );
}
