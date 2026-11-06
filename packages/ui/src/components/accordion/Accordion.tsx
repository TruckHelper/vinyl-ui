'use client';

import type { ComponentProps, FC } from 'react';

import { Accordion as ArkAccordion } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type AccordionProps = Omit<ComponentProps<typeof ArkAccordion.Root>, 'asChild'>;

export const Accordion = styled(ArkAccordion.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '32rem',
  },
}) as unknown as FC<AccordionProps>;
