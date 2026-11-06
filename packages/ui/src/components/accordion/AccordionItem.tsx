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
  },
}) as unknown as FC<AccordionItemProps>;
