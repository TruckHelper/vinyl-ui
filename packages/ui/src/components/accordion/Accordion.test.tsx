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
