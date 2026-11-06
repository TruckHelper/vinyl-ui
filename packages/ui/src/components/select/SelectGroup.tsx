'use client';

import type { ComponentProps, FC } from 'react';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type SelectGroupProps = Omit<ComponentProps<typeof ArkSelect.ItemGroup>, 'asChild'>;

export const SelectGroup = styled(ArkSelect.ItemGroup, {
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
}) as unknown as FC<SelectGroupProps>;
