import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Root = styled('footer', {
  base: {
    width: '100%',
    paddingBlock: '40',
    paddingInline: '24',
    backgroundColor: 'layout.bg-light-gray',
  },
});

const Content = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24',
    width: '100%',
    maxWidth: '128rem',
    marginInline: 'auto',
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
