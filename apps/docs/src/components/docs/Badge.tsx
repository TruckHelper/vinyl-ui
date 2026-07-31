import { styled } from 'styled-system/jsx';

const Badge = styled('span', {
  base: {
    textStyle: 'body.xsmall-light',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4',
    paddingBlock: '2',
    paddingInline: '8',
    borderRadius: '9999px',
    color: 'text.soft',
    backgroundColor: 'layout.bg-light-gray',
    whiteSpace: 'nowrap',
  },
});

export default Badge;
