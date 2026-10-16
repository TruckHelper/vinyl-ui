import { Badge } from '@bigmobility/vinyl-ui/badge';

import { styled } from 'styled-system/jsx';

const SuccessBadge = styled(Badge, {
  base: { backgroundColor: 'layout.bg-light-green', color: 'text.accent-secondary' },
});

const PendingBadge = styled(Badge, {
  base: { backgroundColor: 'layout.bg-pending', color: 'text.pending' },
});

const IssueBadge = styled(Badge, {
  base: { backgroundColor: 'layout.bg-issue', color: 'text.issue' },
});

const DisableBadge = styled(Badge, {
  base: { backgroundColor: 'layout.bg-disable', color: 'text.soft' },
});

export default function BadgeDemo() {
  return (
    <>
      <Badge>처리 중</Badge>
      <SuccessBadge>발급 완료</SuccessBadge>
      <PendingBadge>보완 필요</PendingBadge>
      <IssueBadge>결제 오류</IssueBadge>
      <DisableBadge>취소</DisableBadge>
    </>
  );
}
