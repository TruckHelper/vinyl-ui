'use client';

import type { ReactNode } from 'react';

import { RadioGroup as ArkRadioGroup } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkRadioGroup.Item, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8',
    cursor: 'pointer',
    _disabled: { cursor: 'not-allowed' },
  },
});

export type RadioProps = {
  value: string;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
};

export function Radio({
  value,
  disabled = false,
  'aria-label': ariaLabel,
  className,
  children,
}: RadioProps) {
  return (
    <Container
      className={className}
      value={value}
      disabled={disabled}
    >
      {children}
      <ArkRadioGroup.ItemHiddenInput aria-label={ariaLabel} />
    </Container>
  );
}
