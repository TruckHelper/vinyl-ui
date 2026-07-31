import { styled } from 'styled-system/jsx';

const Ol = styled('ol', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    marginBlock: '12',
    paddingLeft: '20',
    listStyleType: 'decimal',
  },
});

export default Ol;
