'use client';

import type { ReactNode } from 'react';
import { useId } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { createErrorId } from './utils';

import { FieldGroupContextProvider } from './FieldGroupContext';

const Container = styled('fieldset', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    margin: '0',
    padding: '0',
    border: 'none',
    minWidth: '0',
    width: '100%',
  },
});

export type FieldGroupProps = {
  className?: string;
  id?: string;
  required?: boolean;
  hasError?: boolean;
  disabled?: boolean;
  children?: ReactNode;
};

export function FieldGroup({
  className,
  id,
  required = false,
  hasError = false,
  disabled = false,
  children,
}: FieldGroupProps) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const errorId = createErrorId(groupId);

  const contextValue = { errorId, required, hasError, disabled };

  return (
    <FieldGroupContextProvider value={contextValue}>
      <Container
        className={className}
        id={groupId}
        data-invalid={hasError || undefined}
        data-disabled={disabled || undefined}
      >
        {children}
      </Container>
    </FieldGroupContextProvider>
  );
}
