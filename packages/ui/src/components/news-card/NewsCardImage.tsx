import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type NewsCardImageProps = Omit<ComponentProps<'img'>, 'alt'> & {
  alt: string;
};

export const NewsCardImage = styled('img', {
  base: {
    display: 'block',
    width: '100%',
    aspectRatio: '320 / 213',
    borderRadius: '16',
    objectFit: 'cover',
    backgroundColor: 'layout.bg-soft-gray',
  },
}) as unknown as FC<NewsCardImageProps>;
