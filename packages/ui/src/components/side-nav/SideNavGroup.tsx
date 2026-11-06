'use client';

import type { ReactNode } from 'react';

import { Collapsible as ArkCollapsible } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon, type IconName } from '../icon/Icon';

const Root = styled(ArkCollapsible.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Trigger = styled(ArkCollapsible.Trigger, {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8',
    width: '100%',
    paddingInline: '12',
    paddingBlock: '16',
    border: 'none',
    borderRadius: '8',
    backgroundColor: 'transparent',
    textStyle: 'body.medium-normal',
    color: 'text.default-light',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    '[data-side-nav-variant=light] &': { color: 'text.soft' },
  },
});

const Label = styled('span', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
  },
});

const IconWrapper = styled('span', {
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: '2rem',
  },
});

const Indicator = styled(ArkCollapsible.Indicator, {
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: '2rem',
    transitionProperty: 'transform',
    transitionDuration: '0.2s',
    _open: { transform: 'rotate(180deg)' },
  },
});

const List = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },
});

export type SideNavGroupProps = {
  label: string;
  icon?: IconName;
  defaultOpen?: boolean;
  className?: string;
  children?: ReactNode;
};

export function SideNavGroup({
  label,
  icon,
  defaultOpen = false,
  className,
  children,
}: SideNavGroupProps) {
  return (
    <li>
      <Root
        className={className}
        defaultOpen={defaultOpen}
      >
        <Trigger>
          <Label>
            {icon && (
              <IconWrapper>
                <Icon name={icon} />
              </IconWrapper>
            )}
            {label}
          </Label>
          <Indicator>
            <Icon name="chevron-down" />
          </Indicator>
        </Trigger>
        <ArkCollapsible.Content>
          <List>{children}</List>
        </ArkCollapsible.Content>
      </Root>
    </li>
  );
}
