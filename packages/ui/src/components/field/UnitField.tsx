'use client';

import type { ChangeEvent, Ref } from 'react';

import { Field } from './Field';
import { Input } from './Input';
import { InputAddon } from './InputAddon';
import { InputGroup } from './InputGroup';
import { InputUnit } from './InputUnit';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import { Icon, type IconName } from '../icon/Icon';

export type UnitFieldProps = {
  type?: 'text' | 'email' | 'tel' | 'number';
  label?: string;
  name: string;
  value: string;
  unit?: string;
  icon?: IconName;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  onChangeField: (payload: { name: string; value: string }) => void;
  ref?: Ref<HTMLInputElement>;
};

export function UnitField({
  type = 'text',
  label,
  name,
  value,
  unit,
  icon,
  required = false,
  disabled = false,
  placeholder,
  errorMessage,
  className,
  onChangeField,
  ref,
}: UnitFieldProps) {
  const id = `input-${name}`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeField({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <Field
      className={className}
      id={id}
      required={required}
      hasError={!!errorMessage}
      disabled={disabled}
    >
      {label ? (
          <Label>
            {label}
          </Label>)
        : null}
      <InputGroup>
        <Input
          ref={ref}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete="off"
        />
        {unit ? (
          <InputAddon>
            <InputUnit>
              {unit}
            </InputUnit>
          </InputAddon>
        ) : null}
        {icon ? (
          <InputAddon>
            <Icon name={icon} />
          </InputAddon>
        ) : null}
      </InputGroup>
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </Field>
  );
}
