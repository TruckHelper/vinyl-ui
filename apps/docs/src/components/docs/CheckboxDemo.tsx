'use client';

import { useState } from 'react';

import { Checkbox, CheckboxControl, CheckboxLabel } from '@bigmobility/vinyl-ui/checkbox';

type CheckboxDemoProps = {
  label?: string;
  'aria-label'?: string;
  disabled?: boolean;
  hasError?: boolean;
  initialChecked?: boolean;
};

export default function CheckboxDemo({
  label,
  'aria-label': ariaLabel,
  disabled = false,
  hasError = false,
  initialChecked = false,
}: CheckboxDemoProps) {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = ({ value }: { name: string; value: boolean }) => {
    setChecked(value);
  };

  return (
    <Checkbox
      name="terms"
      checked={checked}
      disabled={disabled}
      hasError={hasError}
      aria-label={ariaLabel}
      onChangeChecked={handleChange}
    >
      <CheckboxControl />
      {label ? <CheckboxLabel>{label}</CheckboxLabel> : null}
    </Checkbox>
  );
}
