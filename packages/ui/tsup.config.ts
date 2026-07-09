import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/preset/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  minify: false,
  external: ["react", "react-dom", "@ark-ui/react"],
});
