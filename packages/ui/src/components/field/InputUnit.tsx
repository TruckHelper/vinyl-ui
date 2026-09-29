'use client';

export type InputUnitProps = {
  className?: string;
  children: string;
};

export function InputUnit({ className, children }: InputUnitProps) {
  return (
    <span className={className}>
      {children}
    </span>
  );
}
