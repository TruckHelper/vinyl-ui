'use client';

import type { ReactNode } from 'react';

import { Switch as ArkSwitch } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkSwitch.Root, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8',
    cursor: 'pointer',
    _disabled: { cursor: 'not-allowed' },
  },
});

export type SwitchProps = {
  name: string;
  checked: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
  onChangeChecked: ({ name, value }: {
    name: string;
    value: boolean;
  }) => void;
};

export function Switch({
  name,
  checked,
  disabled = false,
  'aria-label': ariaLabel,
  className,
  children,
  onChangeChecked,
}: SwitchProps) {
  const handleChangeChecked = (details: ArkSwitch.CheckedChangeDetails) => {
    onChangeChecked({
      name,
      value: details.checked,
    });
  };

  return (
    <Container
      className={className}
      name={name}
      checked={checked}
      disabled={disabled}
      onCheckedChange={handleChangeChecked}
    >
      {children}
      <ArkSwitch.HiddenInput
        role="switch"
        aria-label={ariaLabel}
      />
    </Container>
  );
}
