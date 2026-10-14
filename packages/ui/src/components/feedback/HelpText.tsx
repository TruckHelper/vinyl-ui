import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled('p', {
  base: {
    textStyle: 'body.small-light',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '4',
    width: 'fit-content',
  },
  variants: {
    state: {
      default: { color: 'text.accent-primary' },
      'notice-warning': { color: 'text.pending' },
      'notice-error': { color: 'text.issue' },
    },
    type: {
      fill: { padding: '12', borderRadius: 'full' },
      text: {},
    },
  },
  compoundVariants: [
    { type: 'fill', state: 'default', css: { backgroundColor: 'layout.primary-subtle' } },
    { type: 'fill', state: 'notice-warning', css: { backgroundColor: 'layout.bg-pending' } },
    { type: 'fill', state: 'notice-error', css: { backgroundColor: 'layout.bg-issue' } },
  ],
  defaultVariants: {
    state: 'default',
    type: 'fill',
  },
});

const IconWrapper = styled('span', {
  base: {
    fontSize: '2rem',
    display: 'inline-flex',
    flexShrink: 0,
  },
});

export type HelpTextProps = ComponentProps<'p'> & {
  state?: 'default' | 'notice-warning' | 'notice-error';
  type?: 'fill' | 'text';
};

export function HelpText({
  className, children, state = 'default', type = 'fill', ...props
}: HelpTextProps) {
  return (
    <Container
      className={className}
      state={state}
      type={type}
      {...props}
    >
      <IconWrapper>
        <Icon name="info" />
      </IconWrapper>
      {children}
    </Container>
  );
}
