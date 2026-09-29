'use client';

import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { useFieldContext } from './FieldContext';
import { InputGroupContextProvider } from './InputGroupContext';

const Container = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    paddingInline: '12',
    width: '100%',
    height: 'input-height',
    border: '1px solid',
    borderRadius: '8',
    borderColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light',
    color: 'text.input',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: { borderColor: 'layout.strong-line' },
    _focusWithin: { borderColor: 'layout.strong-line' },
    '&[data-invalid]:not([data-disabled])': {
      backgroundColor: 'layout.bg-issue',
      borderColor: 'layout.issue-line',
      _hover: { borderColor: 'layout.issue-line' },
      _focusWithin: { borderColor: 'layout.issue-line' },
    },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      borderColor: 'layout.default-line',
      color: 'text.disable',
      cursor: 'not-allowed',
      _hover: { borderColor: 'layout.default-line' },
      _focusWithin: { borderColor: 'layout.default-line' },
    },
  },
});

export type InputGroupProps = ComponentProps<'div'> & {
  hasError?: boolean;
  disabled?: boolean;
};

export function InputGroup({
  className,
  hasError,
  disabled,
  children,
  ...props
}: InputGroupProps) {
  const field = useFieldContext();

  const resolvedHasError = hasError ?? field?.hasError ?? false;
  const resolvedDisabled = disabled ?? field?.disabled ?? false;

  const contextValue = { hasError: resolvedHasError, disabled: resolvedDisabled };

  return (
    <InputGroupContextProvider value={contextValue}>
      <Container
        className={className}
        data-invalid={resolvedHasError || undefined}
        data-disabled={resolvedDisabled || undefined}
        {...props}
      >
        {children}
      </Container>
    </InputGroupContextProvider>
  );
}
