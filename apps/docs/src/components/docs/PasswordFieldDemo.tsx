'use client';

import { useState } from 'react';

import { PasswordField } from '@bigmobility/vinyl-ui/field';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '34rem',
  },
});

type PasswordFieldDemoProps = {
  label?: string;
  name?: string;
  initialValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

export default function PasswordFieldDemo({
  label = '비밀번호',
  name = 'password',
  initialValue = '',
  placeholder,
  required = false,
  disabled = false,
  hasError = false,
  errorMessage,
}: PasswordFieldDemoProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <Frame>
      <PasswordField
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        hasError={hasError}
        errorMessage={errorMessage}
        onChangeValue={({ value: next }) => setValue(next)}
      />
    </Frame>
  );
}
