import Link from 'next/link';

import { styled } from 'styled-system/jsx';

import { GITHUB_URL } from '../../constants/site';

const Container = styled('footer', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16',
    width: '100%',
    paddingInline: '16',
    paddingBlock: '32',
    borderTop: '1px solid',
    borderColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light',
    tablet: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingInline: '80',
      paddingBlock: '48',
    },
  },
});

const Wrapper = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12',
  },
});

const Brand = styled('span', {
  base: {
    textStyle: 'body.small-bold',
    color: 'text.strong',
  },
});

const Copyright = styled('span', {
  base: {
    textStyle: 'body.small-normal',
    color: 'text.soft',
  },
});

const Nav = styled('nav', {
  base: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '24',
  },
});

const NavLink = styled(Link, {
  base: {
    textStyle: 'body.small-normal',
    color: 'text.default',
    textDecoration: 'none',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: { color: 'text.heading' },
  },
});

export function Footer() {
  return (
    <Container>
      <Wrapper>
        <Brand>Vinyl UI</Brand>
        <Copyright>© 2024 @bigmobility · v2.1.0</Copyright>
      </Wrapper>
      <Nav>
        <NavLink href="#">Docs</NavLink>
        <NavLink
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </NavLink>
        <NavLink href="#">Changelog</NavLink>
        <NavLink href="#">Contact</NavLink>
      </Nav>
    </Container>
  );
}
