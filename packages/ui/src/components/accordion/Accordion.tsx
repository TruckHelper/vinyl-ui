'use client';

import { Accordion as ArkAccordion } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

export const Accordion = styled(ArkAccordion.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '32rem',
  },
});
