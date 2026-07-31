import { styled } from 'styled-system/jsx';

const Box = styled('span', {
  base: {
    display: 'inline-block',
    width: '6rem',
    height: '6rem',
    border: '1px solid',
    borderRadius: '0.4rem',
    borderColor: 'layout.default-line',
    verticalAlign: 'middle',
  },
});

export default function Swatch({ token }: { token: string }) {
  const cssVar = `--colors-${token.split('.').join('-')}`;

  return (
    <Box style={{ backgroundColor: `var(${cssVar})` }} />
  );
}
