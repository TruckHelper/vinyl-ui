'use client';

import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { createErrorId } from './utils';

import { useFieldContext } from './FieldContext';
import { useFieldGroupContext } from './FieldGroupContext';

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
  ref,
  ...props
}: InputProps) {
  const field = useFieldContext();
  const groupContext = useFieldGroupContext();
  const group = field ? null : groupContext;

  const resolvedId = id ?? field?.inputId;
  const resolvedHasError = hasError ?? field?.hasError ?? group?.hasError ?? false;
  const resolvedDisabled = disabled ?? field?.disabled ?? group?.disabled ?? false;
  const resolvedRequired = required ?? field?.required ?? group?.required ?? false;
  const errorId = group ? group.errorId : resolvedId && createErrorId(resolvedId);
  const describedBy = resolvedHasError && errorId ? errorId : undefined;

  return (
    <StyledInput
      ref={ref}
      className={className}
      type={type}
      id={resolvedId}
      hasError={resolvedHasError}
      disabled={resolvedDisabled}
      required={resolvedRequired}
      aria-invalid={resolvedHasError || undefined}
      aria-describedby={describedBy}
      {...props}
    />
  );
}
