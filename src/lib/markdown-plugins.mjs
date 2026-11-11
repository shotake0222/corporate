// Markdown 変換時の小さな補助プラグイン（Astro 標準の Markdown プロセッサ Sätteri 用）。
import { defineMdastPlugin, defineHastPlugin } from 'satteri';

/**
 * 本文の先頭が「# 見出し」の場合、それを本文から取り除く。
 * タイトルはページ側で <h1> として表示するため、二重表示を防ぐ。
 */
export const stripLeadingH1 = (doc) => {
  const source = doc.source;
  const frontmatter = source.match(/^---\r?\n[\s\S]*?\r?\n---[ \t]*\r?\n?/);
  const bodyStart = frontmatter ? frontmatter[0].length : 0;
  return defineMdastPlugin({
    name: 'strip-leading-h1',
    options: { position: true },
    heading(node, ctx) {
      if (node.depth !== 1) return;
      const offset = node.position?.start?.offset;
      if (typeof offset !== 'number') return;
      if (source.slice(bodyStart, offset).trim() === '') ctx.removeNode(node);
    },
  });
};

/** 外部リンク（http/https）を別タブで開く。 */
export const externalLinks = defineHastPlugin({
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href === 'string' && /^https?:\/\//.test(href)) {
        ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', 'noopener noreferrer');
      }
    },
  },
});
