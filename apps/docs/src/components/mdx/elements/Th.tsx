import { styled } from 'styled-system/jsx';

const Th = styled('th', {
  base: {
    paddingBlock: '10',
    paddingInline: '12',
    borderBottom: '1px solid',
    borderColor: 'layout.default-line',
    color: 'text.heading',
    backgroundColor: 'layout.table-header',
    textAlign: 'left',
    textStyle: 'body.small-bold',
  },
});

export default Th;
