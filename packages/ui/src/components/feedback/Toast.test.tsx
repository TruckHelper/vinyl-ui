import { StrictMode, useState } from 'react';

import { act, render, screen } from '@testing-library/react';

import { Toast } from './Toast';
import { ToastContent } from './ToastContent';

const context = describe;

type ToastExampleProps = {
  initialOpen?: boolean;
  duration?: number;
  placement?: 'top' | 'bottom';
  align?: 'left' | 'center' | 'right';
  onClose?: () => void;
};

function ToastExample({
  initialOpen = false,
  duration,
  placement,
  align,
  onClose = jest.fn(),
}: ToastExampleProps) {
  const [open, setOpen] = useState(initialOpen);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
      >
        열기
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
      >
        닫기
      </button>
      <Toast
        open={open}
        duration={duration}
        placement={placement}
        align={align}
        onClose={handleClose}
      >
        <ToastContent>저장되었습니다</ToastContent>
      </Toast>
    </>
  );
}

describe('Toast', () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  context('when closed', () => {
    it('does not render toast content', () => {
      render(<ToastExample />);

      expect(screen.queryByText('저장되었습니다')).not.toBeInTheDocument();
    });
  });

  context('when opened', () => {
    it('renders toast content as status', async () => {
      render(<ToastExample />);

      act(() => {
        screen.getByRole('button', { name: '열기' }).click();
      });

      expect(await screen.findByRole('status')).toHaveTextContent('저장되었습니다');
    });

    it('calls onClose after duration', async () => {
      render(
        <ToastExample
          initialOpen
          onClose={handleClose}
        />,
      );

      expect(await screen.findByText('저장되었습니다')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(2900);
      });

      expect(screen.getByText('저장되었습니다')).toBeInTheDocument();
      expect(handleClose).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(handleClose).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('저장되었습니다')).not.toBeInTheDocument();
    });

    it('does not call onClose on unmount', async () => {
      const { unmount } = render(
        <ToastExample
          initialOpen
          onClose={handleClose}
        />,
      );

      expect(await screen.findByText('저장되었습니다')).toBeInTheDocument();

      unmount();

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  context('when open becomes false', () => {
    it('closes toast and calls onClose', async () => {
      render(
        <ToastExample
          initialOpen
          onClose={handleClose}
        />,
      );

      expect(await screen.findByText('저장되었습니다')).toBeInTheDocument();

      act(() => {
        screen.getByRole('button', { name: '닫기' }).click();
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.queryByText('저장되었습니다')).not.toBeInTheDocument();
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  context('when open and close happen together', () => {
    it('does not render toast content', async () => {
      render(<ToastExample />);

      act(() => {
        screen.getByRole('button', { name: '열기' }).click();
        screen.getByRole('button', { name: '닫기' }).click();
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.queryByText('저장되었습니다')).not.toBeInTheDocument();
    });
  });

  context('when reopened during close', () => {
    it('renders toast content again', async () => {
      render(<ToastExample initialOpen />);

      expect(await screen.findByText('저장되었습니다')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3050);
      });

      act(() => {
        screen.getByRole('button', { name: '열기' }).click();
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.getByText('저장되었습니다')).toBeInTheDocument();
    });
  });

  context('when reopened after close', () => {
    it('renders toast content again', async () => {
      render(<ToastExample initialOpen />);

      expect(await screen.findByText('저장되었습니다')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(4000);
      });

      expect(screen.queryByText('저장되었습니다')).not.toBeInTheDocument();

      act(() => {
        screen.getByRole('button', { name: '열기' }).click();
      });

      expect(await screen.findByText('저장되었습니다')).toBeInTheDocument();
    });
  });

  context('with duration', () => {
    it('calls onClose after given duration', async () => {
      render(
        <ToastExample
          initialOpen
          duration={5000}
          onClose={handleClose}
        />,
      );

      expect(await screen.findByText('저장되었습니다')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(4900);
      });

      expect(handleClose).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  context('with placement', () => {
    it('renders toast at given placement', async () => {
      render(
        <ToastExample
          initialOpen
          placement="top"
        />,
      );

      expect(await screen.findByRole('status')).toHaveAttribute('data-placement', 'top');
    });
  });

  context('when placement changes while open', () => {
    it('moves toast to new placement and calls onClose once', async () => {
      const { rerender } = render(
        <ToastExample
          initialOpen
          placement="bottom"
          onClose={handleClose}
        />,
      );

      expect(await screen.findByRole('status')).toHaveAttribute('data-placement', 'bottom');

      rerender(
        <ToastExample
          initialOpen
          placement="top"
          onClose={handleClose}
        />,
      );

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(await screen.findByRole('status')).toHaveAttribute('data-placement', 'top');

      act(() => {
        jest.advanceTimersByTime(4000);
      });

      expect(handleClose).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  context('when placement changes while closed', () => {
    it('renders toast at new placement after open', async () => {
      const { rerender } = render(<ToastExample placement="bottom" />);

      rerender(<ToastExample placement="top" />);

      act(() => {
        screen.getByRole('button', { name: '열기' }).click();
      });

      expect(await screen.findByRole('status')).toHaveAttribute('data-placement', 'top');
    });
  });

  context('with StrictMode', () => {
    it('renders single toast', async () => {
      render(
        <StrictMode>
          <ToastExample initialOpen />
        </StrictMode>,
      );

      expect(await screen.findByText('저장되었습니다')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(screen.getAllByRole('status')).toHaveLength(1);
    });
  });

  context('with align', () => {
    it.each([
      { align: 'left', placement: 'top-start', dataAlign: 'start' },
      { align: 'center', placement: 'top', dataAlign: 'center' },
      { align: 'right', placement: 'top-end', dataAlign: 'end' },
    ] as const)('renders toast at $align', async ({ align, placement, dataAlign }) => {
      render(
        <ToastExample
          initialOpen
          placement="top"
          align={align}
        />,
      );

      const toast = await screen.findByRole('status');

      expect(toast).toHaveAttribute('data-placement', placement);
      expect(toast).toHaveAttribute('data-align', dataAlign);
    });
  });

  context('when align changes while open', () => {
    it('moves toast to new align', async () => {
      const { rerender } = render(
        <ToastExample
          initialOpen
          align="center"
        />,
      );

      expect(await screen.findByRole('status')).toHaveAttribute('data-align', 'center');

      rerender(
        <ToastExample
          initialOpen
          align="left"
        />,
      );

      act(() => {
        jest.advanceTimersByTime(500);
      });

      const toast = await screen.findByRole('status');

      expect(toast).toHaveAttribute('data-placement', 'bottom-start');
      expect(toast).toHaveAttribute('data-align', 'start');
    });
  });
});
