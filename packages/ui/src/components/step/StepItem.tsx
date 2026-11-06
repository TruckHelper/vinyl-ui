import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled('li', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    counterIncrement: 'step',
  },
});

const Indicator = styled('span', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '2.4rem',
    height: '2.4rem',
    borderRadius: 'full',
    textStyle: 'body.small-light',
    '&[data-step]::before': { content: 'none' },
  },
  variants: {
    state: {
      part: {
        border: '1px solid',
        borderColor: 'layout.default-line',
        backgroundColor: 'layout.bg-light',
        color: 'text.soft',
        _before: { content: 'counter(step)' },
      },
      current: {
        backgroundColor: 'layout.primary',
        color: 'text.default-light',
        _before: { content: 'counter(step)' },
      },
      complete: {
        fontSize: '1.2rem',
        color: 'text.accent-primary',
      },
    },
  },
});

const HiddenText = styled('span', { base: { srOnly: true } });

const Label = styled('span', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.input',
    '[data-label=off] > &, ol[data-label=off] > li:not([data-label=on]) > &': { srOnly: true },
  },
});

export type StepItemProps = {
  state?: 'part' | 'current' | 'complete';
  label?: boolean;
  step?: number;
  className?: string;
  children?: ReactNode;
};

export function StepItem({
  state = 'part',
  label,
  step,
  className,
  children,
}: StepItemProps) {
  const dataLabel = label === undefined ? undefined : (label ? 'on' : 'off');

  return (
    <Container
      className={className}
      aria-current={state === 'current' ? 'step' : undefined}
      data-state={state}
      data-label={dataLabel}
    >
      <Indicator
        state={state}
        data-step={step}
      >
        {state !== 'complete' && step}
        {state === 'complete' && (
          <>
            <Icon name="check" />
            <HiddenText>완료</HiddenText>
          </>
        )}
      </Indicator>
      {children && <Label>{children}</Label>}
    </Container>
  );
}
