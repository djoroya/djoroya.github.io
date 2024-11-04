import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://djoroya.github.io",
  build : {
    assets: "assets"
  },
  integrations: [tailwind(), mdx(), sitemap(), icon(), react(), mdx()],
});
