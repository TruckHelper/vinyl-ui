import { Button } from '@bigmobility/vinyl-ui/button';

import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

import GithubButton from './GithubButton';

const Section = styled('section', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingInline: '16',
    paddingBlock: '48',
    backgroundColor: 'layout.bg-light',
    tablet: {
      paddingInline: '80',
      paddingBlock: '100',
    },
  },
});

const Card = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16',
    padding: '24',
    width: '100%',
    border: '1px solid',
    borderRadius: '16',
    borderColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light-gray',
    textAlign: 'center',
    tablet: {
      padding: '48',
      width: '76rem',
      maxWidth: '100%',
    },
  },
});

const Title = styled('h2', {
  base: {
    textStyle: 'heading.large-bold',
    color: 'text.heading',
    tablet: { textStyle: 'heading.section-cta' },
  },
});

const Subtitle = styled('p', {
  base: {
    textStyle: 'body.medium-normal',
    color: 'text.default',
  },
});

const Actions = styled('div', {
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

const primaryButton = css({
  width: '100%',
  tablet: { width: 'auto' },
});

const githubButton = css({
  display: 'none',
  tablet: { display: 'inline-flex' },
});

export default function CtaBanner() {
  return (
    <Section>
      <Card>
        <Title>Start building with Vinyl UI today</Title>
        <Subtitle>
          Deploy consistent, structured async handlers across all micro-frontends
          with standard team configurations out of the box.
        </Subtitle>
        <Actions>
          <Button
            variant="primary"
            className={primaryButton}
          >
            Get Started
          </Button>
          <GithubButton className={githubButton}>View on GitHub</GithubButton>
        </Actions>
      </Card>
    </Section>
  );
}
