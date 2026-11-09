'use client';

import { useState } from 'react';

import type { DateRangeValue } from '@bigmobility/vinyl-ui/date-picker';
import { DateRangePicker } from '@bigmobility/vinyl-ui/date-picker';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '34rem',
  },
});

type DateRangePickerDemoProps = {
  name?: string;
  label?: string;
  initialValue?: DateRangeValue;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
};

export default function DateRangePickerDemo({
  name = 'period',
  label = '기간',
  initialValue = ['', ''],
  required = false,
  disabled = false,
  errorMessage,
}: DateRangePickerDemoProps) {
  const [value, setValue] = useState<DateRangeValue>(initialValue);

  return (
    <Frame>
      <DateRangePicker
        name={name}
        label={label}
        value={value}
        required={required}
        disabled={disabled}
        errorMessage={errorMessage}
        onChangeValue={({ value }) => setValue(value)}
      />
    </Frame>
  );
}
