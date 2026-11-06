import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type FieldGroupWrapProps = ComponentProps<'div'>;

export const FieldGroupWrap = styled('div', {
  base: {
    display: 'flex',
    gap: '4',
    width: '100%',
    '& > input': {
      flexGrow: 1,
      flexBasis: '0',
      minWidth: '0',
    },
  },
}) as unknown as FC<FieldGroupWrapProps>;
