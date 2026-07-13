import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/preset/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  minify: false,
  external: ['react', 'react-dom', '@ark-ui/react', /^lucide-react(\/.*)?$/],
  esbuildOptions(options) {
    options.resolveExtensions = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.css', '.json'];
  },
});
