import { useState } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Button } from '../button/Button';

import { Modal } from './Modal';
import { ModalBottomBtn } from './ModalBottomBtn';
import { ModalCloseTrigger } from './ModalCloseTrigger';
import { ModalDescription } from './ModalDescription';
import { ModalHeader } from './ModalHeader';
import { ModalTitle } from './ModalTitle';

const context = describe;

type ModalExampleProps = {
  initialOpen?: boolean;
  hasDescription?: boolean;
  onClose?: () => void;
};

function ModalExample({
  initialOpen = false,
  hasDescription = true,
  onClose = jest.fn(),
}: ModalExampleProps) {
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
      <Modal
        open={open}
        onClose={handleClose}
      >
        <ModalHeader>
          <ModalTitle>배송 안내</ModalTitle>
          {hasDescription && <ModalDescription>2~3일 내 발송됩니다.</ModalDescription>}
          <ModalCloseTrigger />
        </ModalHeader>
        <ModalBottomBtn type="equal">
          <Button
            variant="neutral"
            fit="block"
          >
            취소
          </Button>
          <Button
            fit="block"
            onClick={() => setOpen(false)}
          >
            확인
          </Button>
        </ModalBottomBtn>
      </Modal>
    </>
  );
}

async function waitForFocusInside(dialog: HTMLElement) {
  await waitFor(() => {
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });
}

async function openFromOpener() {
  const opener = screen.getByRole('button', { name: '열기' });

  opener.focus();
  fireEvent.click(opener);

  const dialog = await screen.findByRole('dialog');

  await waitForFocusInside(dialog);

  return {
    opener,
    dialog,
  };
}

async function expectClosed() {
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
}

describe('Modal', () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when open is false', () => {
    it('does not render the dialog', () => {
      render(<ModalExample />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  context('when open becomes true', () => {
    it('renders a modal dialog named by the title and described by the description', async () => {
      render(<ModalExample />);

      fireEvent.click(screen.getByRole('button', { name: '열기' }));

      const dialog = await screen.findByRole('dialog');

      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAccessibleName('배송 안내');
      expect(dialog).toHaveAccessibleDescription('2~3일 내 발송됩니다.');
    });

    it('moves focus into the dialog', async () => {
      render(<ModalExample />);

      const { dialog } = await openFromOpener();

      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    });

    it('locks body scroll until closed', async () => {
      render(<ModalExample />);

      await openFromOpener();

      expect(document.body.style.overflow).toBe('hidden');

      fireEvent.click(screen.getByRole('button', { name: '닫기' }));

      await expectClosed();
      await waitFor(() => {
        expect(document.body.style.overflow).not.toBe('hidden');
      });
    });
  });

  context('when the close button is clicked', () => {
    it('calls onClose, closes the dialog and returns focus to the opener', async () => {
      render(<ModalExample onClose={handleClose} />);

      const { opener } = await openFromOpener();

      fireEvent.click(screen.getByRole('button', { name: '닫기' }));

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
      await expectClosed();
      await waitFor(() => {
        expect(opener).toHaveFocus();
      });
    });
  });

  context('when Escape is pressed', () => {
    it('calls onClose, closes the dialog and returns focus to the opener', async () => {
      render(<ModalExample onClose={handleClose} />);

      const { opener, dialog } = await openFromOpener();

      fireEvent.keyDown(dialog, { key: 'Escape' });

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
      await expectClosed();
      await waitFor(() => {
        expect(opener).toHaveFocus();
      });
    });
  });

  context('when open becomes false from outside', () => {
    it('closes the dialog without calling onClose and returns focus to the opener', async () => {
      render(<ModalExample onClose={handleClose} />);

      const { opener } = await openFromOpener();

      fireEvent.click(screen.getByRole('button', { name: '확인' }));

      await expectClosed();
      await waitFor(() => {
        expect(opener).toHaveFocus();
      });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  context('without description', () => {
    it('renders only the title', async () => {
      render((
        <ModalExample
          initialOpen
          hasDescription={false}
        />
      ));

      expect(await screen.findByRole('dialog')).toHaveAccessibleName('배송 안내');
      expect(screen.queryByText('2~3일 내 발송됩니다.')).not.toBeInTheDocument();
    });
  });

  context('with bottom buttons', () => {
    it('renders the buttons passed as children', async () => {
      render(<ModalExample initialOpen />);

      expect(await screen.findByRole('button', { name: '취소' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
    });
  });
});
