import { defineConfig } from "@pandacss/dev";

import { preset } from "./src/preset";

export default defineConfig({
  presets: [preset],
  preflight: true,
  jsxFramework: "react",
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
});
