import { styled } from 'styled-system/jsx';
import { token } from 'styled-system/tokens';

import Swatch from './Swatch';

const SHADES = ['100', '200', '300', '400', '500', '600', '700', '800'];

const Container = styled('div', {
  base: {
    marginBlock: '12',
  },
});

const Name = styled('p', {
  base: {
    textStyle: 'body.small-bold',
    marginBottom: '6',
    color: 'text.heading',
  },
});

const Row = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8',
  },
});

const Item = styled('div', {
  base: {
    textStyle: 'body.xsmall-light',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2',
    color: 'text.soft',
  },
});

const Hex = styled('span', {
  base: {
    fontSize: '1.1rem',
    fontFamily: 'mono',
    color: 'text.disable',
  },
});

export default function Palette({ name, shades = SHADES }: { name: string; shades?: string[] }) {
  return (
    <Container>
      <Name>{name}</Name>
      <Row>
        {shades.map((shade) => (
          <Item key={shade}>
            <Swatch token={`${name}.${shade}`} />
            {shade}
            <Hex>{token(`colors.${name}.${shade}` as Parameters<typeof token>[0])}</Hex>
          </Item>
        ))}
      </Row>
    </Container>
  );
}
