import { Caption } from '@bigmobility/vinyl-ui/caption';

import { styled } from 'styled-system/jsx';

const NoticeCaption = styled(Caption, {
  base: { _before: { content: '"※" / ""' } },
});

const PlainCaption = styled(Caption, {
  base: {
    paddingInlineStart: 0,
    _before: { content: 'none' },
  },
});

export default function CaptionDemo() {
  return (
    <div>
      <Caption>기본 마커</Caption>
      <NoticeCaption>교체된 마커</NoticeCaption>
      <PlainCaption>마커 없음</PlainCaption>
    </div>
  );
}
