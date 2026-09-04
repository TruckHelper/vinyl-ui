'use client';

import type { ComponentProps } from 'react';

import { ErrorText } from './ErrorText';
import { Field } from './Field';
import { Input } from './Input';
import { Label } from './Label';

export type TextFieldProps = Omit<ComponentProps<'input'>, 'children'> & {
  label?: string;
  hasError?: boolean;
  errorText?: string;
};

// 설정형 통합형 — props로만 조절, 형태 커스텀은 지원하지 않는다.
// 형태/구조 커스텀은 오픈 프리미티브(Field + Label/Input/ErrorText) 조합 또는 자체 래퍼로.
export function TextField({
  className,
  id,
  label,
  required = false,
  hasError = false,
  disabled = false,
  errorText,
  ...inputProps
}: TextFieldProps) {
  return (
    <Field
      className={className}
      id={id}
      required={required}
      hasError={hasError}
      disabled={disabled}
    >
      {label ? <Label>{label}</Label> : null}
      <Input {...inputProps} />
      <ErrorText>{errorText}</ErrorText>
    </Field>
  );
}
