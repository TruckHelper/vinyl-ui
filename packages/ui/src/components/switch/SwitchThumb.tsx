'use client';

import type { ComponentProps, FC } from 'react';

import { Switch as ArkSwitch } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type SwitchThumbProps = Omit<ComponentProps<typeof ArkSwitch.Thumb>, 'asChild'>;

export const SwitchThumb = styled(ArkSwitch.Thumb, {
  base: {
    flexShrink: 0,
    width: 'calc(50% - 0.2rem)',
    aspectRatio: '1',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'layout.default-line',
    borderRadius: 'full',
    backgroundColor: 'layout.bg-light',
    boxShadow: 'floating',
    transitionProperty: 'transform',
    transitionDuration: '0.2s',
    '&[data-state=checked]': {
      borderColor: 'transparent',
      transform: 'translateX(calc(100% + 0.4rem))',
    },
    _disabled: {
      borderColor: 'layout.default-line',
      backgroundColor: 'text.disable',
    },
    '&[data-disabled][data-state=checked]': {
      borderColor: 'layout.default-line',
    },
  },
}) as unknown as FC<SwitchThumbProps>;
