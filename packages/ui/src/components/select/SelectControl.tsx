'use client';

import type { ComponentProps, FC } from 'react';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type SelectControlProps = Omit<ComponentProps<typeof ArkSelect.Control>, 'asChild'>;

export const SelectControl = styled(ArkSelect.Control, {
  base: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
}) as unknown as FC<SelectControlProps>;
