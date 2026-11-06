'use client';

import type { ReactNode } from 'react';

import { Tabs as ArkTabs } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ArkTabs.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

export type TabsProps = {
  value: string;
  className?: string;
  children?: ReactNode;
  onChangeValue: ({ value }: { value: string }) => void;
};

export function Tabs({
  value,
  className,
  children,
  onChangeValue,
}: TabsProps) {
  const handleValueChange = (details: ArkTabs.ValueChangeDetails) => {
    onChangeValue({ value: details.value });
  };

  return (
    <Container
      className={className}
      value={value}
      onValueChange={handleValueChange}
    >
      {children}
    </Container>
  );
}
