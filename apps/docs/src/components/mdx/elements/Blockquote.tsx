import { styled } from 'styled-system/jsx';

const Blockquote = styled('blockquote', {
  base: {
    marginBlock: '16',
    paddingLeft: '16',
    borderLeft: '3px solid',
    borderColor: 'layout.highlight-line',
    color: 'text.soft',
  },
});

export default Blockquote;
