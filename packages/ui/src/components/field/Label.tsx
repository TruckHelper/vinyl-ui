'use client';

import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { useFieldContext } from './FieldContext';

const Container = styled('label', {
  base: {
    textStyle: 'body.medium-light',
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: '4',
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

export type LabelProps = ComponentProps<'label'> & {
  required?: boolean;
};

export function Label({
  className,
  children,
  htmlFor,
  required,
  ...props
}: LabelProps) {
  const field = useFieldContext();

  const resolvedFor = htmlFor ?? field?.inputId;
  const resolvedRequired = required ?? field?.required ?? false;

  return (
    <Container
      className={className}
      htmlFor={resolvedFor}
      required={resolvedRequired}
      data-required={resolvedRequired || undefined}
      {...props}
    >
      {children}
    </Container>
  );
}
