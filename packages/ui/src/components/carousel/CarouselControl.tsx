'use client';

import type { ComponentProps, FC } from 'react';

import { Carousel as ArkCarousel } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type CarouselControlProps = Omit<ComponentProps<typeof ArkCarousel.Control>, 'asChild'>;

export const CarouselControl = styled(ArkCarousel.Control, {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8',
  },
}) as unknown as FC<CarouselControlProps>;
