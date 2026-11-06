'use client';

import { useState } from 'react';

import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
} from '@bigmobility/vinyl-ui/carousel';

import { styled } from 'styled-system/jsx';

const Slide = styled('div', {
  base: {
    textStyle: 'heading.small-bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '16rem',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light-gray',
    color: 'text.default',
  },
});

const slides = ['첫 번째 슬라이드', '두 번째 슬라이드', '세 번째 슬라이드', '네 번째 슬라이드', '다섯 번째 슬라이드'];

type CarouselDemoProps = {
  type?: 'dot' | 'counter';
  loop?: boolean;
};

export default function CarouselDemo({
  type = 'dot',
  loop = false,
}: CarouselDemoProps) {
  const [page, setPage] = useState(0);

  const handleChangePage = ({ page: next }: { page: number }) => {
    setPage(next);
  };

  return (
    <Carousel
      slideCount={slides.length}
      page={page}
      loop={loop}
      aria-label="추천 배너"
      onChangePage={handleChangePage}
    >
      <CarouselItemGroup>
        {slides.map((slide, index) => (
          <CarouselItem
            key={slide}
            index={index}
          >
            <Slide>{slide}</Slide>
          </CarouselItem>
        ))}
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger />
        {type === 'dot' ? (
          <CarouselIndicatorGroup>
            {slides.map((slide, index) => (
              <CarouselIndicator
                key={slide}
                index={index}
              />
            ))}
          </CarouselIndicatorGroup>
        ) : (
          <CarouselProgressText />
        )}
        <CarouselNextTrigger />
      </CarouselControl>
    </Carousel>
  );
}
