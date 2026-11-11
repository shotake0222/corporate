# 合同会社in One's コーポレートサイト

[Astro](https://astro.build/) で作った静的サイトです。GitHub に push すると Cloudflare が自動でビルド・公開します。
ニュースとブログは **Markdown ファイルを置くだけ** で更新できます。

- [ページ構成](#ページ構成)
- [ニュース・ブログの更新方法](#ニュースブログの更新方法)
- [文言・会社情報などの編集場所](#文言会社情報などの編集場所)
- [手元での確認](#手元での確認)
- [Cloudflare へのデプロイ](#cloudflare-へのデプロイ)
- [公開前に確認すること](#公開前に確認すること)

---

## ページ構成

| URL | 内容 | 元になるファイル |
| --- | --- | --- |
| `/` | トップ（メインビュー / News / Message / Media / Blog / Service / Company / Contact） | `src/pages/index.astro` |
| `/news/`・`/news/◯◯/` | ニュース一覧・詳細 | `src/content/news/*.md` |
| `/blog/`・`/blog/◯◯/` | ブログ一覧・詳細 | `src/content/blog/*.md` |
| `/company/` | 会社概要 | `src/data/site.ts` の `company` |
| `/contact/` | お問い合わせ（Formspree） | `src/pages/contact.astro` |
| `/privacy/` | 個人情報保護方針 | `src/content/pages/privacy.md` |
| `/policy/` | サイトポリシー | `src/content/pages/policy.md` |

---

## ニュース・ブログの更新方法

### 1. ファイルを置く

| 種類 | 置き場所 |
| --- | --- |
| ニュース | `src/content/news/` |
| ブログ | `src/content/blog/` |

ファイル名は **`日付-英数字の名前.md`** にします（例：`2026-12-01-new-service.md`）。
ファイル名（拡張子を除く）がそのまま URL になります → `/news/2026-12-01-new-service/`

各フォルダの `_template.md` をコピーして書き始めるのが簡単です（`_` で始まるファイルは公開されません）。

### 2. 書き方

```markdown
---
title: 新サービス提供開始のお知らせ
date: 2026-12-01
category: プレスリリース
---

ここから本文です。空行をはさむと段落が分かれます。

## 見出し（大）

本文です。**太字**、[リンク](https://example.com) が使えます。

### 見出し（小）

- 箇条書き
- 箇条書き

![画像の説明](/images/news/photo.jpg)
```

先頭の `---` で囲んだ部分（フロントマター）が記事の設定です。**すべて省略できます。**

| 項目 | 役割 | 省略した場合 |
| --- | --- | --- |
| `title` | 記事タイトル | 本文の先頭に書いた `# 見出し` → それも無ければファイル名 |
| `date` | 公開日（一覧の並び順にも使用） | ファイル名先頭の `YYYY-MM-DD` |
| `category` | 一覧に出るラベル | ニュースは「お知らせ」、ブログは「ブログ」 |
| `description` | 一覧・検索結果・SNS に出る要約 | 本文の冒頭から自動生成 |
| `thumbnail` | サムネイル画像（例：`/images/blog/xxx.jpg`） | **タイトル入りの画像を自動生成** |
| `draft` | `true` の間は本番に公開しない | `false`（公開） |

**タイトルと見出しのルール**

- タイトルは `title:` に書くのが基本です。フロントマターを書かずに、本文の 1 行目を `# タイトル` にしても同じ結果になります（その行は本文からは自動で取り除かれます）。
- 本文中の見出しは `##`（大）と `###`（小）を使います。`#` は記事タイトル専用です。

つまり、最小構成は次の 2 行だけでも公開できます（ファイル名：`2026-12-01-hello.md`）。

```markdown
# はじめまして

本文です。
```

使える記法の見本は `src/content/blog/sample-markdown.md` にあります。
`draft: true` になっているので本番には出ませんが、`npm run dev` で起動した確認画面では表示されます。

### 3. 画像を入れる

1. 画像を `public/images/news/` または `public/images/blog/` に置く
2. 本文に `![説明文](/images/blog/ファイル名.jpg)` と書く

### 4. サムネイルについて

`thumbnail` を指定しない記事は、**タイトル・日付・カテゴリ・ロゴが入った画像（1200×630）がビルド時に自動で作られます**。
この画像は、ブログ一覧のカードと、SNS で共有されたときの画像（OGP）の両方に使われます。
デザインを変えたいときは `src/lib/og.ts` を編集します。

### 5. 公開する

ファイルを GitHub の `main` ブランチに追加（commit / push、または GitHub の画面から「Add file」）すると、Cloudflare が自動でビルドして 1〜2 分ほどで公開されます。

---

## 文言・会社情報などの編集場所

| 変えたいもの | ファイル |
| --- | --- |
| メインビューのメッセージ、ミッション、ビジョン | `src/data/site.ts`（`hero` / `mission` / `vision`） |
| 代表メッセージ | `src/content/pages/message.md`（`title` が大きな見出し。`／` の位置で改行） |
| 代表者名、ポートフォリオ・SNS のリンク | `src/data/site.ts`（`representative`） |
| 会社概要の項目 | `src/data/site.ts`（`company`）※ `value` を `''` にすると「準備中」と表示 |
| メディア掲載（ロゴ・リンク先） | `src/data/media.ts` ＋ `public/images/media/` |
| サービス一覧（ロゴ・リンク先） | `src/data/services.ts` ＋ `public/images/service/` |
| メニューの項目 | `src/data/site.ts`（`nav`） |
| 個人情報保護方針 / サイトポリシー | `src/content/pages/privacy.md` / `policy.md` |
| お問い合わせフォームの項目 | `src/pages/contact.astro` |
| フォームの送信先（Formspree） | `src/data/site.ts`（`site.contactEndpoint`） |
| 色・フォント | `src/styles/global.css` 冒頭の `:root` |
| ロゴ画像 | `public/images/logo/` |

### メディア掲載のリンクを PDF に差し替える

1. PDF を `public/pdf/` に置く（例：`public/pdf/magazine-summit.pdf`）
2. `src/data/media.ts` の該当行の `url` を `'/pdf/magazine-summit.pdf'` に書き換える

`url` を `''`（空）にした項目は、リンクなしでロゴだけ表示されます。

### 規程ページを増やす

`src/content/pages/` に Markdown を追加すると、`/ファイル名/` で公開されます（例：`terms.md` → `/terms/`）。
フッターにリンクを出す場合は `src/components/Footer.astro` に 1 行追加してください。

---

## 手元での確認

Node.js 22.23.4 以上が必要です。

```bash
npm install
```

```bash
npm run dev
```

`http://localhost:4321` で確認できます（`draft: true` の記事も表示されます）。

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 確認用サーバーを起動（保存すると自動で反映） |
| `npm run build` | 本番用にビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果を手元で表示 |
| `npm run check` | 型・構文チェック |
| `npm run deploy` | ビルドして Cloudflare に手動デプロイ |

---

## Cloudflare へのデプロイ

サーバー処理のない静的サイトとして、Cloudflare Workers（静的アセット配信）で公開します。設定は `wrangler.jsonc` にあります。

### GitHub と連携して自動デプロイする（推奨）

1. Cloudflare ダッシュボード →「Workers & Pages」→「作成」→「Git リポジトリをインポート」
2. GitHub の `shotake0222/corporate` を選択
3. ビルド設定を次のとおりにする

   | 項目 | 値 |
   | --- | --- |
   | ビルドコマンド | `npm run build` |
   | デプロイコマンド | `npx wrangler deploy` |
   | ルートディレクトリ | `/`（そのまま） |

4. 「変数とシークレット」（ビルド用）に `SITE_URL` を追加し、公開 URL を設定する（例：`https://example.co.jp`）
5. 保存してデプロイ。以降は `main` に push するたびに自動で公開されます

Node.js のバージョンは `.nvmrc` / `.node-version` で指定しています。

### 独自ドメイン

Cloudflare の該当 Worker →「設定」→「ドメインとルート」→「カスタムドメイン」から追加します。
追加したら、上記の `SITE_URL` を同じドメインに合わせてください（OGP 画像・サイトマップ・canonical の URL に使われます）。

---

## 公開前に確認すること

- [ ] `SITE_URL`（公開 URL）を設定した
- [ ] 会社概要の「準備中」の項目（`src/data/site.ts`）
- [ ] 代表メッセージ、メインビューの文言、ミッション・ビジョン（たたき台です）
- [ ] 個人情報保護方針・サイトポリシーの内容と制定日（ひな形です。必要に応じて専門家の確認を受けてください）
- [ ] お問い合わせフォームからテスト送信し、Formspree 側で受信できること
- [ ] サンプル記事（`src/content/news/2026-11-11-site-open.md`、`src/content/blog/2026-11-11-about-our-name.md`）の内容
- [ ] ロゴ画像：現在は提供いただいた画像から切り出したものです。元データ（SVG / 高解像度 PNG）があれば `public/images/logo/` を差し替えるとより鮮明になります

---

## 技術メモ

- **Astro 7**（静的出力）。Markdown は Astro 標準のプロセッサ（Sätteri）で変換
- フォントは `@fontsource` でセルフホスト（Shippori Mincho / Zen Kaku Gothic New / Cormorant Garamond）
- サムネイル自動生成：`satori` + `@resvg/resvg-js`（`src/lib/og.ts`、`src/pages/og/[...path].png.ts`）
- サイトマップ：`@astrojs/sitemap`（`/sitemap-index.xml`）
- 記事の読み込みと並び替え：`src/lib/posts.ts`、フロントマターの定義：`src/content.config.ts`
