import type { LucideProps } from 'lucide-react';

import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';

import { styled } from 'styled-system/jsx';

const Container = styled('span', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1em',
    height: '1em',
    '& svg': { width: '100%', height: '100%' },
  },
});

export type IconName = keyof typeof dynamicIconImports;

export type IconProps = Omit<LucideProps, 'name'> & {
  name: IconName;
};

export function Icon({ className, name, ...props }: IconProps) {
  const iconName = name in dynamicIconImports ? name : 'file-x';
  return (
    <Container className={className}>
      <DynamicIcon name={iconName} aria-hidden {...props} />
    </Container>
  );
}
