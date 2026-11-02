import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('p', {
  base: {
    textStyle: 'body.small-light',
    display: 'flex',
    gap: '4',
    color: 'text.soft',
    _before: {
      content: '"*" / ""',
      flexShrink: 0,
      color: 'text.accent-primary',
    },
  },
});

export type CaptionProps = ComponentProps<'p'>;

export function Caption({ className, children, ...props }: CaptionProps) {
  return (
    <Container
      className={className}
      {...props}
    >
      <span>{children}</span>
    </Container>
  );
}
