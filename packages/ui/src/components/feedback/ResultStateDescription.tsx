import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

export const ResultStateDescription = styled('p', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
  },
});

export type ResultStateDescriptionProps = ComponentProps<typeof ResultStateDescription>;
