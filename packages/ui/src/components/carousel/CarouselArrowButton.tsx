'use client';

import { styled } from 'styled-system/jsx/factory';

export const CarouselArrowButton = styled('button', {
  base: {
    fontSize: '2rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '4rem',
    height: '4rem',
    padding: '0',
    border: 'none',
    borderRadius: 'full',
    backgroundColor: 'layout.bg-layer',
    color: 'text.default-light',
    cursor: 'pointer',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});
