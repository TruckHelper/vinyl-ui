import { EmptyState, EmptyStateDescription, EmptyStateTitle } from '@bigmobility/vinyl-ui/empty-state';
import { Icon } from '@bigmobility/vinyl-ui/icon';

import { styled } from 'styled-system/jsx';

const EmptyIcon = styled(Icon, {
  base: { fontSize: '8rem', color: 'text.soft' },
});

export default function EmptyStateDemo() {
  return (
    <EmptyState>
      <EmptyIcon name="inbox" />
      <EmptyStateTitle>받은 알림이 없어요</EmptyStateTitle>
      <EmptyStateDescription>새 알림이 오면 여기에 표시돼요</EmptyStateDescription>
    </EmptyState>
  );
}
