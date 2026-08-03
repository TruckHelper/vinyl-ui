'use client';

import type { ComponentProps } from 'react';

import { Accordion as ArkAccordion } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

import { AccordionItemIndicator } from './AccordionItemIndicator';

import { Icon } from '../icon/Icon';

const Container = styled(ArkAccordion.ItemTrigger, {
  base: {
    textStyle: 'body.large-normal',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12',
    padding: '16',
    width: '100%',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'layout.default-line',
    color: 'text.strong',
    textAlign: 'left',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

type AccordionItemTriggerProps = ComponentProps<typeof Container> & {
  hasIndicator?: boolean;
};

export function AccordionItemTrigger({
  children,
  hasIndicator = true,
  ...props
}: AccordionItemTriggerProps) {
  return (
    <Container {...props}>
      {children}
      {hasIndicator && (
        <AccordionItemIndicator>
          <Icon name="chevron-down" />
        </AccordionItemIndicator>
      )}
    </Container>
  );
}
