'use client';

import type { ReactNode } from 'react';

export type InputAddonProps = {
  className?: string;
  children?: ReactNode;
};

export function InputAddon({ className, children }: InputAddonProps) {
  return (
    <span className={className}>
      {children}
    </span>
  );
}
