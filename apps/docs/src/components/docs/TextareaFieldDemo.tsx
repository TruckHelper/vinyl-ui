'use client';

import { useState } from 'react';

import { TextareaField } from '@bigmobility/vinyl-ui/field';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '34rem',
  },
});

type TextareaFieldDemoProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  initialValue?: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

export default function TextareaFieldDemo({
  label = '메모',
  name = 'memo',
  placeholder,
  initialValue = '',
  required = false,
  disabled = false,
  hasError = false,
  errorMessage,
}: TextareaFieldDemoProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <Frame>
      <TextareaField
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        hasError={hasError}
        errorMessage={errorMessage}
        onChangeValue={({ value }) => setValue(value)}
      />
    </Frame>
  );
}
