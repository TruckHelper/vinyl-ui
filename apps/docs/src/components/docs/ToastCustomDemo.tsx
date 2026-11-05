'use client';

import { useState } from 'react';

import { Button } from '@bigmobility/vinyl-ui/button';
import { Toast, ToastContent } from '@bigmobility/vinyl-ui/toast';

import { styled } from 'styled-system/jsx';

const NarrowToastContent = styled(ToastContent, {
  base: {
    maxWidth: '36rem',
    backgroundColor: 'layout.primary',
  },
});

export default function ToastCustomDemo() {
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
        쿠폰 받기
      </Button>
      <Toast
        open={open}
        onClose={handleClose}
      >
        <NarrowToastContent>쿠폰이 발급되었습니다</NarrowToastContent>
      </Toast>
    </>
  );
}
