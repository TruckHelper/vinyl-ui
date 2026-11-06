import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled('td', {
  base: {
    textStyle: 'body.small-light',
    padding: '12',
    color: 'text.default',
    textAlign: 'left',
  },
  variants: {
    type: {
      text: {},
      link: {
        '& a': {
          textStyle: 'button.small-normal',
          color: 'text.default',
          textDecoration: 'underline',
        },
      },
    },
  },
});

export type TableCellProps = {
  type?: 'text' | 'link';
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  children?: ReactNode;
};

export function TableCell({
  type = 'text',
  colSpan,
  rowSpan,
  className,
  children,
}: TableCellProps) {
  return (
    <Container
      className={className}
      type={type}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </Container>
  );
}
