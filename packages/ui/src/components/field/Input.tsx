'use client';

import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { useFieldContext } from './FieldContext';

const StyledInput = styled('input', {
  base: {
    textStyle: 'input.medium-light',
    paddingInline: '12',
    width: '100%',
    height: 'input-height',
    border: '1px solid',
    borderRadius: '8',
    borderColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light',
    color: 'text.input',
    outline: 'none',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _placeholder: { color: 'text.input-soft' },
    _hover: { borderColor: 'layout.strong-line' },
    _focus: { borderColor: 'layout.strong-line' },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      borderColor: 'layout.default-line',
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
  variants: {
    hasError: {
      true: {
        backgroundColor: 'layout.bg-issue',
        borderColor: 'layout.issue-line',
        _hover: { borderColor: 'layout.issue-line' },
        _focus: { borderColor: 'layout.issue-line' },
      },
    },
  },
});

export type InputProps = Omit<ComponentProps<'input'>, 'children'> & {
  hasError?: boolean;
};

export function Input({
  id,
  type = 'text',
  hasError,
  disabled,
  required,
  className,
  ...props
}: InputProps) {
  const field = useFieldContext();

  const resolvedId = id ?? field?.inputId;
  const resolvedHasError = hasError ?? field?.hasError ?? false;
  const resolvedDisabled = disabled ?? field?.disabled ?? false;
  const resolvedRequired = required ?? field?.required ?? false;
  const describedBy = resolvedHasError ? field?.errorId : undefined;

  return (
    <StyledInput
      {...props}
      className={className}
      type={type}
      id={resolvedId}
      hasError={resolvedHasError}
      disabled={resolvedDisabled}
      required={resolvedRequired}
      aria-invalid={resolvedHasError || undefined}
      aria-describedby={describedBy}
    />
  );
}
