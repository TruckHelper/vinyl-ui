import { styled } from 'styled-system/jsx';

const Ul = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    paddingLeft: '20',
    marginBlock: '12',
    listStyleType: 'disc',
  },
});

export default Ul;
