'use client';

import type { ComponentProps, FC } from 'react';

import { Dialog as ArkDialog } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type ModalTitleProps = Omit<ComponentProps<typeof ArkDialog.Title>, 'asChild'>;

export const ModalTitle = styled(ArkDialog.Title, {
  base: {
    color: 'text.heading',
    textStyle: {
      base: 'heading.large-bold',
      tablet: 'heading.small-bold',
    },
  },
}) as unknown as FC<ModalTitleProps>;
