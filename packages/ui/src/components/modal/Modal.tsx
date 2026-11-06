'use client';

import type { ReactNode } from 'react';

import { Dialog as ArkDialog, Portal } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Backdrop = styled(ArkDialog.Backdrop, {
  base: {
    position: 'fixed',
    inset: '0',
    zIndex: 'modal',
    backgroundColor: 'layout.bg-layer',
  },
});

const Positioner = styled(ArkDialog.Positioner, {
  base: {
    position: 'fixed',
    inset: '0',
    zIndex: 'modal',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16',
  },
});

const Container = styled(ArkDialog.Content, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '28rem',
    maxHeight: '100%',
    borderRadius: '16',
    backgroundColor: 'layout.bg-light',
    boxShadow: 'toast',
    overflow: 'auto',
    outline: 'none',
  },
});

export type ModalProps = {
  open: boolean;
  className?: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({
  open,
  className,
  children,
  onClose,
}: ModalProps) {
  const handleOpenChange = (details: ArkDialog.OpenChangeDetails) => {
    if (!details.open) {
      onClose();
    }
  };

  return (
    <ArkDialog.Root
      open={open}
      lazyMount
      unmountOnExit
      onOpenChange={handleOpenChange}
    >
      <Portal>
        <Backdrop />
        <Positioner>
          <Container className={className}>
            {children}
          </Container>
        </Positioner>
      </Portal>
    </ArkDialog.Root>
  );
}
