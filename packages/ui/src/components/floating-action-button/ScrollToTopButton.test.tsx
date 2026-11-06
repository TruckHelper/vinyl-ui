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

  context('before scrolling past the threshold', () => {
    it('is not exposed to the accessibility tree', () => {
      render(<ScrollToTopButton />);

      expect(screen.queryByRole('button', { name: '맨 위로 이동' })).not.toBeInTheDocument();
    });

    it('is removed from the tab order', () => {
      render(<ScrollToTopButton />);

      expect(screen.getByRole('button', { hidden: true })).toHaveAttribute('tabindex', '-1');
    });
  });

  context('after scrolling past the threshold', () => {
    it('can be focused with the keyboard', () => {
      render(<ScrollToTopButton />);

      scrollTo(500);

      const button = screen.getByRole('button', { name: '맨 위로 이동' });

      expect(button).not.toHaveAttribute('tabindex');

      act(() => {
        button.focus();
      });

      expect(button).toHaveFocus();
    });

    it('releases focus when it hides again', () => {
      render(<ScrollToTopButton />);

      scrollTo(500);

      const button = screen.getByRole('button', { name: '맨 위로 이동' });

      act(() => {
        button.focus();
      });

      fireEvent.click(button);
      scrollTo(0);

      expect(button).toHaveAttribute('aria-hidden', 'true');
      expect(button).not.toHaveFocus();
    });

    it('is a non-submitting button', () => {
      render(<ScrollToTopButton />);

      scrollTo(500);

      expect(screen.getByRole('button', { name: '맨 위로 이동' })).toHaveAttribute('type', 'button');
    });

    it('shows the button with a chevron-up icon', () => {
      render(<ScrollToTopButton />);

      scrollTo(301);

      expect(screen.getByRole('button', { name: '맨 위로 이동' })).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'chevron-up');
    });

    it('scrolls to the top on click', () => {
      render(<ScrollToTopButton />);

      scrollTo(500);
      fireEvent.click(screen.getByRole('button', { name: '맨 위로 이동' }));

      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('hides again when scrolling back up', () => {
      render(<ScrollToTopButton />);

      scrollTo(500);

      expect(screen.getByRole('button', { name: '맨 위로 이동' })).toBeInTheDocument();

      scrollTo(0);

      expect(screen.queryByRole('button', { name: '맨 위로 이동' })).not.toBeInTheDocument();
    });

    it('uses the behavior prop', () => {
      render(<ScrollToTopButton behavior="instant" />);

      scrollTo(500);
      fireEvent.click(screen.getByRole('button', { name: '맨 위로 이동' }));

      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
    });

    it('does not scroll when onClick prevents default', () => {
      render(<ScrollToTopButton onClick={(event) => event.preventDefault()} />);

      scrollTo(500);
      fireEvent.click(screen.getByRole('button', { name: '맨 위로 이동' }));

      expect(scrollToMock).not.toHaveBeenCalled();
    });

    context('with prefers-reduced-motion', () => {
      const original = window.matchMedia;

      beforeEach(() => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;
      });

      afterEach(() => {
        window.matchMedia = original;
      });

      it('scrolls with behavior auto', () => {
        render(<ScrollToTopButton />);

        scrollTo(500);
        fireEvent.click(screen.getByRole('button', { name: '맨 위로 이동' }));

        expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
      });
    });

    it('respects a custom threshold', () => {
      render(<ScrollToTopButton threshold={600} />);

      scrollTo(500);

      expect(screen.queryByRole('button', { name: '맨 위로 이동' })).not.toBeInTheDocument();
    });
  });

  context('when disabled', () => {
    it('does not scroll on click', () => {
      render(<ScrollToTopButton disabled />);

      scrollTo(500);

      const button = screen.getByRole('button', { name: '맨 위로 이동' });

      expect(button).toBeDisabled();

      fireEvent.click(button);

      expect(scrollToMock).not.toHaveBeenCalled();
    });
  });

  context('with custom props', () => {
    it('supports a custom aria-label and calls onClick before scrolling', () => {
      const handleClick = jest.fn();

      render((
        <ScrollToTopButton
          aria-label="Top"
          onClick={handleClick}
        />
      ));

      scrollTo(500);
      fireEvent.click(screen.getByRole('button', { name: 'Top' }));

      expect(handleClick).toHaveBeenCalled();
      expect(scrollToMock).toHaveBeenCalled();
    });
  });

  it('removes the same scroll listener on unmount', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollToTopButton />);

    const added = addSpy.mock.calls.find(([type]) => type === 'scroll');

    unmount();

    expect(added).toBeDefined();
    expect(removeSpy).toHaveBeenCalledWith('scroll', added?.[1]);

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
