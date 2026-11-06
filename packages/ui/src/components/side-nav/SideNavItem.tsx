'use client';

import {
  cloneElement, isValidElement, type ReactElement, type ReactNode,
} from 'react';

import { ark } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { navLinkProps } from './navLinkProps';

import { Icon, type IconName } from '../icon/Icon';

const Container = styled(ark.a, {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    width: '100%',
    paddingInline: '12',
    paddingBlock: '16',
    borderRadius: '8',
    textStyle: 'body.medium-normal',
    color: 'text.default-light',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: '0.2s',
    _hover: { backgroundColor: 'layout.primary' },
    '&[aria-current=page]': { backgroundColor: 'layout.primary' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '[data-side-nav-variant=light] &': {
      padding: '16',
      color: 'text.soft',
      _hover: {
        backgroundColor: 'layout.primary-subtle',
        color: 'text.default',
      },
      '&[aria-current=page]': {
        backgroundColor: 'layout.primary-subtle',
        color: 'text.accent-primary',
      },
      _disabled: { color: 'text.disable' },
    },
  },
});

const IconWrapper = styled('span', {
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: '2rem',
  },
});

export type SideNavItemProps = {
  href?: string;
  icon?: IconName;
  current?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
};

export function SideNavItem({
  href,
  icon,
  current = false,
  disabled = false,
  asChild = false,
  className,
  children,
}: SideNavItemProps) {
  const withIcon = (label: ReactNode) => (
    <>
      {icon && (
        <IconWrapper>
          <Icon name={icon} />
        </IconWrapper>
      )}
      {label}
    </>
  );

  const content = asChild && isValidElement<{ children?: ReactNode }>(children)
    ? cloneElement(children as ReactElement<{ children?: ReactNode }>, undefined, withIcon(children.props.children))
    : withIcon(children);

  return (
    <li>
      <Container
        {...navLinkProps({
          href,
          current,
          disabled,
          asChild,
        })}
        className={className}
        asChild={asChild}
      >
        {content}
      </Container>
    </li>
  );
}
