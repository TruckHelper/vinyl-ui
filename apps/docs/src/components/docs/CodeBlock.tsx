'use client';

import { Icon } from '@bigmobility/vinyl-ui/icon';
import type { ComponentPropsWithoutRef } from 'react';
import { useRef } from 'react';

import { styled } from 'styled-system/jsx';

import { useCopy } from '@/hooks/useCopy';

const Figure = styled('figure', {
  base: {
    margin: '0',
    marginBlock: '16',
    border: '1px solid',
    borderRadius: '0.8rem',
    borderColor: 'layout.default-line',
    overflow: 'hidden',
  },
});

const Header = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8',
    paddingBlock: '8',
    paddingInline: '12',
    borderBottom: '1px solid',
    borderColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light-gray',
  },
});

const Dots = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '6',
  },
});

const Dot = styled('span', {
  base: {
    display: 'block',
    width: '1rem',
    height: '1rem',
    borderRadius: '9999px',
  },
  variants: {
    tone: {
      red: { backgroundColor: 'traffic.red' },
      yellow: { backgroundColor: 'traffic.yellow' },
      green: { backgroundColor: 'traffic.green' },
    },
  },
});

const CopyButton = styled('button', {
  base: {
    fontSize: '1.6rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2',
    borderRadius: '0.4rem',
    color: 'text.soft',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: { color: 'text.heading' },
  },
});

const Pre = styled('pre', {
  base: {
    fontFamily: 'mono',
    fontSize: '1.4rem',
    lineHeight: '1.6',
    margin: '0',
    padding: '16',
    overflowX: 'auto',
  },
});

export default function CodeBlock({ children, ...preProps }: ComponentPropsWithoutRef<'pre'>) {
  const ref = useRef<HTMLPreElement>(null);
  const { copied, copy } = useCopy();

  return (
    <Figure>
      <Header>
        <Dots aria-hidden>
          <Dot tone="red" />
          <Dot tone="yellow" />
          <Dot tone="green" />
        </Dots>
        <CopyButton
          type="button"
          aria-label={copied ? '복사됨' : '코드 복사'}
          onClick={() => copy(ref.current?.textContent ?? '')}
        >
          <Icon name={copied ? 'check' : 'copy'} />
        </CopyButton>
      </Header>
      <Pre
        ref={ref}
        {...preProps}
      >
        {children}
      </Pre>
    </Figure>
  );
}
