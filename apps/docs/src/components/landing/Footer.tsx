import { styled } from 'styled-system/jsx';

const Container = styled('footer', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16',
    width: '100%',
    paddingInline: '16',
    paddingBlock: '32',
    borderTop: '1px solid',
    borderColor: 'layout.default-line',
    backgroundColor: 'layout.bg-light',
    tablet: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingInline: '80',
      paddingBlock: '48',
    },
  },
});

const Wrapper = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12',
  },
});

const Brand = styled('span', {
  base: {
    textStyle: 'body.small-bold',
    color: 'text.strong',
  },
});

const Copyright = styled('span', {
  base: {
    textStyle: 'body.small-normal',
    color: 'text.soft',
  },
});

export default function Footer() {
  return (
    <Container>
      <Wrapper>
        <Brand>Vinyl UI</Brand>
        <Copyright>© 2026 @bigmobility · v1.0.0</Copyright>
      </Wrapper>
    </Container>
  );
}
