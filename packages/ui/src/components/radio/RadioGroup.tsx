'use client';

import type { ReactNode } from 'react';

import { RadioGroup as ArkRadioGroup } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkRadioGroup.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12',
  },
});

export type RadioGroupProps = {
  name: string;
  value: string;
  disabled?: boolean;
  hasError?: boolean;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
  onChangeValue: ({ name, value }: {
    name: string;
    value: string;
  }) => void;
};

export function RadioGroup({
  name,
  value,
  disabled = false,
  hasError = false,
  'aria-label': ariaLabel,
  className,
  children,
  onChangeValue,
}: RadioGroupProps) {
  const handleValueChange = (details: ArkRadioGroup.ValueChangeDetails) => {
    onChangeValue({
      name,
      value: details.value ?? '',
    });
  };

  return (
    <Container
      className={className}
      name={name}
      value={value}
      disabled={disabled}
      invalid={hasError}
      aria-label={ariaLabel}
      aria-invalid={hasError || undefined}
      onValueChange={handleValueChange}
    >
      {children}
    </Container>
  );
}
