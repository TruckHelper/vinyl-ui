'use client';

import { useState } from 'react';

import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from '@bigmobility/vinyl-ui/switch';

import { styled } from 'styled-system/jsx';

const WideSwitchControl = styled(SwitchControl, {
  base: { width: '6.4rem' },
});

const TallSwitchControl = styled(SwitchControl, {
  base: { height: '3.2rem', width: 'auto' },
});

export default function SwitchSizeDemo() {
  const [form, setForm] = useState({
    wide: true,
    tall: true,
  });

  const handleChange = ({ name, value }: { name: string; value: boolean }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Switch
        name="wide"
        checked={form.wide}
        onChangeChecked={handleChange}
      >
        <WideSwitchControl>
          <SwitchThumb />
        </WideSwitchControl>
        <SwitchLabel>width로 변경</SwitchLabel>
      </Switch>
      <Switch
        name="tall"
        checked={form.tall}
        onChangeChecked={handleChange}
      >
        <TallSwitchControl>
          <SwitchThumb />
        </TallSwitchControl>
        <SwitchLabel>height로 변경</SwitchLabel>
      </Switch>
    </>
  );
}
