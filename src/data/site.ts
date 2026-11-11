// サイト全体で使う文言・設定。会社情報やコピーを直したいときは、まずこのファイルを編集します。

export const site = {
  name: "合同会社in One's",
  shortName: "in One's",
  nameEn: "in One's LLC",
  title: "合同会社in One's｜各々の想いを、各々のかたちに。",
  description:
    "合同会社in One's（イン ワンズ）のコーポレートサイトです。「各々の」という社名のとおり、人や企業それぞれの中にある想いと強みを、戦略とテクノロジーでかたちにします。",
  contactEndpoint: 'https://formspree.io/f/mwloeoql',
};

/** メインビュー（トップページ最上部）の文言 */
export const hero = {
  eyebrowEn: "in One's",
  eyebrowJa: '各々の',
  // 改行したい位置で配列を分けます
  catch: ['各々の想いを、', '各々のかたちに。'],
  lead: "人にも企業にも、それぞれにしかない想いと強みがあります。in One's は、その一つひとつに向き合い、戦略とテクノロジーの力で、社会に届くかたちへと育てていきます。",
};

export const mission = {
  heading: '各々の中にある価値を、戦略でかたちに。',
  body: '人や企業の中に眠る想いと強みを見つけ出し、事業戦略とテクノロジーの力で、社会に届くかたちへと育てます。',
};

export const vision = {
  heading: '誰もが、各々の歩幅で前へ進める社会へ。',
  body: '最先端の技術も、受け継がれてきたレガシーも等しく大切にしながら、一人ひとり・一社一社が自分らしく歩める未来をつくります。',
};

/** グローバルナビゲーション */
export const nav = [
  { label: 'NEWS', ja: 'ニュース', href: '/news/' },
  { label: 'MESSAGE', ja: '代表メッセージ', href: '/#message' },
  { label: 'MEDIA', ja: 'メディア掲載', href: '/#media' },
  { label: 'BLOG', ja: 'ブログ', href: '/blog/' },
  { label: 'SERVICE', ja: 'サービス', href: '/#service' },
  { label: 'COMPANY', ja: '会社概要', href: '/company/' },
];

/** 代表プロフィールのリンク */
export const representative = {
  name: '武林 勝太郎',
  role: "合同会社in One's 代表",
  portfolios: [
    { label: 'ビジネスポートフォリオ', href: 'https://biz.shotarotakebayashi.com/' },
    { label: 'フォトグラファーポートフォリオ', href: 'https://shotarotakebayashi.com/' },
  ],
  sns: [
    { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61588369074807' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/shotaro_takebayashi02?igsh=ejcxbHlhMDRsc3Bv' },
    { id: 'x', label: 'X', href: 'https://x.com/shotaro_take' },
    { id: 'threads', label: 'Threads', href: 'https://www.threads.com/@shotaro_takebayashi02' },
    { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@straid_shotake?_r=1&_t=ZS-97nXvCYfpDA' },
  ],
};

/**
 * 会社概要。value を '' のままにすると「準備中」と表示されます。
 * 行を増やす・減らす・並べ替える場合は、この配列を編集してください。
 * value 内の改行（\n）はそのまま改行として表示されます。
 */
export const company: { label: string; value: string; href?: string }[] = [
  { label: '会社名', value: "合同会社in One's" },
  { label: '英文表記', value: "in One's LLC" },
  {
    label: '社名の由来',
    value:
      "「in One's」は「各々の」という意味の言葉です。\nin one's heart（各々の心に）、in one's own way（各々のやり方で）のように、一人ひとり・一社一社の中にあるものを大切にしたい、という想いを込めています。",
  },
  { label: 'ミッション', value: mission.heading },
  { label: 'ビジョン', value: vision.heading },
  { label: '設立', value: '' },
  { label: '代表者', value: '代表社員　武林 勝太郎' },
  { label: '所在地', value: '' },
  { label: '資本金', value: '' },
  {
    label: '事業内容',
    // TODO: 仮の内容（ダミー）。設立完了後、定款の事業目的に合わせて修正する
    value:
      '1. 事業戦略・新規事業の立案および実行支援\n2. XR／AR 技術を活用したサービスの企画・開発・運営\n3. Web サービス・アプリケーションの企画・開発・運営\n4. 写真・映像の撮影および制作\n5. イベントの企画・運営\n6. 前各号に附帯関連する一切の事業',
  },
  { label: '法人番号', value: '' },
  { label: '適格請求書発行事業者登録番号', value: '' },
  { label: '取引銀行', value: '' },
  { label: 'お問い合わせ', value: 'お問い合わせフォームよりご連絡ください', href: '/contact/' },
];
