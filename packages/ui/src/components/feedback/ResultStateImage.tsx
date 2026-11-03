import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Svg = styled('svg', {
  base: {
    flexShrink: 0,
    width: '8rem',
    height: '8rem',
    fill: 'layout.primary',
    '& circle': {
      fill: 'layout.primary-subtle',
    },
  },
});

export function ResultStateImage(props: ResultStateImageProps) {
  return (
    <Svg
      viewBox="0 0 80 80"
      aria-hidden
      {...props}
    >
      <circle
        cx="40"
        cy="38"
        r="30"
      />
      <path d="M55.3823 29.5998C54.822 29.0516 54.0767 28.75 53.2839 28.75C52.4911 28.75 51.7458 29.052 51.1855 29.5998L36.2531 44.1997L30.066 38.15C28.9091 37.0188 27.0261 37.0188 25.8692 38.15C25.3089 38.6982 25 39.427 25 40.2017C25 40.9763 25.3089 41.7055 25.8692 42.2533L34.2371 50.4348C34.7927 50.9781 35.5229 51.25 36.2531 51.25C36.9832 51.25 37.7134 50.9781 38.2691 50.4348L55.3823 33.7032C56.5392 32.572 56.5392 30.731 55.3823 29.5998Z" />
    </Svg>
  );
}

export type ResultStateImageProps = Omit<ComponentProps<typeof Svg>, 'children'>;
