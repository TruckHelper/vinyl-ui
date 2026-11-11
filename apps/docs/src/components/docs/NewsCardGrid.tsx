import { styled } from 'styled-system/jsx';

const NewsCardGrid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: { base: 'minmax(0, 1fr)', tablet: 'repeat(3, minmax(0, 1fr))' },
    gap: '24',
    width: '100%',
  },
});

export default NewsCardGrid;
