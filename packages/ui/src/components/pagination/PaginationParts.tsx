'use client';

import { Pagination as ArkPagination } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: '8',
  backgroundColor: 'transparent',
  color: 'text.soft',
  cursor: 'pointer',
  transitionProperty: 'background-color, color',
  transitionDuration: '0.3s',
  _hover: {
    backgroundColor: 'layout.bg-light-gray',
  },
  _active: {
    backgroundColor: 'layout.primary-subtle',
    color: 'text.accent-primary',
  },
  _disabled: {
    backgroundColor: 'layout.bg-disable',
    color: 'text.disable',
    cursor: 'not-allowed',
  },
} as const;

const iconButtonStyle = {
  ...buttonStyle,
  fontSize: '2rem',
} as const;

export const PrevTriggerContainer = styled(ArkPagination.PrevTrigger, {
  base: iconButtonStyle,
});

export const NextTriggerContainer = styled(ArkPagination.NextTrigger, {
  base: iconButtonStyle,
});

export const GroupJumpTriggerContainer = styled('button', {
  base: iconButtonStyle,
});

export const ItemContainer = styled(ArkPagination.Item, {
  base: {
    ...buttonStyle,
    textStyle: 'button.small-normal',
    '&[data-selected]': {
      backgroundColor: 'layout.primary-subtle',
      color: 'text.accent-primary',
    },
  },
});
