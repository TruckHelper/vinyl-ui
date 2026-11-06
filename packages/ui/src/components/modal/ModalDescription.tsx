'use client';

import type { ComponentProps, FC } from 'react';

import { Dialog as ArkDialog } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type ModalDescriptionProps = Omit<ComponentProps<typeof ArkDialog.Description>, 'asChild'>;

export const ModalDescription = styled(ArkDialog.Description, {
  base: {
    color: 'text.soft',
    textStyle: {
      base: 'body.xlarge-bold',
      tablet: 'body.medium-light',
    },
  },
}) as unknown as FC<ModalDescriptionProps>;
