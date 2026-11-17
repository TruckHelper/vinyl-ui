'use client';

import { useState } from 'react';

import {
  Radio,
  RadioControl,
  RadioGroup,
  RadioLabel,
} from '@bigmobility/vinyl-ui/radio';

type RadioDemoProps = {
  disabled?: boolean;
  hasError?: boolean;
  disabledItem?: boolean;
  hideLabel?: boolean;
  initialValue?: string;
};

const OPTIONS = [
  {
    value: 'card',
    label: '카드 결제',
  },
  {
    value: 'transfer',
    label: '계좌 이체',
  },
  {
    value: 'phone',
    label: '휴대폰 결제',
  },
];

export default function RadioDemo({
  disabled = false,
  hasError = false,
  disabledItem = false,
  hideLabel = false,
  initialValue = '',
}: RadioDemoProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = ({ value: next }: { name: string; value: string }) => {
    setValue(next);
  };

  return (
    <RadioGroup
      name="payment"
      value={value}
      disabled={disabled}
      hasError={hasError}
      aria-label="결제 수단"
      onChangeValue={handleChange}
    >
      {OPTIONS.map((option, index) => (
        <Radio
          key={option.value}
          value={option.value}
          disabled={disabledItem && index === OPTIONS.length - 1}
          aria-label={hideLabel ? option.label : undefined}
        >
          <RadioControl />
          {hideLabel ? null : <RadioLabel>{option.label}</RadioLabel>}
        </Radio>
      ))}
    </RadioGroup>
  );
}
