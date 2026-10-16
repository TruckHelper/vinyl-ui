import type { ReactNode } from 'react';

import { Badge } from '@bigmobility/vinyl-ui/badge';

import { styled } from 'styled-system/jsx';

const GreenBadge = styled(Badge, {
  base: { backgroundColor: 'layout.bg-light-green', color: 'text.accent-secondary' },
});

const YellowBadge = styled(Badge, {
  base: { backgroundColor: 'layout.bg-pending', color: 'text.pending' },
});

const RedBadge = styled(Badge, {
  base: { backgroundColor: 'layout.bg-issue', color: 'text.issue' },
});

const GrayBadge = styled(Badge, {
  base: { backgroundColor: 'layout.bg-disable', color: 'text.soft' },
});

const GROUPS = {
  blue: Badge,
  green: GreenBadge,
  yellow: YellowBadge,
  red: RedBadge,
  gray: GrayBadge,
};

type BadgeSampleProps = {
  group: keyof typeof GROUPS;
  children?: ReactNode;
};

export default function BadgeSample({ group, children = '텍스트' }: BadgeSampleProps) {
  const Component = GROUPS[group];

  return (
    <Component>{children}</Component>
  );
}
