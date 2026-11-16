import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Root = styled('footer', {
  base: {
    paddingBlock: '40',
    paddingInline: '24',
    width: '100%',
    backgroundColor: 'layout.bg-light-gray',
  },
});

const Content = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24',
    marginInline: 'auto',
    width: '100%',
    maxWidth: '128rem',
  },
});

export type FooterProps = ComponentProps<'footer'>;

export function Footer({ children, ...props }: FooterProps) {
  return (
    <Root {...props}>
      <Content>{children}</Content>
    </Root>
  );
}
