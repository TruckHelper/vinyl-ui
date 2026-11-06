'use client';

import type { ComponentProps, FC } from 'react';

import { Switch as ArkSwitch } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type SwitchLabelProps = Omit<ComponentProps<typeof ArkSwitch.Label>, 'asChild'>;

export const SwitchLabel = styled(ArkSwitch.Label, {
  base: {
    textStyle: 'input.medium-light',
    color: 'text.input',
    _disabled: { color: 'text.disable' },
  },
}) as unknown as FC<SwitchLabelProps>;
