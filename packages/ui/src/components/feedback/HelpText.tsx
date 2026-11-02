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
    padding: '12',
    borderRadius: 'full',
    backgroundColor: 'layout.primary-subtle',
    color: 'text.accent-primary',
  },
});

const IconWrapper = styled('span', {
  base: {
    fontSize: '2rem',
    display: 'inline-flex',
    flexShrink: 0,
  },
});

export type HelpTextProps = ComponentProps<'p'>;

export function HelpText({ className, children, ...props }: HelpTextProps) {
  return (
    <Container
      className={className}
      {...props}
    >
      <IconWrapper>
        <Icon name="info" />
      </IconWrapper>
      {children}
    </Container>
  );
}
