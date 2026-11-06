import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

import { Icon, type IconName } from '../icon/Icon';

const Container = styled('button', {
  base: {
    fontSize: '2rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: '0',
    width: '2.4rem',
    height: '2.4rem',
    border: 'none',
    color: 'text.default',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: { color: 'text.accent-primary' },
    _active: { color: 'text.accent-primary' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
      _hover: { color: 'text.disable' },
      _active: { color: 'text.disable' },
    },
  },
});

export type IconButtonProps = Omit<ComponentProps<'button'>, 'children' | 'aria-label'> & {
  icon: IconName;
  'aria-label': string;
};

export function IconButton({
  icon, type = 'button', ...props
}: IconButtonProps) {
  return (
    <Container
      type={type}
      {...props}
    >
      <Icon name={icon} />
    </Container>
  );
}
