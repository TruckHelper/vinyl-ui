'use client';

import { useState } from 'react';

import { Button } from '@bigmobility/vinyl-ui/button';
import { DashboardHeader, DashboardHeaderActions, DashboardHeaderLogo } from '@bigmobility/vinyl-ui/dashboard-header';

import { styled } from 'styled-system/jsx';

const Surface = styled('div', {
  base: {
    width: '100%',
    borderRadius: '8',
    backgroundColor: 'layout.bg-dark',
  },
});

const LogoText = styled('span', {
  base: {
    textStyle: 'heading.small-bold',
    whiteSpace: 'nowrap',
  },
});

export default function DashboardHeaderMenuDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Surface>
      <DashboardHeader>
        <DashboardHeaderLogo>
          <LogoText>LOGO</LogoText>
        </DashboardHeaderLogo>
        <DashboardHeaderActions>
          <Button
            variant="emphasis"
            leftIcon={open ? 'x' : 'text-align-end'}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          />
        </DashboardHeaderActions>
      </DashboardHeader>
    </Surface>
  );
}
