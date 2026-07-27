import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

import { InstallBox } from './InstallBox';
import { GithubButton } from './GithubButton';

const Section = styled('section', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24',
    paddingInline: '16',
    paddingBlock: '48',
    width: '100%',
    backgroundColor: 'layout.bg-light',
    tablet: {
      gap: '32',
      paddingInline: '80',
      paddingBlock: '120',
    },
  },
});

const Copy = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16',
    width: '100%',
    textAlign: 'center',
    tablet: {
      gap: '24',
      width: '76rem',
      maxWidth: '100%',
    },
  },
});

const Title = styled('h1', {
  base: {
    textStyle: 'heading.xlarge-bold',
    color: 'text.heading',
    tablet: { textStyle: 'heading.hero' },
  },
});

const Subtitle = styled('p', {
  base: {
    textStyle: 'body.small-normal',
    color: 'text.default',
    tablet: { textStyle: 'body.large-normal' },
  },
});

const Ctas = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '12',
    width: '100%',
    tablet: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 'auto',
    },
  },
});

const ctaButton = css({
  width: '100%',
  tablet: { width: 'auto' },
});

export function Hero() {
  return (
    <Section>
      <Copy>
        <Title>A React + Panda CSS component library</Title>
        <Subtitle>
          Build consistent UIs with design tokens, accessible components, and
          TypeScript support-powered by Panda CSS.
        </Subtitle>
      </Copy>
      <Ctas>
        <GithubButton className={ctaButton}>GitHub</GithubButton>
      </Ctas>
      <InstallBox />
    </Section>
  );
}
