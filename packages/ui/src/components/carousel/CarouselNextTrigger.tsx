'use client';

import { Carousel as ArkCarousel } from '@ark-ui/react';

import { Icon } from '../icon/Icon';

import { CarouselArrowButton } from './CarouselArrowButton';

export type CarouselNextTriggerProps = {
  'aria-label'?: string;
  className?: string;
};

export function CarouselNextTrigger({
  'aria-label': ariaLabel,
  className,
}: CarouselNextTriggerProps) {
  return (
    <ArkCarousel.NextTrigger
      asChild
      aria-label={ariaLabel}
    >
      <CarouselArrowButton className={className}>
        <Icon name="chevron-right" />
      </CarouselArrowButton>
    </ArkCarousel.NextTrigger>
  );
}
