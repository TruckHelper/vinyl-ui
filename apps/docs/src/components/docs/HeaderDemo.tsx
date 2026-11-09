'use client';

import { Button } from '@bigmobility/vinyl-ui/button';
import {
  Header,
  type HeaderBackground,
  HeaderActions,
  HeaderLogo,
  HeaderMenuTrigger,
  HeaderNav,
  HeaderNavLink,
} from '@bigmobility/vinyl-ui/header';

import { styled } from 'styled-system/jsx';

const Backdrop = styled('div', {
  base: {
    width: '100%',
    backgroundColor: 'layout.emphasis',
  },
});

const Logo = styled('a', {
  base: {
    textStyle: 'heading.small-bold',
    color: 'text.default',
    textDecoration: 'none',
    '[data-background=transparent] &': { color: 'text.default-light' },
    '[data-background=transparent][data-state=open] &': {
      color: {
        base: 'text.default',
        tablet: 'text.default-light',
      },
    },
  },
});

export default function HeaderDemo({ background = 'white' }: { background?: HeaderBackground }) {
  const transparent = background === 'transparent';

  const header = (
    <Header background={background}>
      <HeaderLogo>
        <Logo href="#기본-예시">LOGO</Logo>
      </HeaderLogo>
      <HeaderMenuTrigger />
      <HeaderNav>
        <HeaderNavLink
          href="#기본-예시"
          current={!transparent}
        >
          메뉴1
        </HeaderNavLink>
        <HeaderNavLink href="#기본-예시">메뉴2</HeaderNavLink>
        <HeaderNavLink
          href="#기본-예시"
          disabled={!transparent}
        >
          메뉴3
        </HeaderNavLink>
      </HeaderNav>
      <HeaderActions>
        <Button variant="neutral">로그인</Button>
      </HeaderActions>
    </Header>
  );

  if (transparent) {
    return <Backdrop>{header}</Backdrop>;
  }

  return header;
}
