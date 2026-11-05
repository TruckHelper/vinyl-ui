'use client';

import { useState } from 'react';

import { Button } from '@bigmobility/vinyl-ui/button';
import { Toast, ToastContent } from '@bigmobility/vinyl-ui/toast';

export default function ToastDurationDemo() {
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
        5초 동안 보기
      </Button>
      <Toast
        open={open}
        duration={5000}
        onClose={handleClose}
      >
        <ToastContent>저장되었습니다</ToastContent>
      </Toast>
    </>
  );
}
