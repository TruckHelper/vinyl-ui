'use client';

import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { createErrorId } from './utils';

import { useFieldContext } from './FieldContext';

const StyledTextarea = styled('textarea', {
  base: {
    textStyle: 'input.medium-light',
    display: 'block',
    padding: '12',
    width: '100%',
    height: '8rem',
    border: '1px solid',
    borderRadius: '8',
    borderColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light',
    color: 'text.default',
    outline: 'none',
    resize: 'none',
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

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'children'> & {
  hasError?: boolean;
};

export function Textarea({
  id,
  hasError,
  disabled,
  required,
  className,
  ref,
  ...props
}: TextareaProps) {
  const field = useFieldContext();

  const resolvedId = id ?? field?.inputId;
  const resolvedHasError = hasError ?? field?.hasError ?? false;
  const resolvedDisabled = disabled ?? field?.disabled ?? false;
  const resolvedRequired = required ?? field?.required ?? false;
  const describedBy = resolvedHasError && resolvedId ? createErrorId(resolvedId) : undefined;

  return (
    <StyledTextarea
      ref={ref}
      className={className}
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
