// メディア掲載一覧。表示順 = この配列の順番です。
// ・url を差し替えるだけでリンク先を変更できます（PDF にする場合は public/pdf/ に置いて '/pdf/xxx.pdf'）
// ・url が '' の項目はリンクなし（ロゴのみ）で表示されます
// ・logo は public/images/media/ に置いた画像のファイル名

export interface MediaItem {
  name: string;
  logo: string;
  url: string;
}

export const mediaNote =
  '※同一ロゴが複数ある場合はリンク先が別の記事となっていますので、ご覧頂ければ幸いです';

export const media: MediaItem[] = [
  { name: 'ビジネスクロニクル', logo: 'business-chronicle.svg', url: 'https://business-chronicle.com/person/straid.php' },
  { name: '週刊エコノミスト', logo: 'economist.svg', url: 'https://business-chronicle.com/person/straid.php' },
  { name: 'マガジンサミット', logo: 'magazine-summit.png', url: 'https://magazinesummit.jp/lifetrend/306420230809' },
  { name: 'ザ・イノベーター', logo: 'the-innovator.webp', url: 'https://the-innovator.jp/interviewees/takebayashi_shotaro/' },
  { name: '経営道', logo: 'keido.png', url: 'https://kei-do.com/space/061/' },
  { name: 'JAPAN QUALITY', logo: 'japan-quality.png', url: 'https://japanpride.jp/person/takebayashi_shotaro/' },
  { name: 'クラウド軍師', logo: 'cloud-gunshi.webp', url: 'https://smallit.co.jp/cloud-gunshi/sales-enablement/' },
  { name: 'クラウド軍師', logo: 'cloud-gunshi.webp', url: 'https://smallit.co.jp/cloud-gunshi/what-is-iso9001/' },
  { name: 'ガジェット通信', logo: 'getnews.svg', url: 'https://getnews.jp/archives/3432147' },
  { name: 'めるも', logo: 'merumo.png', url: 'https://news.merumo.ne.jp/article/genre/12848759' },
  { name: 'エンタメポスト', logo: 'entame-post.png', url: 'https://nordot.app/1061843388922331403?c=414795408717890657' },
  { name: 'StartHome', logo: 'starthome.webp', url: 'https://home.kingsoft.jp/wrapup/ent/magazinesummit/122432.html?from=v3homepage_v2_ent' },
  { name: 'NEWS Collect', logo: 'news-collect.svg', url: 'https://nordot.app/1061843388922331403?c=388701204576175201' },
  { name: 'goo ニュース', logo: 'goo.png', url: 'https://news.goo.ne.jp/article/magazinesummit/trend/magazinesummit-https_editor.magazinesummit.jp_p_122432.html' },
  { name: 'e-start', logo: 'e-start.png', url: 'https://start.jword.jp/magazine/detail/24794?g=magazinesummit' },
  { name: 'dメニューニュース', logo: 'dmenu.png', url: 'https://topics.smt.docomo.ne.jp/article/magazinesummit/trend/magazinesummit-https_editor.magazinesummit.jp_p_122432?redirect=1' },
  { name: 'antenna', logo: 'antenna.webp', url: 'https://antenna.jp/articles/19725548' },
  { name: 'エンタメウィーク', logo: 'entame-week.png', url: 'https://ent.smt.docomo.ne.jp/article/15969693' },
  { name: 'ノアドット', logo: 'nordot.svg', url: 'https://nordot.app/1061843388922331403?c=427849843378390113' },
  { name: 'エンタメプラス', logo: 'entame-plus.png', url: 'https://entameplus.jp/article/index.php?id=1061843388922331403' },
  { name: 'グノシー', logo: 'gunosy.png', url: '' },
];
