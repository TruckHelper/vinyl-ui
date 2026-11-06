'use client';

import type { ComponentProps, FC } from 'react';

import { Checkbox as ArkCheckbox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type CheckboxLabelProps = Omit<ComponentProps<typeof ArkCheckbox.Label>, 'asChild'>;

export const CheckboxLabel = styled(ArkCheckbox.Label, {
  base: {
    textStyle: 'input.medium-light',
    color: 'text.input',
    _disabled: { color: 'text.disable' },
  },
}) as unknown as FC<CheckboxLabelProps>;
