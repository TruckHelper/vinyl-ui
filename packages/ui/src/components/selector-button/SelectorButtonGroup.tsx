'use client';

import type { ReactNode } from 'react';

import { ToggleGroup as ArkToggleGroup } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkToggleGroup.Root, {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8',
  },
});

export type SelectorButtonGroupProps = {
  name: string;
  value: string[];
  multiple?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
  onChangeValue: ({ name, value }: {
    name: string;
    value: string[];
  }) => void;
};

export function SelectorButtonGroup({
  name,
  value,
  multiple = false,
  disabled = false,
  hasError = false,
  'aria-label': ariaLabel,
  className,
  children,
  onChangeValue,
}: SelectorButtonGroupProps) {
  const handleValueChange = (details: ArkToggleGroup.ValueChangeDetails) => {
    onChangeValue({
      name,
      value: details.value,
    });
  };

  return (
    <Container
      className={className}
      value={value}
      multiple={multiple}
      deselectable={multiple}
      disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      aria-label={ariaLabel}
      aria-invalid={hasError || undefined}
      data-invalid={hasError ? '' : undefined}
      onValueChange={handleValueChange}
    >
      {children}
    </Container>
  );
}
