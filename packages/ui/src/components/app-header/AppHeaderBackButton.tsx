import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled('button', {
  base: {
    gridColumn: '1',
    justifySelf: 'start',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent',
    textStyle: 'body.medium-light',
    color: 'text.default',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

const IconWrapper = styled('span', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '2.4rem',
    height: '2.4rem',
    fontSize: '2rem',
  },
});

export type AppHeaderBackButtonProps = ComponentProps<'button'>;

export function AppHeaderBackButton({
  children = '뒤로',
  type = 'button',
  ...props
}: AppHeaderBackButtonProps) {
  return (
    <Container
      type={type}
      {...props}
    >
      <IconWrapper>
        <Icon name="chevron-left" />
      </IconWrapper>
      {children}
    </Container>
  );
}
