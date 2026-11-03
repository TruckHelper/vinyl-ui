import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

export const ResultStateTitle = styled('p', {
  base: {
    textStyle: 'heading.large-bold',
    color: 'text.heading',
  },
});

export type ResultStateTitleProps = ComponentProps<typeof ResultStateTitle>;
