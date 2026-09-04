'use client';

import type { ReactNode } from 'react';
import { useId } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { FieldContextProvider } from './FieldContext';

const Container = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    width: '100%',
  },
});

export type FieldProps = {
  className?: string;
  id?: string;
  required?: boolean;
  hasError?: boolean;
  disabled?: boolean;
  children?: ReactNode;
};

export function Field({
  className,
  id,
  required = false,
  hasError = false,
  disabled = false,
  children,
}: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const contextValue = { inputId, errorId, required, hasError, disabled };

  return (
    <FieldContextProvider value={contextValue}>
      <Container className={className}>
        {children}
      </Container>
    </FieldContextProvider>
  );
}
