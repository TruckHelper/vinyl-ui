'use client';

import type { ComponentProps } from 'react';

import { Switch as ArkSwitch } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export const SwitchControl = styled(ArkSwitch.Control, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    width: '4.8rem',
    aspectRatio: '2 / 1',
    padding: '0.1rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'layout.default-line',
    borderRadius: 'full',
    backgroundColor: 'layout.bg-light-gray',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    '&[data-focus-visible]': {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    '&[data-state=checked]': {
      borderColor: 'layout.primary',
      backgroundColor: 'layout.primary',
    },
    _disabled: {
      borderColor: 'layout.default-line',
      backgroundColor: 'layout.bg-disable',
    },
    '&[data-disabled][data-state=checked]': {
      borderColor: 'layout.default-line',
      backgroundColor: 'layout.bg-disable',
    },
  },
});

export type SwitchControlProps = ComponentProps<typeof SwitchControl>;
