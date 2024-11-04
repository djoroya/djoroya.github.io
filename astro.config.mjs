import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import react from "@astrojs/react";
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: "https://djoroya.github.io",
  integrations: [tailwind(), mdx(), sitemap(), icon(), react(), mdx()],
});
