'use client';

import type { ComponentProps, FC, ReactNode } from 'react';

import { Carousel as ArkCarousel } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkCarousel.Root, {
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
    width: '100%',
  },
}, { forwardProps: ['page'] }) as unknown as FC<ComponentProps<typeof ArkCarousel.Root>>;

const translations = {
  nextTrigger: '다음 슬라이드',
  prevTrigger: '이전 슬라이드',
  indicator: (index: number) => `${index + 1}번 슬라이드로 이동`,
  item: (index: number, count: number) => `${count}개 중 ${index + 1}번`,
  autoplayStart: '자동 넘김 시작',
  autoplayStop: '자동 넘김 정지',
};

export type CarouselProps = {
  slideCount: number;
  page: number;
  loop?: boolean;
  'aria-label': string;
  className?: string;
  children?: ReactNode;
  onChangePage: ({ page }: { page: number }) => void;
};

export function Carousel({
  slideCount,
  page,
  loop = false,
  'aria-label': ariaLabel,
  className,
  children,
  onChangePage,
}: CarouselProps) {
  const handleChangePage = (details: ArkCarousel.PageChangeDetails) => {
    onChangePage({ page: details.page });
  };

  return (
    <Container
      className={className}
      slideCount={slideCount}
      page={page}
      loop={loop}
      translations={translations}
      aria-label={ariaLabel}
      onPageChange={handleChangePage}
    >
      {children}
    </Container>
  );
}
