'use client';

import { Carousel as ArkCarousel } from '@ark-ui/react';

import { Icon } from '../icon/Icon';

import { CarouselArrowButton } from './CarouselArrowButton';

export type CarouselPrevTriggerProps = {
  'aria-label'?: string;
  className?: string;
};

export function CarouselPrevTrigger({
  'aria-label': ariaLabel,
  className,
}: CarouselPrevTriggerProps) {
  return (
    <ArkCarousel.PrevTrigger
      asChild
      aria-label={ariaLabel}
    >
      <CarouselArrowButton className={className}>
        <Icon name="chevron-left" />
      </CarouselArrowButton>
    </ArkCarousel.PrevTrigger>
  );
}
