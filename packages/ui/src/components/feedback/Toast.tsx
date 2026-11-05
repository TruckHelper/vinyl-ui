'use client';

import { type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { createToaster, Toaster as ArkToaster } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const OFFSET = '1.6rem';

type ToastPlacement = 'top' | 'bottom';

type ToastAlign = 'left' | 'center' | 'right';

const ARK_ALIGN = {
  left: '-start',
  center: '',
  right: '-end',
} as const;

const Group = styled(ArkToaster, {
  base: {
    insetInlineStart: `calc(env(safe-area-inset-left, 0px) + ${OFFSET})`,
    insetInlineEnd: `calc(env(safe-area-inset-right, 0px) + ${OFFSET})`,
  },
});

const createToastStore = (placement: ToastPlacement, align: ToastAlign) => ({
  key: `${placement}-${align}`,
  toaster: createToaster({
    placement: `${placement}${ARK_ALIGN[align]}`,
    offsets: OFFSET,
  }),
});

export type ToastProps = {
  open: boolean;
  duration?: number;
  placement?: ToastPlacement;
  align?: ToastAlign;
  children: ReactNode;
  onClose: () => void;
};

export function Toast({
  open,
  duration = 3000,
  placement = 'bottom',
  align = 'center',
  children,
  onClose,
}: ToastProps) {
  const baseId = useId();

  const [store, setStore] = useState(() => createToastStore(placement, align));

  if (store.key !== `${placement}-${align}`) {
    setStore(createToastStore(placement, align));
  }

  const { toaster } = store;

  const idRef = useRef('');
  const countRef = useRef(0);
  const durationRef = useRef(duration);
  const onCloseRef = useRef(onClose);
  const dismissingRef = useRef(false);

  useEffect(() => {
    durationRef.current = duration;
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) {
      queueMicrotask(() => {
        if (!dismissingRef.current && toaster.isVisible(idRef.current)) {
          toaster.dismiss(idRef.current);
        }
      });
      return;
    }

    countRef.current += 1;
    idRef.current = `${baseId}-${countRef.current}`;
    dismissingRef.current = false;

    const id = idRef.current;
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      toaster.create({
        id,
        duration: durationRef.current,
        onStatusChange: ({ status }) => {
          if (status === 'dismissing' && id === idRef.current) {
            dismissingRef.current = true;
            onCloseRef.current();
          }
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [open, baseId, toaster]);

  useEffect(() => () => {
    toaster.remove();
  }, [toaster]);

  return (
    <Group
      key={store.key}
      toaster={toaster}
    >
      {() => children}
    </Group>
  );
}
