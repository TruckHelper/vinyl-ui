import { Caption } from '@bigmobility/vinyl-ui/caption';

import { styled } from 'styled-system/jsx';

const NoticeCaption = styled(Caption, {
  base: { _before: { content: '"※" / ""' } },
});

const PlainCaption = styled(Caption, {
  base: { _before: { content: 'none' } },
});

const Narrow = styled('div', {
  base: { maxWidth: '32rem' },
});

export default function CaptionDemo() {
  return (
    <Narrow>
      <Caption>기본 마커</Caption>
      <NoticeCaption>교체된 마커</NoticeCaption>
      <NoticeCaption>
        본문이 길어 여러 줄이 되어도 둘째 줄부터 <b>본문 시작 위치</b>에 맞춰집니다.
      </NoticeCaption>
      <PlainCaption>마커 없음</PlainCaption>
    </Narrow>
  );
}
