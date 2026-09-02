import { notFound } from 'next/navigation';

import { styled } from 'styled-system/jsx';

import { source } from '@/lib/source';

import { getMDXComponents } from '@/components/mdx/getMDXComponents';

import DocsToc from '@/components/docs/DocsToc';

const Container = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  },
});

const Article = styled('article', {
  base: {
    flex: '1',
    marginInline: 'auto',
    paddingInline: '24',
    paddingBlock: '32',
    minWidth: '0',
    maxWidth: '80rem',
  },
});

const Title = styled('h1', {
  base: {
    textStyle: 'heading.xxlarge-bold',
    marginBottom: '8',
    color: 'text.heading',
  },
});

const Description = styled('p', {
  base: {
    textStyle: 'body.large-normal',
    marginBottom: '24',
    color: 'text.soft',
  },
});

export function generateStaticParams() {
  return source.generateParams();
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;

  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <Container>
      <Article>
        <Title>{page.data.title}</Title>
        {page.data.description ? (
            <Description>{page.data.description}</Description>
          )
          : null
        }
        <MDX components={getMDXComponents()} />
      </Article>
      <DocsToc toc={page.data.toc} />
    </Container>
  );
}
