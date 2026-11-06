'use client';

import { useId, useState } from 'react';

import {
  Radio,
  RadioControl,
  RadioGroup,
  RadioLabel,
} from '@bigmobility/vinyl-ui/radio';

type RadioDemoProps = {
  disabled?: boolean;
  hasError?: boolean;
  errorValue?: string;
  disabledItem?: boolean;
  hideLabel?: boolean;
  initialValue?: string;
};

const OPTIONS = [
  {
    value: 'option1',
    label: '선택1',
  },
  {
    value: 'option2',
    label: '선택2',
  },
  {
    value: 'option3',
    label: '선택3',
  },
];

export default function RadioDemo({
  disabled = false,
  hasError = false,
  errorValue,
  disabledItem = false,
  hideLabel = false,
  initialValue = '',
}: RadioDemoProps) {
  const name = useId();
  const [value, setValue] = useState(initialValue);

  const handleChange = ({ value: next }: { name: string; value: string }) => {
    setValue(next);
  };

  return (
    <RadioGroup
      name={name}
      value={value}
      disabled={disabled}
      hasError={hasError}
      aria-label="선택 항목"
      onChangeValue={handleChange}
    >
      {OPTIONS.map((option, index) => (
        <Radio
          key={option.value}
          value={option.value}
          hasError={option.value === errorValue}
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
