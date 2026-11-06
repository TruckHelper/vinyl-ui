'use client';

import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { useFieldGroupContext } from './FieldGroupContext';

const Container = styled('legend', {
  base: {
    textStyle: 'body.medium-light',
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: '4',
    padding: '0',
    marginBottom: '4',
    color: 'text.input',
  },
  variants: {
    required: {
      true: {
        _after: {
          content: '""',
          flexShrink: 0,
          width: '0.4rem',
          height: '0.4rem',
          borderRadius: 'full',
          backgroundColor: 'layout.primary',
        },
      },
    },
  },
});

export type FieldGroupLabelProps = {
  className?: string;
  required?: boolean;
  children?: ReactNode;
};

export function FieldGroupLabel({
  className,
  required,
  children,
}: FieldGroupLabelProps) {
  const group = useFieldGroupContext();

  const resolvedRequired = required ?? group?.required ?? false;

  return (
    <Container
      className={className}
      required={resolvedRequired}
      data-required={resolvedRequired || undefined}
    >
      {children}
    </Container>
  );
}
