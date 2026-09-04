'use client';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export const SelectGroupLabel = styled(ArkSelect.ItemGroupLabel, {
  base: {
    textStyle: 'body.medium-bold',
    paddingInline: '12',
    paddingBlock: '8',
    color: 'text.soft',
  },
});