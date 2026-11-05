'use client';

import { useState } from 'react';

import { Button } from '@bigmobility/vinyl-ui/button';
import { Toast, ToastContent, type ToastProps } from '@bigmobility/vinyl-ui/toast';

import { styled } from 'styled-system/jsx';

type Placement = NonNullable<ToastProps['placement']>;

type Align = NonNullable<ToastProps['align']>;

const POSITIONS: { placement: Placement; align: Align; label: string }[] = [
  { placement: 'top', align: 'left', label: '위 왼쪽' },
  { placement: 'top', align: 'center', label: '위 센터' },
  { placement: 'top', align: 'right', label: '위 오른쪽' },
  { placement: 'bottom', align: 'left', label: '아래 왼쪽' },
  { placement: 'bottom', align: 'center', label: '아래 센터' },
  { placement: 'bottom', align: 'right', label: '아래 오른쪽' },
];

const ButtonGrid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8',
    width: '100%',
  },
});

const NarrowToastContent = styled(ToastContent, {
  base: {
    maxWidth: '24rem',
  },
});

export default function ToastPlacementDemo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(POSITIONS[4]);

  const handleOpen = (nextPosition: (typeof POSITIONS)[number]) => {
    setPosition(nextPosition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonGrid>
        {POSITIONS.map((item) => (
          <Button
            key={item.label}
            variant="outline"
            fit="block"
            onClick={() => handleOpen(item)}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGrid>
      <Toast
        open={open}
        placement={position.placement}
        align={position.align}
        onClose={handleClose}
      >
        <NarrowToastContent>{position.label}</NarrowToastContent>
      </Toast>
    </>
  );
}
