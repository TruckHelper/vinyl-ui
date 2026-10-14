import type { ReactNode } from 'react';

import { HelpText } from '@bigmobility/vinyl-ui/help-text';

import { styled } from 'styled-system/jsx';

const WarningHelpText = styled(HelpText, {
  base: { backgroundColor: 'layout.bg-pending', color: 'text.pending' },
});

const ErrorHelpText = styled(HelpText, {
  base: { backgroundColor: 'layout.bg-issue', color: 'text.issue' },
});

const GROUPS = {
  default: HelpText,
  warning: WarningHelpText,
  error: ErrorHelpText,
};

type HelpTextSampleProps = {
  group: keyof typeof GROUPS;
  children?: ReactNode;
};

export default function HelpTextSample({ group, children = '텍스트' }: HelpTextSampleProps) {
  const Component = GROUPS[group];

  return (
    <Component>{children}</Component>
  );
}
