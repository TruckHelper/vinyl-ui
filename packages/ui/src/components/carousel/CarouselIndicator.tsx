'use client';

import type { ComponentProps, FC } from 'react';

import { Carousel as ArkCarousel } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type CarouselIndicatorProps = Omit<ComponentProps<typeof ArkCarousel.Indicator>, 'asChild' | 'children'>;

export const CarouselIndicator = styled(ArkCarousel.Indicator, {
  base: {
    position: 'relative',
    flexShrink: 0,
    width: '0.6rem',
    height: '0.6rem',
    padding: '0',
    border: 'none',
    borderRadius: 'full',
    backgroundColor: 'layout.bg-soft-gray',
    cursor: 'pointer',
    _after: {
      content: '""',
      position: 'absolute',
      inset: '-4',
    },
    _current: {
      backgroundColor: 'layout.primary',
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
  },
}) as unknown as FC<CarouselIndicatorProps>;
