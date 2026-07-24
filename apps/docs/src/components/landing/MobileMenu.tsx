'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';

import { Icon } from '@bigmobility/vinyl-ui';

import { styled } from 'styled-system/jsx';

import { GITHUB_URL } from '../../constants/site';
import { GithubIcon } from './GithubIcon';
import { SearchBox } from './SearchBox';

const Trigger = styled('button', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.4rem',
    color: 'text.default',
    cursor: 'pointer',
    _hover: { color: 'text.heading' },
  },
});

const Overlay = styled('div', {
  base: {
    position: 'fixed',
    inset: '0',
    zIndex: 'dropdown',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'layout.bg-light',
  },
});

const DrawerHeader = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    height: '5.6rem',
    paddingInline: '16',
    borderBottom: '1px solid',
    borderColor: 'layout.default-line',
  },
});

const DrawerBrand = styled('span', {
  base: {
    textStyle: 'body.medium-bold',
    color: 'text.heading',
  },
});

const DrawerBody = styled('nav', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    padding: '16',
  },
});

const MenuLink = styled(Link, {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    paddingBlock: '12',
    textStyle: 'body.large-normal',
    color: 'text.default',
    textDecoration: 'none',
  },
});

const MenuExternal = styled('a', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    paddingBlock: '12',
    textStyle: 'body.large-normal',
    color: 'text.default',
    textDecoration: 'none',
  },
});

const GithubMark = styled('span', {
  base: {
    display: 'inline-flex',
    fontSize: '2rem',
  },
});

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <Trigger
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Icon name="menu" />
      </Trigger>
      {open && (
        <Overlay
          role="dialog"
          aria-modal="true"
        >
          <DrawerHeader>
            <DrawerBrand>Vinyl UI</DrawerBrand>
            <Trigger
              type="button"
              aria-label="Close menu"
              onClick={close}
            >
              <Icon name="x" />
            </Trigger>
          </DrawerHeader>
          <DrawerBody>
            <SearchBox />
            <MenuLink
              href="#"
              onClick={close}
            >
              Docs
            </MenuLink>
            <MenuLink
              href="#"
              onClick={close}
            >
              Changelog
            </MenuLink>
            <MenuExternal
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              <GithubMark>
                <GithubIcon />
              </GithubMark>
              GitHub
            </MenuExternal>
          </DrawerBody>
        </Overlay>
      )}
    </>
  );
}
