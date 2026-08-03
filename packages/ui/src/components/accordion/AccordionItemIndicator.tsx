'use client';

import { Accordion as ArkAccordion } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

export const AccordionItemIndicator = styled(ArkAccordion.ItemIndicator, {
  base: {
    fontSize: '2rem',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    transitionProperty: 'transform',
    transitionDuration: '0.2s',
    _open: {
      transform: 'rotate(180deg)',
    },
  },
});
