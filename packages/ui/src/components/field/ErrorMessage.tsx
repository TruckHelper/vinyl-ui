'use client';

import type { ComponentProps, ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { createErrorId } from './utils';

import { useFieldContext } from './FieldContext';
import { useFieldGroupContext } from './FieldGroupContext';

import { Icon } from '../icon/Icon';

const Container = styled('div', {
  base: {
    textStyle: 'input.medium-light',
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    color: 'text.issue',
  },
});

const IconWrapper = styled('span', {
  base: {
    fontSize: '2rem',
    display: 'inline-flex',
    flexShrink: 0,
  },
});

export type ErrorMessageProps = Omit<ComponentProps<'div'>, 'children'> & {
  children?: ReactNode;
};

export function ErrorMessage({ id, className, children, ...props }: ErrorMessageProps) {
  const field = useFieldContext();
  const group = useFieldGroupContext();
  const owner = field ?? group;

  if (owner && !owner.hasError) {
    return null;
  }

  if (!children) {
    return null;
  }

  const resolvedId = id ? createErrorId(id) : owner?.errorId;

  return (
    <Container
      role="alert"
      className={className}
      id={resolvedId}
      {...props}
    >
      <IconWrapper>
        <Icon name="info" />
      </IconWrapper>
      {children}
    </Container>
  );
}
