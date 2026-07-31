import type { ReactNode } from 'react';

import { styled } from 'styled-system/jsx';

const Root = styled('section', {
  base: {
    marginBlock: '32',
  },
});

const Heading = styled('h2', {
  base: {
    textStyle: 'heading.large-bold',
    marginBottom: '8',
    color: 'text.heading',
    scrollMarginTop: '8rem',
  },
});

const Description = styled('p', {
  base: {
    textStyle: 'body.medium-normal',
    marginBottom: '16',
    color: 'text.soft',
  },
});

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '');
}

export default function Section({
  title,
  id,
  description,
  children,
}: {
  title: string;
  id?: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  const anchor = id ?? slugify(title);

  return (
    <Root>
      <Heading id={anchor}>{title}</Heading>
      {description ? <Description>{description}</Description> : null}
      {children}
    </Root>
  );
}
