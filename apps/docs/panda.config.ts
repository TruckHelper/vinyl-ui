import { defineConfig } from '@pandacss/dev';

import { preset } from '@bigmobility/vinyl-ui/preset';

export default defineConfig({
  preflight: true,
  jsxFramework: 'react',
  presets: [preset],
  include: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  exclude: [],
  outdir: 'styled-system',
});
