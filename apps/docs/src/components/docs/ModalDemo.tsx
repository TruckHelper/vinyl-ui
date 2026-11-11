'use client';

import { useState } from 'react';

import { Button } from '@bigmobility/vinyl-ui/button';
import {
  Modal,
  ModalBottomBtn,
  ModalCloseTrigger,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@bigmobility/vinyl-ui/modal';

type ModalDemoProps = {
  variant?: 'single' | 'equal';
  hasDescription?: boolean;
  label?: string;
};

export default function ModalDemo({
  variant = 'single',
  hasDescription = false,
  label = '모달 열기',
}: ModalDemoProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <ModalHeader>
          <ModalTitle>배송 안내</ModalTitle>
          {hasDescription && <ModalDescription>2~3일 내 발송됩니다.</ModalDescription>}
          <ModalCloseTrigger />
        </ModalHeader>
        <ModalBottomBtn variant={variant}>
          {variant === 'equal' && (
            <Button
              variant="neutral"
              fit="block"
              onClick={handleClose}
            >
              취소
            </Button>
          )}
          <Button
            fit="block"
            onClick={handleClose}
          >
            확인
          </Button>
        </ModalBottomBtn>
      </Modal>
    </>
  );
}
