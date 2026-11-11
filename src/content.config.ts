import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ニュース・ブログ共通のフロントマター（すべて省略可能）
const post = z.object({
  title: z.string().optional(), // 省略時: 本文先頭の「# 見出し」→ ファイル名
  date: z.coerce.date().optional(), // 省略時: ファイル名先頭の YYYY-MM-DD
  category: z.string().optional(),
  description: z.string().optional(), // 省略時: 本文冒頭から自動生成
  thumbnail: z.string().optional(), // 省略時: タイトル入りサムネイルを自動生成
  draft: z.boolean().default(false), // true の間は本番に公開されない
});

// 「_」で始まるファイル（_template.md など）は公開対象外
const pattern = '**/[^_]*.md';

export const collections = {
  news: defineCollection({ loader: glob({ pattern, base: './src/content/news' }), schema: post }),
  blog: defineCollection({ loader: glob({ pattern, base: './src/content/blog' }), schema: post }),
  pages: defineCollection({
    loader: glob({ pattern, base: './src/content/pages' }),
    schema: z.object({
      title: z.string(),
      titleEn: z.string().optional(),
      description: z.string().optional(),
      updated: z.string().optional(),
    }),
  }),
};
