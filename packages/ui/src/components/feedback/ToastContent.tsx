'use client';

import type { ComponentProps } from 'react';

import { Toast as ArkToast } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export const ToastContent = styled(ArkToast.Root, {
  base: {
    textStyle: 'body.medium-normal',
    left: '0',
    right: '0',
    width: '100%',
    marginInline: 'auto',
    paddingBlock: '12',
    paddingInline: '16',
    borderRadius: '8',
    backgroundColor: 'layout.emphasis-dark',
    color: 'text.default-light',
    textAlign: 'center',
    boxShadow: 'toast',
    translate: 'var(--x) var(--y)',
    scale: 'var(--scale)',
    zIndex: 'var(--z-index)',
    height: 'var(--height)',
    opacity: 'var(--opacity)',
    willChange: 'translate, opacity, scale',
    transitionProperty: 'translate, scale, opacity, height',
    transitionDuration: '0.3s',
    '&[data-state=closed]': {
      transitionDuration: '0.2s',
    },
    '&[data-align=start]': {
      marginInlineEnd: 'auto',
      marginInlineStart: '0',
    },
    '&[data-align=end]': {
      marginInlineStart: 'auto',
      marginInlineEnd: '0',
    },
  },
});

export type ToastContentProps = ComponentProps<typeof ToastContent>;
