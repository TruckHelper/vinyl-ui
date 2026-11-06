import type { ComponentProps, FC } from 'react';

import { styled } from 'styled-system/jsx/factory';

export type DashboardHeaderUserProps = ComponentProps<'p'>;

export const DashboardHeaderUser = styled('p', {
  base: {
    textStyle: 'body.medium-normal',
    whiteSpace: 'nowrap',
  },
}) as unknown as FC<DashboardHeaderUserProps>;
