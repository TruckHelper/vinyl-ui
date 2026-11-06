'use client';

import type { ComponentProps } from 'react';

import { Accordion as ArkAccordion } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkAccordion.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '32rem',
    '&[data-type=filled]': {
      gap: '8',
    },
  },
});

export type AccordionProps = Omit<ComponentProps<typeof ArkAccordion.Root>, 'asChild'> & {
  type?: 'border' | 'filled';
};

export function Accordion({
  type = 'border',
  ...props
}: AccordionProps) {
  return (
    <Container
      {...props}
      data-type={type}
    />
  );
}
