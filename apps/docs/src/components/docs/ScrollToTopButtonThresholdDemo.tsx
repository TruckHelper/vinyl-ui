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

export default function ScrollToTopButtonThresholdDemo() {
  return (
    <Row>
      <ScrollToTopButtonFrame label="threshold={500}">
        <ScrollToTopButton threshold={500} />
      </ScrollToTopButtonFrame>
      <ScrollToTopButtonFrame label="threshold={700}">
        <ScrollToTopButton threshold={700} />
      </ScrollToTopButtonFrame>
      <ScrollToTopButtonFrame label="threshold={900}">
        <ScrollToTopButton threshold={900} />
      </ScrollToTopButtonFrame>
    </Row>
  );
}
