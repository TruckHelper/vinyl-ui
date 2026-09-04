import { readFileSync, writeFileSync } from 'node:fs';

import { defineConfig } from 'tsup';

const CLIENT_ENTRIES = ['field', 'select', 'accordion'];

export default defineConfig({
  entry: {
    field: 'src/field.ts',
    select: 'src/select.ts',
    accordion: 'src/accordion.ts',
    button: 'src/button.ts',
    icon: 'src/icon.ts',
    'preset/index': 'src/preset/index.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  minify: false,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom', '@ark-ui/react', /^lucide-react(\/.*)?$/],
  esbuildOptions(options) {
    options.resolveExtensions = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.css', '.json'];
  },
  onSuccess: async () => {
    for (const name of CLIENT_ENTRIES) {
      const file = `dist/${name}.js`;
      const code = readFileSync(file, 'utf8');
      if (!code.startsWith('\'use client\'')) {
        writeFileSync(file, `'use client';\n${code}`);
      }
    }
  },
});
