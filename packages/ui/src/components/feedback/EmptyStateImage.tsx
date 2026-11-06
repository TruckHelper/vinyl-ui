import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Svg = styled('svg', {
  base: {
    flexShrink: 0,
    width: '8rem',
    height: '8rem',
    fill: 'text.disable',
  },
});

export function EmptyStateImage(props: EmptyStateImageProps) {
  return (
    <Svg
      viewBox="0 0 80 80"
      aria-hidden
      {...(props as ComponentProps<typeof Svg>)}
    >
      <path d="M40 5C53.8071 5 64.9998 16.1814 65 29.9746C65 47.2702 47.29 68.0957 41.6816 74.2568C40.7792 75.2479 39.2198 75.2479 38.3174 74.2568C32.7098 68.0956 15 47.2701 15 29.9746C15.0002 16.1814 26.1929 5 40 5ZM40.5459 12.5C30.5797 12.5 22.5001 20.5711 22.5 30.5273C22.5 40.4837 30.5796 48.5547 40.5459 48.5547C50.512 48.5545 58.5908 40.4835 58.5908 30.5273C58.5907 20.5712 50.512 12.5002 40.5459 12.5Z" />
      <path d="M40.6251 43.1574C42.2103 43.1574 43.4954 41.8723 43.4954 40.2871C43.4954 38.7019 42.2103 37.4169 40.6251 37.4169C39.0399 37.4169 37.7549 38.7019 37.7549 40.2871C37.7549 41.8723 39.0399 43.1574 40.6251 43.1574Z" />
      <path d="M40.625 17.5C38.8483 17.5 37.4297 18.9783 37.5027 20.754L38.0037 32.9387C38.0613 34.345 39.2176 35.455 40.625 35.455C42.0324 35.455 43.1887 34.345 43.2463 32.9387L43.7473 20.754C43.8203 18.9783 42.4017 17.5 40.625 17.5Z" />
    </Svg>
  );
}

export type EmptyStateImageProps = Omit<ComponentProps<'svg'>, 'children'>;
