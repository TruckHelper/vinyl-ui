'use client';

import { useState } from 'react';

import { DatePicker } from '@bigmobility/vinyl-ui/date-picker';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '34rem',
  },
});

type DatePickerDemoProps = {
  name?: string;
  label?: string;
  initialValue?: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

export default function DatePickerDemo({
  name = 'startDate',
  label = '시작일',
  initialValue = '',
  required = false,
  disabled = false,
  hasError = false,
  errorMessage,
}: DatePickerDemoProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <Frame>
      <DatePicker
        name={name}
        label={label}
        value={value}
        required={required}
        disabled={disabled}
        hasError={hasError}
        errorMessage={errorMessage}
        onChangeValue={({ value }) => setValue(value)}
      />
    </Frame>
  );
}
