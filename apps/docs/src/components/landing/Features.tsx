import { Icon, type IconName } from '@bigmobility/vinyl-ui/icon';

import { styled } from 'styled-system/jsx';

type Feature = {
  icon: IconName;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: 'palette',
    title: 'Design Tokens',
    description:
      'Share colors, spacing, and typography across components with a single source of truth.',
  },
  {
    icon: 'accessibility',
    title: 'Accessible Components',
    description:
      'Built-in ARIA patterns and semantic HTML for better screen reader support and keyboard navigation.',
  },
  {
    icon: 'layers',
    title: 'Panda CSS Integration',
    description:
      'Leverage utility-first styling with a curated set of components that feel native to Panda CSS.',
  },
  {
    icon: 'code',
    title: 'TypeScript Support',
    description:
      'Strongly typed props and auto-completion make it easier to build and refactor your UI.',
  },
];

const Section = styled('section', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32',
    paddingInline: '16',
    paddingBlock: '48',
    width: '100%',
    backgroundColor: 'layout.bg-light-gray',
    tablet: {
      gap: '48',
      paddingInline: '80',
      paddingBlock: '120',
    },
  },
});

const Header = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12',
    width: '100%',
    textAlign: 'center',
    tablet: { width: '68rem', maxWidth: '100%' },
  },
});

const Title = styled('h2', {
  base: {
    textStyle: 'heading.large-bold',
    color: 'text.heading',
  },
});

const Subtitle = styled('p', {
  base: {
    textStyle: 'body.medium-normal',
    color: 'text.default',
  },
});

const Grid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '24',
    width: '100%',
    tablet: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      width: '68rem',
      maxWidth: '100%',
    },
  },
});

const Card = styled('article', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12',
    padding: '24',
    backgroundColor: 'layout.bg-light',
    border: '1px solid',
    borderColor: 'layout.default-line',
    borderRadius: '16',
  },
});

const IconBadge = styled('span', {
  base: {
    fontSize: '2rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4rem',
    height: '4rem',
    borderRadius: '8',
    color: 'layout.emphasis',
    backgroundColor: 'layout.bg-light-blue',
  },
});

const CardTitle = styled('h3', {
  base: {
    textStyle: 'heading.medium-bold',
    color: 'text.heading',
  },
});

const CardDescription = styled('p', {
  base: {
    textStyle: 'body.small-normal',
    color: 'text.default',
  },
});

export default function Features() {
  return (
    <Section>
      <Header>
        <Title>Why Vinyl UI?</Title>
        <Subtitle>
          Everything you need to keep your React UI consistent, accessible, and
          maintainable.
        </Subtitle>
      </Header>
      <Grid>
        {FEATURES.map((feature) => (
          <Card key={feature.title}>
            <IconBadge>
              <Icon name={feature.icon} />
            </IconBadge>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
