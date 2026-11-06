import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type NewsCardLabelProps = ComponentProps<'span'>;

export const NewsCardLabel = styled('span', {
  base: {
    textStyle: 'body.small-normal',
    alignSelf: 'flex-start',
    marginBlockEnd: '4',
    paddingBlock: '4',
    paddingInline: '8',
    borderRadius: 'full',
    whiteSpace: 'nowrap',
    backgroundColor: 'layout.primary-subtle',
    color: 'text.accent-primary',
  },
}) as unknown as FC<NewsCardLabelProps>;
