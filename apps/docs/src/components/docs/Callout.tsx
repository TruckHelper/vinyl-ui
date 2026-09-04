import { Icon, type IconName } from '@bigmobility/vinyl-ui/icon';
import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx';

type CalloutType = 'info' | 'warning';

const Root = styled('div', {
  base: {
    display: 'flex',
    gap: '12',
    marginBlock: '16',
    padding: '16',
    borderRadius: '0.8rem',
    borderLeft: '3px solid',
  },
  variants: {
    type: {
      info: {
        backgroundColor: 'layout.bg-light-blue',
        borderColor: 'layout.highlight-line',
      },
      warning: {
        backgroundColor: 'layout.bg-issue',
        borderColor: 'layout.issue-line',
      },
    },
  },
});

const IconWrap = styled('div', {
  base: {
    flexShrink: 0,
    fontSize: '2rem',
    lineHeight: '1',
  },
  variants: {
    type: {
      info: { color: 'text.accent-primary' },
      warning: { color: 'layout.issue' },
    },
  },
});

const Content = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    minWidth: '0',
  },
});

const Title = styled('p', {
  base: {
    textStyle: 'body.small-bold',
    color: 'text.heading',
  },
});

const Body = styled('div', {
  base: {
    textStyle: 'body.small-normal',
    color: 'text.default',
    lineHeight: '1.6',
    '& p': { margin: '0' },
  },
});

const ICONS: Record<CalloutType, IconName> = {
  info: 'info',
  warning: 'triangle-alert',
};

export default function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: CalloutType;
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Root type={type}>
      <IconWrap type={type}>
        <Icon name={ICONS[type]} />
      </IconWrap>
      <Content>
        {title ? <Title>{title}</Title> : null}
        <Body>{children}</Body>
      </Content>
    </Root>
  );
}
