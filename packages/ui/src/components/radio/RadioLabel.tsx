'use client';

import type { ComponentProps, FC } from 'react';

import { RadioGroup as ArkRadioGroup } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type RadioLabelProps = Omit<ComponentProps<typeof ArkRadioGroup.ItemText>, 'asChild'>;

export const RadioLabel = styled(ArkRadioGroup.ItemText, {
  base: {
    textStyle: 'input.medium-light',
    color: 'text.input',
    _disabled: { color: 'text.disable' },
  },
}) as unknown as FC<RadioLabelProps>;
