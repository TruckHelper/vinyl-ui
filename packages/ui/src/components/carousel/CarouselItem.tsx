'use client';

import type { ComponentProps, FC } from 'react';

import { Carousel as ArkCarousel } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type CarouselItemProps = Omit<ComponentProps<typeof ArkCarousel.Item>, 'asChild'>;

export const CarouselItem = styled(ArkCarousel.Item, {
  base: {
    position: 'relative',
  },
}) as unknown as FC<CarouselItemProps>;
