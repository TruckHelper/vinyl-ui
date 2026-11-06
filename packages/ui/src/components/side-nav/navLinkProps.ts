import type { MouseEvent } from 'react';

type NavLinkOptions = {
  href?: string;
  current: boolean;
  disabled: boolean;
  asChild: boolean;
};

const blockClick = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export function navLinkProps({
  href, current, disabled, asChild,
}: NavLinkOptions) {
  return {
    href: disabled && !asChild ? undefined : href,
    'aria-current': current ? 'page' as const : undefined,
    ...(disabled
      ? {
        role: 'link',
        'aria-disabled': true,
        tabIndex: -1,
        onClickCapture: blockClick,
      }
      : {}),
  };
}
