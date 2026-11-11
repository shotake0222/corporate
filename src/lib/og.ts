// タイトル入りサムネイル（1200x630 PNG）をビルド時に自動生成する。
// ブログ・ニュースの一覧カードと、SNS共有時の og:image の両方に使われる。
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const root = process.cwd();
const font = (pkg: string, file: string) => readFile(path.join(root, 'node_modules/@fontsource', pkg, 'files', file));

let assets: Promise<{ fonts: any[]; logo: string }> | undefined;

function loadAssets() {
  assets ??= (async () => {
    const [mincho, gothic, serifEn, logoBuf] = await Promise.all([
      font('shippori-mincho', 'shippori-mincho-japanese-600-normal.woff'),
      font('zen-kaku-gothic-new', 'zen-kaku-gothic-new-japanese-500-normal.woff'),
      font('cormorant-garamond', 'cormorant-garamond-latin-500-normal.woff'),
      sharp(path.join(root, 'public/images/logo/logo-horizontal-white.webp')).resize({ width: 560 }).png().toBuffer(),
    ]);
    return {
      fonts: [
        { name: 'Cormorant', data: serifEn, weight: 500, style: 'normal' },
        { name: 'Mincho', data: mincho, weight: 600, style: 'normal' },
        { name: 'Gothic', data: gothic, weight: 500, style: 'normal' },
      ],
      logo: `data:image/png;base64,${logoBuf.toString('base64')}`,
    };
  })();
  return assets;
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

export interface OgOptions {
  title: string;
  label?: string; // 左上の英字ラベル（BLOG / NEWS など）
  meta?: string; // 左下の補足（日付・カテゴリ）
}

export async function renderOgImage({ title, label = '', meta = '' }: OgOptions): Promise<Buffer> {
  const { fonts, logo } = await loadAssets();
  const len = [...title].length;
  const fontSize = len <= 16 ? 76 : len <= 28 ? 64 : len <= 44 ? 54 : 46;

  const blob = (style: Record<string, unknown>, color: string) =>
    h('div', {
      position: 'absolute',
      borderRadius: '50%',
      backgroundImage: `radial-gradient(circle at 50% 50%, ${color} 0%, rgba(114,182,223,0) 49%)`,
      ...style,
    });

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      color: '#fff',
      backgroundImage: 'linear-gradient(150deg, #1f6cb5 0%, #1a518a 46%, #123a6b 100%)',
      fontFamily: 'Mincho, Gothic',
      position: 'relative',
    },
    [
      blob({ top: -260, right: -180, width: 820, height: 820 }, 'rgba(142,202,240,0.62)'),
      blob({ bottom: -320, left: -220, width: 760, height: 760 }, 'rgba(63,143,208,0.7)'),
      blob({ top: 180, left: 420, width: 420, height: 420 }, 'rgba(220,237,249,0.22)'),
      // ロゴの円弧モチーフ
      h('div', {
        position: 'absolute',
        top: -150,
        right: -110,
        width: 620,
        height: 620,
        borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.28)',
      }),
      h('div', {
        position: 'absolute',
        top: 388,
        right: 96,
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.9)',
      }),
      h(
        'div',
        {
          position: 'absolute',
          top: 62,
          left: 76,
          width: 1048,
          height: 512,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        [
      // 上段: ラベル
      h('div', { display: 'flex', alignItems: 'center' }, [
        h('div', { width: 56, height: 2, backgroundColor: 'rgba(255,255,255,0.8)', marginRight: 22 }),
        h('div', { fontFamily: 'Cormorant', fontSize: 34, letterSpacing: 10, color: '#dcedf9' }, label),
      ]),
      // 中段: タイトル
      h(
        'div',
        {
          display: 'block',
          maxWidth: 1000,
          fontSize,
          lineHeight: 1.5,
          letterSpacing: 2,
          lineClamp: 3,
          textShadow: '0 4px 24px rgba(8,32,64,0.25)',
        },
        title,
      ),
      // 下段: 日付など + ロゴ
      h('div', { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }, [
        h('div', { fontFamily: 'Gothic', fontSize: 26, letterSpacing: 3, color: '#dcedf9' }, meta),
        h('img', { width: 300, height: 87 }, undefined, { src: logo, width: 300, height: 87 }),
      ]),
        ],
      ),
    ],
  );

  const svg = await satori(tree as any, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  // パレット圧縮でファイルサイズを抑える
  return sharp(png).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
}
