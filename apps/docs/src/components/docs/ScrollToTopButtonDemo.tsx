import { ScrollToTopButton } from '@bigmobility/vinyl-ui/floating-action-button';

import ScrollToTopButtonFrame from './ScrollToTopButtonFrame';

export default function ScrollToTopButtonDemo() {
  return (
    <ScrollToTopButtonFrame label="기본">
      <ScrollToTopButton threshold={-1} />
    </ScrollToTopButtonFrame>
  );
}
