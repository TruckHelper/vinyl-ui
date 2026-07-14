import type { ComponentPropsWithoutRef } from 'react';

import { styled } from 'styled-system/jsx';

const StyledLink = styled('a', {
  base: {
    color: 'text.accent-primary',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    _hover: { color: 'layout.primary-dark' },
  },
});

export default function A({ href, target, rel, ...props }: ComponentPropsWithoutRef<'a'>) {
  const isExternal = !!href && /^https?:\/\//.test(href);

  return (
    <StyledLink
      href={href}
      target={target ?? (isExternal ? '_blank' : undefined)}
      rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
      {...props}
    />
  );
}
