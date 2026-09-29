'use client';

import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { useInputGroupContext } from './InputGroupContext';
import { useInputState } from './useInputState';

const StyledInput = styled('input', {
  base: {
    textStyle: 'input.medium-light',
    flex: 1,
    minWidth: 0,
    height: '100%',
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    color: 'text.input',
    outline: 'none',
    _placeholder: { color: 'text.input-soft' },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

export type InputGroupInputProps = Omit<ComponentProps<'input'>, 'children'> & {
  hasError?: boolean;
};

export function InputGroupInput({
  id,
  type = 'text',
  hasError,
  disabled,
  required,
  className,
  ref,
  ...props
}: InputGroupInputProps) {
  const group = useInputGroupContext();

  const state = useInputState({ id, hasError, disabled, required, group });

  return (
    <StyledInput
      ref={ref}
      className={className}
      type={type}
      id={state.id}
      disabled={state.disabled}
      required={state.required}
      aria-invalid={state.hasError || undefined}
      aria-describedby={state.describedBy}
      {...props}
    />
  );
}
