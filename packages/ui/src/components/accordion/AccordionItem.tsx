'use client';

import { Accordion as ArkAccordion } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

export const AccordionItem = styled(ArkAccordion.Item, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});
