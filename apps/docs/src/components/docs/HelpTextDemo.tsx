import { HelpText } from '@bigmobility/vinyl-ui/help-text';

import { styled } from 'styled-system/jsx';

const WarningHelpText = styled(HelpText, {
  base: { backgroundColor: 'layout.bg-pending', color: 'text.pending' },
});

const ErrorHelpText = styled(HelpText, {
  base: { backgroundColor: 'layout.bg-issue', color: 'text.issue' },
});

const PlainHelpText = styled(HelpText, {
  base: { backgroundColor: 'transparent', padding: 0 },
});

const Stack = styled('div', {
  base: { display: 'flex', flexDirection: 'column', gap: '8' },
});

export default function HelpTextDemo() {
  return (
    <Stack>
      <HelpText>기본 안내 문구</HelpText>
      <WarningHelpText>확인이 필요한 문구</WarningHelpText>
      <ErrorHelpText>오류 안내 문구</ErrorHelpText>
      <PlainHelpText>배경 없는 안내 문구</PlainHelpText>
    </Stack>
  );
}
