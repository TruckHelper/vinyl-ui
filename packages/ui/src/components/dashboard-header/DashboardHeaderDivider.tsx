import type { ComponentProps } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Line = styled('span', {
  base: {
    flexShrink: 0,
    width: '0.1rem',
    height: '1.8rem',
    backgroundColor: 'layout.highlight-line',
    opacity: 0.4,
  },
});

export type DashboardHeaderDividerProps = Omit<ComponentProps<'span'>, 'children'>;

export function DashboardHeaderDivider(props: DashboardHeaderDividerProps) {
  return (
    <Line
      {...(props as ComponentProps<typeof Line>)}
      aria-hidden
    />
  );
}
