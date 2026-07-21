'use client';

import { Icon } from '@bigmobility/vinyl-ui';

import { styled } from 'styled-system/jsx';

import { useColorMode } from '../../hooks/useColorMode';

const Toggle = styled('button', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    color: 'text.default',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: { color: 'text.heading' },
  },
});

export function ThemeToggle() {
  const { isDarkMode, toggle } = useColorMode();

  return (
    <Toggle
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDarkMode}
      onClick={toggle}
    >
      <Icon name={isDarkMode ? 'moon' : 'sun'} />
    </Toggle>
  );
}
