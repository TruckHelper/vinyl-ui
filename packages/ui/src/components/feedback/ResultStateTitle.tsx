import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type ResultStateTitleProps = ComponentProps<'p'>;

export const ResultStateTitle = styled('p', {
  base: {
    textStyle: 'heading.large-bold',
    color: 'text.heading',
  },
}) as unknown as FC<ResultStateTitleProps>;
