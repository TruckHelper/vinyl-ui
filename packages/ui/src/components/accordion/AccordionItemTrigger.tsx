'use client';

import type { ComponentProps } from 'react';

import { Accordion as ArkAccordion } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { AccordionItemIndicator } from './AccordionItemIndicator';

import { Icon } from '../icon/Icon';

const Container = styled(ArkAccordion.ItemTrigger, {
  base: {
    textStyle: 'body.medium-normal',
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
    '[data-type=filled] > [data-part=item] > &': {
      borderBottomWidth: '0',
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

export type AccordionItemTriggerProps = Omit<ComponentProps<typeof ArkAccordion.ItemTrigger>, 'asChild'> & {
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
