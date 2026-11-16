import { act, fireEvent, render, screen } from '@testing-library/react';

import { ScrollToTopButton } from './ScrollToTopButton';

const context = describe;

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true });
  act(() => {
    fireEvent.scroll(window);
  });
}

describe('ScrollToTopButton', () => {
  const scrollToMock = jest.fn();

  beforeEach(() => {
    scrollToMock.mockReset();
    window.scrollTo = scrollToMock;
    scrollTo(0);
  });

  context('after scrolling past the threshold', () => {
    it('renders button', () => {
      render(<ScrollToTopButton />);

      scrollTo(500);

      expect(screen.getByRole('button', { name: '맨 위로 이동' })).toBeInTheDocument();
    });
  });

  context('when disabled', () => {
    it('does not listens for click event', () => {
      render(<ScrollToTopButton disabled />);

      scrollTo(500);

      const button = screen.getByRole('button', { name: '맨 위로 이동' });

      expect(button).toBeDisabled();

      fireEvent.click(button);

      expect(scrollToMock).not.toHaveBeenCalled();
    });
  });
});
