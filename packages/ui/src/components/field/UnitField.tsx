'use client';

import type { ChangeEvent, PointerEvent, Ref } from 'react';
import { useRef } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { createErrorId } from './utils';

import { Field } from './Field';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

const Control = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12',
    paddingInline: '12',
    width: '100%',
    height: 'input-height',
    border: '1px solid',
    borderRadius: '8',
    borderColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: { borderColor: 'layout.strong-line' },
    _focusWithin: { borderColor: 'layout.strong-line' },
    _invalid: {
      backgroundColor: 'layout.bg-issue',
      borderColor: 'layout.issue-line',
      _hover: { borderColor: 'layout.issue-line' },
      _focusWithin: { borderColor: 'layout.issue-line' },
    },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      borderColor: 'layout.default-line',
      cursor: 'not-allowed',
      _hover: { borderColor: 'layout.default-line' },
      _invalid: {
        backgroundColor: 'layout.bg-disable',
        borderColor: 'layout.default-line',
      },
    },
  },
});

const StyledInput = styled('input', {
  base: {
    textStyle: 'input.medium-light',
    flex: '1',
    minWidth: '0',
    height: '100%',
    padding: '0',
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

const Unit = styled('span', {
  base: {
    textStyle: 'input.medium-light',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  variants: {
    state: {
      empty: { color: 'text.input-soft' },
      filled: { color: 'text.input' },
      disabled: { color: 'text.disable' },
    },
  },
});

function getUnitState({ value, disabled }: {
  value: string;
  disabled: boolean;
}) {
  if (disabled) {
    return 'disabled';
  }

  return value ? 'filled' : 'empty';
}

export type UnitFieldProps = {
  label?: string;
  name: string;
  value: string;
  unit: string;
  inputMode?: 'text' | 'numeric' | 'decimal';
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  onChangeValue: ({ name, value }: {
    name: string;
    value: string;
  }) => void;
  ref?: Ref<HTMLInputElement>;
};

export function UnitField({
  label,
  name,
  value,
  unit,
  inputMode = 'text',
  required = false,
  disabled = false,
  placeholder,
  hasError = false,
  errorMessage,
  className,
  onChangeValue,
  ref,
}: UnitFieldProps) {
  const id = `input-${name}`;
  const unitId = `${id}-unit`;
  const isInvalid = hasError || !!errorMessage;
  const describedBy = isInvalid ? `${unitId} ${createErrorId(id)}` : unitId;

  const inputRef = useRef<HTMLInputElement>(null);

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;

    if (typeof ref === 'function') {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.target === inputRef.current) {
      return;
    }

    event.preventDefault();
    inputRef.current?.focus();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeValue({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <Field
      className={className}
      id={id}
      required={required}
      hasError={isInvalid}
      disabled={disabled}
    >
      {label ? (
        <Label>
          {label}
        </Label>
      ) : null}
      <Control
        data-invalid={isInvalid || undefined}
        data-disabled={disabled || undefined}
        onPointerDown={handlePointerDown}
      >
        <StyledInput
          ref={setInputRef}
          id={id}
          type="text"
          inputMode={inputMode}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete="off"
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
        />
        <Unit
          id={unitId}
          state={getUnitState({ value, disabled })}
        >
          {unit}
        </Unit>
      </Control>
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </Field>
  );
}
