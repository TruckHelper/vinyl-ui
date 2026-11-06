'use client';

import type { ComponentProps, FC } from 'react';

import { Carousel as ArkCarousel } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type CarouselIndicatorGroupProps = Omit<ComponentProps<typeof ArkCarousel.IndicatorGroup>, 'asChild'>;

export const CarouselIndicatorGroup = styled(ArkCarousel.IndicatorGroup, {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
  },
}) as unknown as FC<CarouselIndicatorGroupProps>;
