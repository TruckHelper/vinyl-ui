import { Icon } from '@bigmobility/vinyl-ui/icon';
import { ResultState, ResultStateDescription, ResultStateTitle } from '@bigmobility/vinyl-ui/result-state';

import { styled } from 'styled-system/jsx';

const ResultIcon = styled(Icon, {
  base: { fontSize: '8rem', color: 'layout.primary' },
});

export default function ResultStateDemo() {
  return (
    <ResultState>
      <ResultIcon name="send" />
      <ResultStateTitle>신청이 접수됐어요</ResultStateTitle>
      <ResultStateDescription>검토가 끝나면 알림으로 알려 드려요</ResultStateDescription>
    </ResultState>
  );
}
