import type { APIRoute } from 'astro';
import { getPosts, formatDate } from '../../lib/posts';
import { renderOgImage, type OgOptions } from '../../lib/og';
import { hero } from '../../data/site';

// /og/default.png           … サイト共通
// /og/news/<ファイル名>.png  … ニュース記事ごと
// /og/blog/<ファイル名>.png  … ブログ記事ごと
export async function getStaticPaths() {
  const paths: { params: { path: string }; props: OgOptions }[] = [
    { params: { path: 'default' }, props: { title: hero.catch.join(''), label: 'CORPORATE SITE' } },
  ];
  for (const kind of ['news', 'blog'] as const) {
    for (const post of await getPosts(kind)) {
      if (post.hasCustomThumbnail) continue;
      paths.push({
        params: { path: `${kind}/${post.slug}` },
        props: { title: post.title, label: kind.toUpperCase(), meta: `${formatDate(post.date)}　${post.category}` },
      });
    }
  }
  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as OgOptions);
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
