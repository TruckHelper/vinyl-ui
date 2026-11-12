'use client';

import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

import { useStepItemContext } from './StepContext';

const Container = styled('li', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    '& + &::before': {
      display: 'block',
      flexShrink: 0,
      width: '3.2rem',
      height: '1px',
      content: '""',
      backgroundColor: 'layout.default-line',
    },
  },
});

const Indicator = styled('span', {
  base: {
    textStyle: 'body.small-light',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '2.4rem',
    height: '2.4rem',
    borderRadius: 'full',
  },
  variants: {
    state: {
      upcoming: {
        border: '1px solid',
        borderColor: 'layout.default-line',
        backgroundColor: 'layout.bg-light',
        color: 'text.soft',
      },
      current: {
        backgroundColor: 'layout.primary',
        color: 'text.default-light',
      },
      complete: {
        fontSize: '1.2rem',
        color: 'text.accent-primary',
      },
    },
  },
});

const Label = styled('span', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.input',
    wordBreak: 'keep-all',
  },
  variants: {
    visuallyHidden: {
      true: { srOnly: true },
    },
  },
});

export type StepItemProps = {
  label?: boolean;
  className?: string;
  children?: ReactNode;
};

export function StepItem({ label, className, children }: StepItemProps) {
  const { number, state, label: listLabel } = useStepItemContext();
  const showLabel = label ?? listLabel;

  return (
    <Container
      className={className}
      aria-current={state === 'current' ? 'step' : undefined}
      data-state={state}
      data-label={showLabel ? 'on' : 'off'}
    >
      {state === 'complete' ? (
        <Indicator
          state={state}
          role="img"
          aria-label="완료"
        >
          <Icon name="check" />
        </Indicator>
      ) : (
        <Indicator state={state}>{number}</Indicator>
      )}
      {children && <Label visuallyHidden={!showLabel}>{children}</Label>}
    </Container>
  );
}
