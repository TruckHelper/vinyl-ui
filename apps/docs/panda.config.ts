import { defineConfig } from '@pandacss/dev';

import { preset } from '@bigmobility/vinyl-ui/preset';

import { docsPreset } from './theme/preset';

export default defineConfig({
  preflight: true,
  jsxFramework: 'react',
  presets: [preset, docsPreset],
  include: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  exclude: [],
  outdir: 'styled-system',
});
