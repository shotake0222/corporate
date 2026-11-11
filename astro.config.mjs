// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { stripLeadingH1, externalLinks } from './src/lib/markdown-plugins.mjs';

// 公開URL。独自ドメインが決まったら Cloudflare のビルド環境変数 SITE_URL に設定するか、
// 下の既定値を書き換えてください（OGP画像・サイトマップ・canonical に使われます）。
const SITE_URL = process.env.SITE_URL || 'https://in-ones-corporate.workers.dev';

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
