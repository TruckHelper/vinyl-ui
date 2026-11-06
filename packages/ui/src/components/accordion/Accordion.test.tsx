import type { ComponentProps } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';
import { AccordionItemContent } from './AccordionItemContent';
import { AccordionItemTrigger } from './AccordionItemTrigger';

const context = describe;

function renderAccordion(props: ComponentProps<typeof Accordion> = {}) {
  return render((
    <Accordion {...props}>
      <AccordionItem value="delivery">
        <AccordionItemTrigger>배송 안내</AccordionItemTrigger>
        <AccordionItemContent>주문 후 2~3일 내 발송됩니다.</AccordionItemContent>
      </AccordionItem>
    </Accordion>
  ));
}

describe('Accordion', () => {
  it('renders trigger button', () => {
    renderAccordion();

    expect(screen.getByRole('button', { name: '배송 안내' })).toBeInTheDocument();
  });

  context('when accordion item is closed', () => {
    it('expands the item and listens for button click event', async () => {
      renderAccordion({ collapsible: true });

      const trigger = screen.getByRole('button', { name: '배송 안내' });

      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      fireEvent.focus(trigger);
      fireEvent.click(trigger);

      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    });
  });

  context('when accordion item is opened', () => {
    it('collapses the item when the trigger is clicked again', async () => {
      renderAccordion({ collapsible: true });

      const trigger = screen.getByRole('button', { name: '배송 안내' });

      fireEvent.focus(trigger);
      fireEvent.click(trigger);
      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));

      fireEvent.click(trigger);
      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    });
  });

  context('with default value', () => {
    it('is expanded initially', () => {
      renderAccordion({ defaultValue: ['delivery'] });

      expect(screen.getByRole('button', { name: '배송 안내' }))
        .toHaveAttribute('aria-expanded', 'true');
    });
  });

  context('without variant', () => {
    it('uses the border variant', () => {
      renderAccordion();

      expect(screen.getByRole('button', { name: '배송 안내' }).closest('[data-part=root]'))
        .toHaveAttribute('data-variant', 'border');
    });
  });

  context('with filled variant', () => {
    it('marks the root as filled and keeps toggling', async () => {
      renderAccordion({ variant: 'filled', collapsible: true });

      const trigger = screen.getByRole('button', { name: '배송 안내' });

      expect(trigger.closest('[data-part=root]')).toHaveAttribute('data-variant', 'filled');

      fireEvent.focus(trigger);
      fireEvent.click(trigger);

      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    });
  });

  context('when arrow down key is pressed on a trigger', () => {
    it('moves focus to the next trigger', async () => {
      render((
        <Accordion variant="filled">
          <AccordionItem value="delivery">
            <AccordionItemTrigger>배송 안내</AccordionItemTrigger>
            <AccordionItemContent>주문 후 2~3일 내 발송됩니다.</AccordionItemContent>
          </AccordionItem>
          <AccordionItem value="refund">
            <AccordionItemTrigger>환불 정책</AccordionItemTrigger>
            <AccordionItemContent>수령 후 7일 이내 교환·환불이 가능합니다.</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      ));

      const first = screen.getByRole('button', { name: '배송 안내' });

      first.focus();
      fireEvent.focus(first);
      fireEvent.keyDown(first, { key: 'ArrowDown' });

      await waitFor(() => expect(screen.getByRole('button', { name: '환불 정책' })).toHaveFocus());
    });
  });

  context('when the item is disabled', () => {
    it('disables the trigger', () => {
      render((
        <Accordion>
          <AccordionItem
            value="delivery"
            disabled
          >
            <AccordionItemTrigger>배송 안내</AccordionItemTrigger>
            <AccordionItemContent>주문 후 2~3일 내 발송됩니다.</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      ));

      const trigger = screen.getByRole('button', { name: '배송 안내' });

      expect(trigger).toBeDisabled();

      fireEvent.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
