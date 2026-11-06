'use client';

import type { ComponentProps, FC } from 'react';

import { Carousel as ArkCarousel } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type CarouselItemGroupProps = Omit<ComponentProps<typeof ArkCarousel.ItemGroup>, 'asChild'>;

export const CarouselItemGroup = styled(ArkCarousel.ItemGroup, {
  base: {
    width: '100%',
  },
}) as unknown as FC<CarouselItemGroupProps>;
