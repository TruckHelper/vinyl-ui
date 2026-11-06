'use client';

import type { ComponentProps, FC } from 'react';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type SelectIndicatorProps = Omit<ComponentProps<typeof ArkSelect.Indicator>, 'asChild'>;

export const SelectIndicator = styled(ArkSelect.Indicator, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transitionProperty: 'transform',
    transitionDuration: '0.2s',
    _open: {
      transform: 'rotate(180deg)',
    },
  },
}) as unknown as FC<SelectIndicatorProps>;
