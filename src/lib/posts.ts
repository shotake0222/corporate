import { getCollection, type CollectionEntry } from 'astro:content';

export type PostKind = 'news' | 'blog';

export interface Post {
  kind: PostKind;
  slug: string;
  url: string;
  title: string;
  date: Date;
  category: string;
  description: string;
  /** 一覧カードと og:image に使う画像URL（指定が無ければ自動生成画像） */
  image: string;
  hasCustomThumbnail: boolean;
  draft: boolean;
  entry: CollectionEntry<PostKind>;
}

const DEFAULT_CATEGORY: Record<PostKind, string> = { news: 'お知らせ', blog: 'ブログ' };

function plainText(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s*(?:[-*+>]|\d+\.)\s+/gm, '')
    .replace(/[*_`~|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function toPost(kind: PostKind, entry: CollectionEntry<PostKind>): Post {
  const body = entry.body ?? '';
  const slug = entry.id;

  const h1 = body.match(/^\s*#\s+(.+?)\s*$/m)?.[1];
  const title = entry.data.title ?? h1 ?? slug;

  let date = entry.data.date;
  if (!date) {
    const m = slug.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (!m) {
      throw new Error(
        `[${kind}/${slug}.md] 日付がありません。フロントマターに「date: 2026-01-01」を書くか、ファイル名を「2026-01-01-xxx.md」の形にしてください。`,
      );
    }
    date = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  }

  const text = plainText(body);
  const description = entry.data.description ?? (text.length > 110 ? `${text.slice(0, 110)}…` : text);

  return {
    kind,
    slug,
    url: `/${kind}/${slug}/`,
    title,
    date,
    category: entry.data.category ?? DEFAULT_CATEGORY[kind],
    description,
    image: entry.data.thumbnail ?? `/og/${kind}/${slug}.png`,
    hasCustomThumbnail: Boolean(entry.data.thumbnail),
    draft: entry.data.draft,
    entry,
  };
}

/** 公開対象の記事を新しい順で返す（draft: true は開発時のみ表示） */
export async function getPosts(kind: PostKind): Promise<Post[]> {
  const entries = await getCollection(kind);
  return entries
    .map((e) => toPost(kind, e))
    .filter((p) => !p.draft || import.meta.env.DEV)
    .sort((a, b) => b.date.getTime() - a.date.getTime() || a.slug.localeCompare(b.slug));
}

export function formatDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
