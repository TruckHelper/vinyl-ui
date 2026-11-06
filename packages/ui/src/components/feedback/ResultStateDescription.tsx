import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type ResultStateDescriptionProps = ComponentProps<'p'>;

export const ResultStateDescription = styled('p', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
  },
}) as unknown as FC<ResultStateDescriptionProps>;
