'use client';

import type { ChangeEvent, Ref } from 'react';

import { Field } from './Field';
import { Label } from './Label';
import { Textarea } from './Textarea';
import { ErrorMessage } from './ErrorMessage';

export type TextareaFieldProps = {
  label?: string;
  name: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  onChangeValue: ({ name, value }: {
    name: string;
    value: string;
  }) => void;
  ref?: Ref<HTMLTextAreaElement>;
};

export function TextareaField({
  label,
  name,
  value,
  required = false,
  disabled = false,
  hasError = false,
  placeholder,
  errorMessage,
  className,
  onChangeValue,
  ref,
}: TextareaFieldProps) {
  const id = `textarea-${name}`;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue({
      name,
      value: event.target.value,
    });
  };

  return (
    <Field
      className={className}
      id={id}
      required={required}
      hasError={hasError || !!errorMessage}
      disabled={disabled}
    >
      {label ? <Label>{label}</Label> : null}
      <Textarea
        ref={ref}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Field>
  );
}
