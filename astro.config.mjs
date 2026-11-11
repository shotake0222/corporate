// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { stripLeadingH1, externalLinks } from './src/lib/markdown-plugins.mjs';

// 公開URL（OGP画像・サイトマップ・canonical に使われます）。
// Cloudflare のビルド変数 SITE_URL が優先されます。独自ドメインが決まったら、そちらを書き換えてください。
const SITE_URL = process.env.SITE_URL || 'https://corporate.straid-nfc-companion.workers.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  markdown: {
    processor: satteri({
      mdastPlugins: [stripLeadingH1],
      hastPlugins: [externalLinks],
    }),
  },
});
