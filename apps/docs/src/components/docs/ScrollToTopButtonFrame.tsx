import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx';

const Container = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8',
  },
});

const Box = styled('div', {
  base: {
    position: 'relative',
    boxSizing: 'content-box',
    width: '9.6rem',
    height: '9.6rem',
    border: '1px solid',
    borderRadius: '0.8rem',
    borderColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light-gray',
    transform: 'translateZ(0)',
  },
});

const Label = styled('code', {
  base: {
    textStyle: 'body.small-normal',
    fontFamily: 'mono',
    color: 'text.soft',
  },
});

type ScrollToTopButtonFrameProps = {
  label: ReactNode;
  children: ReactNode;
};

export default function ScrollToTopButtonFrame({ label, children }: ScrollToTopButtonFrameProps) {
  return (
    <Container>
      <Box>{children}</Box>
      <Label>{label}</Label>
    </Container>
  );
}
