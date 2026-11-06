'use client';

import type { ComponentProps, FC } from 'react';

import { Accordion as ArkAccordion } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type AccordionItemProps = Omit<ComponentProps<typeof ArkAccordion.Item>, 'asChild'>;

export const AccordionItem = styled(ArkAccordion.Item, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '[data-variant=filled] > &': {
      padding: '8',
      borderRadius: '16',
      backgroundColor: 'layout.bg-light-gray',
    },
  },
}) as unknown as FC<AccordionItemProps>;
