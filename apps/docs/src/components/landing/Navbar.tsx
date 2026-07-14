import Link from 'next/link';

import { styled } from 'styled-system/jsx';

import { GITHUB_URL } from '../../constants/site';

import GithubIcon from './GithubIcon';
import SearchBox from './SearchBox';
import MobileMenu from './MobileMenu';

const Container = styled('header', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16',
    width: '100%',
    height: '5.6rem',
    paddingInline: '16',
    backgroundColor: 'layout.bg-light',
    borderBottom: '1px solid',
    borderColor: 'layout.default-line',
    tablet: {
      justifyContent: 'flex-start',
      paddingInline: '24',
    },
  },
});

const Brand = styled(Link, {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12',
    textDecoration: 'none',
  },
});

const Logo = styled('img', {
  base: {
    width: '2.4rem',
    height: '2.4rem',
  },
});

const BrandName = styled('span', {
  base: {
    textStyle: 'body.medium-bold',
    color: 'text.heading',
  },
});

const SearchWrap = styled('div', {
  base: {
    display: 'none',
    tablet: { display: 'block' },
  },
});

const NavControls = styled('nav', {
  base: {
    display: 'none',
    tablet: {
      display: 'flex',
      alignItems: 'center',
      gap: '24',
    },
  },
});

const Links = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '16',
  },
});

const NavLink = styled(Link, {
  base: {
    textStyle: 'body.small-normal',
    color: 'text.default',
    textDecoration: 'none',
  },
  variants: {
    active: {
      true: {
        color: 'layout.emphasis',
        fontWeight: 'bold',
      },
    },
  },
});

const Divider = styled('span', {
  base: {
    width: '1px',
    height: '2rem',
    backgroundColor: 'layout.default-line',
  },
});

const GithubLink = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    color: 'text.default',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: { color: 'text.heading' },
  },
});

const MobileControls = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12',
    tablet: { display: 'none' },
  },
});

export default function Navbar() {
  return (
    <Container>
      <Brand
        href="/"
        aria-label="Go to homepage"
      >
        <Logo
          src="/logo.svg"
          alt="Vinyl UI logo"
        />
        <BrandName>Vinyl UI</BrandName>
      </Brand>
      <SearchWrap>
        <SearchBox />
      </SearchWrap>
      <NavControls>
        <Links>
          <NavLink
            href="/docs"
            active
          >
            Docs
          </NavLink>
          <NavLink href="#">Changelog</NavLink>
        </Links>
        <Divider />
        <GithubLink
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GithubIcon />
        </GithubLink>
      </NavControls>
      <MobileControls>
        <MobileMenu />
      </MobileControls>
    </Container>
  );
}
