'use client';

import { useState } from 'react';

import { UnitField } from '@bigmobility/vinyl-ui/field';
import type { IconName } from '@bigmobility/vinyl-ui/icon';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '32rem',
  },
});

type UnitFieldDemoProps = {
  label?: string;
  name?: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  unit?: string;
  icon?: IconName;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
};

export default function UnitFieldDemo({
  label = '적재 중량',
  name = 'weight',
  type = 'text',
  unit,
  icon,
  placeholder,
  required = false,
  disabled = false,
  errorMessage,
}: UnitFieldDemoProps) {
  const [value, setValue] = useState('');

  return (
    <Frame>
      <UnitField
        name={name}
        label={label}
        type={type}
        value={value}
        unit={unit}
        icon={icon}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        errorMessage={errorMessage}
        onChangeField={({ value }) => setValue(value)}
      />
    </Frame>
  );
}
