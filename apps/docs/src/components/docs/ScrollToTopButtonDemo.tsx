'use client';

import { useState } from 'react';

import { ScrollToTopButton } from '@bigmobility/vinyl-ui/floating-action-button';
import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from '@bigmobility/vinyl-ui/switch';

export default function ScrollToTopButtonDemo() {
  const [disabled, setDisabled] = useState(false);

  const handleChange = ({ value }: { name: string; value: boolean }) => {
    setDisabled(value);
  };

  return (
    <>
      <Switch
        name="disabled"
        checked={disabled}
        onChangeChecked={handleChange}
      >
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>비활성</SwitchLabel>
      </Switch>
      <ScrollToTopButton disabled={disabled} />
    </>
  );
}
