'use client';

import type { ReactNode } from 'react';

import { Checkbox as ArkCheckbox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkCheckbox.Root, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8',
    cursor: 'pointer',
    _disabled: { cursor: 'not-allowed' },
  },
});

export type CheckboxProps = {
  name: string;
  checked: boolean;
  disabled?: boolean;
  hasError?: boolean;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
  onChangeChecked: ({ name, value }: {
    name: string;
    value: boolean;
  }) => void;
};

export function Checkbox({
  name,
  checked,
  disabled = false,
  hasError = false,
  'aria-label': ariaLabel,
  className,
  children,
  onChangeChecked,
}: CheckboxProps) {
  const handleChangeChecked = (details: ArkCheckbox.CheckedChangeDetails) => {
    onChangeChecked({
      name,
      value: details.checked === true,
    });
  };

  return (
    <Container
      className={className}
      name={name}
      checked={checked}
      disabled={disabled}
      invalid={hasError}
      onCheckedChange={handleChangeChecked}
    >
      {children}
      <ArkCheckbox.HiddenInput aria-label={ariaLabel} />
    </Container>
  );
}
