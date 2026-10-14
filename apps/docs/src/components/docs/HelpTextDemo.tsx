import { HelpText } from '@bigmobility/vinyl-ui/help-text';

import { styled } from 'styled-system/jsx';

const Grid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    alignItems: 'center',
    gap: '16',
  },
});

export default function HelpTextDemo() {
  return (
    <Grid>
      <HelpText>기본 안내 문구</HelpText>
      <HelpText type="text">기본 안내 문구</HelpText>
      <HelpText state="notice-warning">확인이 필요한 문구</HelpText>
      <HelpText
        state="notice-warning"
        type="text"
      >
        확인이 필요한 문구
      </HelpText>
      <HelpText state="notice-error">오류 안내 문구</HelpText>
      <HelpText
        state="notice-error"
        type="text"
      >
        오류 안내 문구
      </HelpText>
    </Grid>
  );
}
