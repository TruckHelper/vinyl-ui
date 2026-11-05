'use client';

import { useState } from 'react';

import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from '@bigmobility/vinyl-ui/switch';

type SwitchDemoProps = {
  label?: string;
  'aria-label'?: string;
  disabled?: boolean;
  initialChecked?: boolean;
};

export default function SwitchDemo({
  label,
  'aria-label': ariaLabel,
  disabled = false,
  initialChecked = false,
}: SwitchDemoProps) {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = ({ value }: { name: string; value: boolean }) => {
    setChecked(value);
  };

  return (
    <Switch
      name="alarm"
      checked={checked}
      disabled={disabled}
      aria-label={ariaLabel}
      onChangeChecked={handleChange}
    >
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      {label ? <SwitchLabel>{label}</SwitchLabel> : null}
    </Switch>
  );
}
