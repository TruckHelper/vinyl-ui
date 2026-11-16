import { ScrollToTopButton } from '@bigmobility/vinyl-ui/floating-action-button';

import ScrollToTopButtonFrame from './ScrollToTopButtonFrame';

export default function ScrollToTopButtonDisabledDemo() {
  return (
    <ScrollToTopButtonFrame label="disabled">
      <ScrollToTopButton
        threshold={-1}
        disabled
      />
    </ScrollToTopButtonFrame>
  );
}
