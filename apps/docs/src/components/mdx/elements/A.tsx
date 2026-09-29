import type { ComponentPropsWithoutRef } from 'react';

import NextLink from 'next/link';

import { Link } from '@bigmobility/vinyl-ui/link';

export default function A({ href, target, rel, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const isExternal = !!href && /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <Link
        href={href}
        target={target ?? '_blank'}
        rel={rel ?? 'noopener noreferrer'}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link asChild>
      <NextLink
        href={href ?? ''}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </NextLink>
    </Link>
  );
}
