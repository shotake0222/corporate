// サービス一覧。表示順 = この配列の順番です。
// logo は public/images/service/ に置いた画像のファイル名。

export interface ServiceItem {
  name: string;
  logo: string;
  url: string;
}

export const services: ServiceItem[] = [
  { name: 'ことたま', logo: 'kototama.png', url: 'https://service.kototama-ar.com/' },
  { name: 'あてんど', logo: 'attend.png', url: 'https://service.attend-ar.com/' },
  { name: 'ふくびく', logo: 'fukubiku.webp', url: 'https://fukubikiu.attend-ar.com/' },
  { name: 'ぐっじょ', logo: 'goodjjo.webp', url: 'https://lp.goodjjo.com/' },
  { name: 'ぽすっと', logo: 'posutto.png', url: 'https://app.posutto.com/lp' },
  { name: 'Value-Pathfinder', logo: 'value-pathfinder.png', url: 'https://lp.value-pathfinder.online/' },
  { name: 'コトヅテ', logo: 'kotozute.webp', url: 'https://koto-zute.com/lp' },
  { name: 'Pagescope', logo: 'pagescope.webp', url: 'https://pagescope.online/' },
  { name: 'Areapulse', logo: 'areapulse.jpg', url: 'https://areapulse.jo/' },
  { name: 'SNAP CARD', logo: 'snap-card.webp', url: 'https://snap-card.org//' },
  { name: 'ぺたる', logo: 'petaru.webp', url: 'https://app.petaruo.com/lp' },
  { name: 'わけたま', logo: 'waketama.png', url: 'https://waketama.com/lp' },
  { name: 'わけたま for Biz', logo: 'waketama.png', url: 'https://waketama.com/biz' },
  { name: '古典曼荼羅', logo: 'koten-mandala.png', url: 'https://kotenmandala.com/' },
  { name: 'News Summoner', logo: 'news-summoner.png', url: 'https://newssummoner.com/business' },
  { name: 'Vunsan', logo: 'vunsan.png', url: 'https://vunsan.com/lp/' },
  { name: 'Terrariumar', logo: 'terrariumar.webp', url: 'https://terrariumar.com/?topic=free#contact' },
  { name: 'Aethermap', logo: 'aethermap.webp', url: 'https://aethermap.jp/lp/' },
];
