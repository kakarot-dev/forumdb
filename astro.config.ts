import { defineConfig } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://astro.build",
  output: "hybrid",
  adapter: node({
    mode: "middleware",
  }),
});
