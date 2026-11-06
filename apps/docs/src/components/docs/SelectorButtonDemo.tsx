'use client';

import { useState } from 'react';

import {
  SelectorButton,
  SelectorButtonGroup,
} from '@bigmobility/vinyl-ui/selector-button';

type SelectorButtonDemoProps = {
  multiple?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  disabledItem?: boolean;
  initialValue?: string[];
};

export default function SelectorButtonDemo({
  multiple = false,
  disabled = false,
  hasError = false,
  disabledItem = false,
  initialValue = [],
}: SelectorButtonDemoProps) {
  const [value, setValue] = useState<string[]>(initialValue);

  const handleChange = ({ value: next }: { name: string; value: string[] }) => {
    setValue(next);
  };

  return (
    <SelectorButtonGroup
      name="size"
      value={value}
      multiple={multiple}
      disabled={disabled}
      hasError={hasError}
      aria-label="옵션 선택"
      onChangeValue={handleChange}
    >
      <SelectorButton value="small">Small</SelectorButton>
      <SelectorButton value="medium">Medium</SelectorButton>
      <SelectorButton value="large">Large</SelectorButton>
      <SelectorButton
        value="xlarge"
        disabled={disabledItem}
      >
        XLarge
      </SelectorButton>
    </SelectorButtonGroup>
  );
}
