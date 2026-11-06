'use client';

import { useState } from 'react';

import { UnitField } from '@bigmobility/vinyl-ui/field';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '34rem',
  },
});

type UnitFieldDemoProps = {
  label?: string;
  name?: string;
  unit?: string;
  initialValue?: string;
  inputMode?: 'text' | 'numeric' | 'decimal';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
};

export default function UnitFieldDemo({
  label = '무게',
  name = 'weight',
  unit = 'kg',
  initialValue = '',
  inputMode = 'decimal',
  placeholder,
  required = false,
  disabled = false,
  errorMessage,
}: UnitFieldDemoProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <Frame>
      <UnitField
        name={name}
        label={label}
        unit={unit}
        value={value}
        inputMode={inputMode}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        errorMessage={errorMessage}
        onChangeValue={({ value }) => setValue(value)}
      />
    </Frame>
  );
}
