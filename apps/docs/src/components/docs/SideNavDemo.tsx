'use client';

import { useState, type MouseEvent } from 'react';

import {
  SideNav,
  SideNavGroup,
  SideNavItem,
  SideNavList,
  SideNavSubItem,
} from '@bigmobility/vinyl-ui/side-nav';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '18rem',
  },
});

type SideNavDemoProps = {
  variant?: 'dark' | 'light';
};

export default function SideNavDemo({ variant = 'dark' }: SideNavDemoProps) {
  const [current, setCurrent] = useState('home');

  const select = (key: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setCurrent(key);
  };

  if (variant === 'light') {
    return (
      <Frame>
        <SideNav
          aria-label="설정 메뉴"
          variant="light"
        >
          <SideNavList>
            {[['home', '기본 정보'], ['account', '계정'], ['alarm', '알림']].map(([key, label]) => (
              <SideNavItem
                key={key}
                current={current === key}
                asChild
              >
                <a
                  href={`#${key}`}
                  onClick={select(key)}
                >
                  {label}
                </a>
              </SideNavItem>
            ))}
            <SideNavItem
              href="#billing"
              disabled
            >
              결제
            </SideNavItem>
          </SideNavList>
        </SideNav>
      </Frame>
    );
  }

  return (
    <Frame>
      <SideNav aria-label="대시보드 메뉴">
        <SideNavList>
          <SideNavItem
            icon="house"
            current={current === 'home'}
            asChild
          >
            <a
              href="#home"
              onClick={select('home')}
            >
              홈
            </a>
          </SideNavItem>
          <SideNavGroup
            label="신청 관리"
            icon="file"
            defaultOpen
          >
            {[['personal', '개인 회원'], ['company', '법인 회원']].map(([key, label]) => (
              <SideNavSubItem
                key={key}
                current={current === key}
                asChild
              >
                <a
                  href={`#${key}`}
                  onClick={select(key)}
                >
                  {label}
                </a>
              </SideNavSubItem>
            ))}
          </SideNavGroup>
          <SideNavGroup
            label="차고지 관리"
            icon="truck"
          >
            <SideNavSubItem
              current={current === 'depots'}
              asChild
            >
              <a
                href="#depots"
                onClick={select('depots')}
              >
                차고지 목록
              </a>
            </SideNavSubItem>
          </SideNavGroup>
          <SideNavItem
            icon="info"
            current={current === 'me'}
            asChild
          >
            <a
              href="#me"
              onClick={select('me')}
            >
              내 정보
            </a>
          </SideNavItem>
        </SideNavList>
      </SideNav>
    </Frame>
  );
}
