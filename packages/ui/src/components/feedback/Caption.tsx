import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('p', {
  base: {
    textStyle: 'body.small-light',
    display: 'flex',
    gap: '4',
    color: 'text.soft',
  },
});

const Marker = styled('span', {
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    justifyContent: 'center',
    width: '0.7rem',
    paddingTop: '4',
    color: 'text.accent-primary',
  },
});

export type CaptionProps = ComponentProps<'p'>;

export function Caption({ className, children, ...props }: CaptionProps) {
  return (
    <Container
      className={className}
      {...props}
    >
      <Marker
        aria-hidden
        data-testid="caption-marker"
      >
        *
      </Marker>
      <span>{children}</span>
    </Container>
  );
}
