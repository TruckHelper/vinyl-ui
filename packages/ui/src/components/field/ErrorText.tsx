'use client';

import type { ComponentProps, ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';
import { useFieldContext } from './FieldContext';

const Container = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    color: 'text.issue',
    textStyle: 'input.medium-light',
  },
});

const IconWrapper = styled('span', {
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: '2rem',
  },
});

export type ErrorTextProps = Omit<ComponentProps<'div'>, 'children'> & {
  children?: ReactNode;
};

export function ErrorText({ className, id, children, ...props }: ErrorTextProps) {
  const field = useFieldContext();

  // Field 안에서는 hasError일 때만 노출. 단독 사용(context 없음)이면 항상 노출.
  if (field && !field.hasError) {
    return null;
  }

  if (!children) {
    return null;
  }

  const resolvedId = id ?? field?.errorId;

  return (
    <Container
      role="alert"
      {...props}
      className={className}
      id={resolvedId}
    >
      <IconWrapper>
        <Icon name="info" />
      </IconWrapper>
      {children}
    </Container>
  );
}
