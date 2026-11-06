'use client';

import type { ComponentProps, FC } from 'react';

import { Carousel as ArkCarousel } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type CarouselProgressTextProps = Omit<ComponentProps<typeof ArkCarousel.ProgressText>, 'asChild' | 'children'>;

export const CarouselProgressText = styled(ArkCarousel.ProgressText, {
  base: {
    textStyle: 'body.small-light',
    display: 'inline-flex',
    alignItems: 'center',
    paddingBlock: '4',
    paddingInline: '12',
    borderRadius: 'full',
    backgroundColor: 'layout.bg-layer',
    color: 'text.default-light',
    whiteSpace: 'nowrap',
  },
}) as unknown as FC<CarouselProgressTextProps>;
