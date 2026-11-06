import { ScrollToTopButton } from '@bigmobility/vinyl-ui/floating-action-button';

import { styled } from 'styled-system/jsx';

import ScrollToTopButtonFrame from './ScrollToTopButtonFrame';

const Row = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16',
  },
});

export default function ScrollToTopButtonBehaviorDemo() {
  return (
    <Row>
      <ScrollToTopButtonFrame label={'behavior="smooth"'}>
        <ScrollToTopButton
          threshold={-1}
          behavior="smooth"
        />
      </ScrollToTopButtonFrame>
      <ScrollToTopButtonFrame label={'behavior="instant"'}>
        <ScrollToTopButton
          threshold={-1}
          behavior="instant"
        />
      </ScrollToTopButtonFrame>
      <ScrollToTopButtonFrame label={'behavior="auto"'}>
        <ScrollToTopButton
          threshold={-1}
          behavior="auto"
        />
      </ScrollToTopButtonFrame>
    </Row>
  );
}
