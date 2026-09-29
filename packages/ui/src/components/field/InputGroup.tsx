'use client';

import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    width: '100%',
  },
});

export type InputGroupProps = {
  className?: string;
  hasError?: boolean;
  disabled?: boolean;
  children?: ReactNode;
};

export function InputGroup({ className, children }: InputGroupProps) {
  return (
    <Container className={className}>
      {children}
    </Container>
  );
}
