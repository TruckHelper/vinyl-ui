import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx';

const Card = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '16',
    marginBlock: '16',
    padding: '24',
    border: '1px solid',
    borderRadius: '1rem',
    borderColor: 'layout.default-line',
    backgroundColor: 'white.default',
  },
});

export default function Preview({ children }: { children: ReactNode }) {
  return (
    <Card>{children}</Card>
  );
}
