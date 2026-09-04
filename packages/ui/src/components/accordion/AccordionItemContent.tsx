'use client';

import { Accordion as ArkAccordion } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export const AccordionItemContent = styled(ArkAccordion.ItemContent, {
  base: {
    textStyle: 'body.medium-light',
    display: 'flex',
    alignItems: 'center',
    padding: '16',
    width: '100%',
    color: 'text.default',
  },
});
