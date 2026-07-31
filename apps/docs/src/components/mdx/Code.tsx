import type { ComponentPropsWithoutRef } from 'react';

import { styled } from 'styled-system/jsx';

const InlineCode = styled('code', {
  base: {
    fontFamily: 'mono',
    fontSize: '0.9em',
    paddingBlock: '2',
    paddingInline: '4',
    borderRadius: '0.4rem',
    color: 'text.accent-primary',
    backgroundColor: 'layout.bg-light-gray',
  },
});

export default function Code({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  if (typeof children === 'string') {
    return (
      <InlineCode {...props}>{children}</InlineCode>
    );
  }

  return (
    <code {...props}>{children}</code>
  );
}
