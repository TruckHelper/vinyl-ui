'use client';

import type { ComponentProps } from 'react';

import { Switch as ArkSwitch } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export const SwitchLabel = styled(ArkSwitch.Label, {
  base: {
    textStyle: 'input.medium-light',
    color: 'text.input',
    _disabled: { color: 'text.disable' },
  },
});

export type SwitchLabelProps = ComponentProps<typeof SwitchLabel>;
