import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type ResultStateProps = ComponentProps<'div'>;

export const ResultState = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8',
    textAlign: 'center',
  },
}) as unknown as FC<ResultStateProps>;
