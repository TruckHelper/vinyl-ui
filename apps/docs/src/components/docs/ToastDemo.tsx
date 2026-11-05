'use client';

import { useState } from 'react';

import { Button } from '@bigmobility/vinyl-ui/button';
import { Toast, ToastContent } from '@bigmobility/vinyl-ui/toast';

export default function ToastDemo() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>저장하기</Button>
      <Toast
        open={open}
        onClose={handleClose}
      >
        <ToastContent>저장되었습니다</ToastContent>
      </Toast>
    </>
  );
}
