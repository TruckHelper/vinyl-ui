'use client';

import { useState } from 'react';

import { Icon } from '@bigmobility/vinyl-ui/icon';

import { styled } from 'styled-system/jsx';

const COMMAND = 'npm install @bigmobility/vinyl-ui';

const Box = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '68rem',
    maxWidth: '100%',
    padding: '12',
    tablet: { padding: '16' },
    backgroundColor: 'layout.bg-light-gray',
    border: '1px solid',
    borderColor: 'layout.default-line',
    borderRadius: '8',
  },
});

const Command = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    textStyle: 'body.small-normal',
  },
});

const Prompt = styled('span', {
  base: {
    color: 'text.accent-primary',
  },
});

const Text = styled('span', {
  base: {
    color: 'text.heading',
  },
});

const CopyButton = styled('button', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '1.6rem',
    color: 'text.default',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: { color: 'text.heading' },
  },
});

export default function InstallBox() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box>
      <Command>
        <Prompt>$</Prompt>
        <Text>{COMMAND}</Text>
      </Command>
      <CopyButton
        type="button"
        onClick={handleCopy}
        aria-label="Copy install command"
      >
        <Icon name={copied ? 'check' : 'copy'} />
      </CopyButton>
    </Box>
  );
}
