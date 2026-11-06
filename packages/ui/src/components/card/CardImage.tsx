import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type CardImageProps = Omit<ComponentProps<'img'>, 'alt'> & {
  alt: string;
};

export const CardImage = styled('img', {
  base: {
    display: 'block',
    width: '100%',
    aspectRatio: '320 / 213',
    objectFit: 'cover',
    borderRadius: '16',
    backgroundColor: 'layout.bg-soft-gray',
  },
}) as unknown as FC<CardImageProps>;
