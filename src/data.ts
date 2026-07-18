export type PackageId =
  | 'gesamt'
  | 'dj-licht-ton'
  | 'licht-ton'
  | 'licht'
  | 'dj-licht'
  | 'dj';

export interface PackageInfo {
  id: PackageId;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
  icon: string;
}

export const packages: PackageInfo[] = [
  {
    id: 'gesamt',
    name: 'Gesamtpaket',
    tagline: 'Das komplette Erlebnis',
    description:
      'DJ, Licht- und Tontechnik aus einer Hand. Wir übernehmen die komplette technische Umsetzung Ihres Events – vom Konzept bis zur letzten Minute.',
    features: [
      'Professioneller DJ mit jahrelanger Erfahrung',
      'Lichtanlage mit Moving Heads & Effekten',
      'Tontechnik für bis zu 300 Gäste',
      'Traversensystem & Bühnenelemente',
      'Nebel- und Effektmaschinen',
      'Persönliche Vorabstimmung & Eventplanung',
    ],
    badge: 'Bestseller',
    highlighted: true,
    icon: 'Sparkles',
  },
  {
    id: 'dj-licht-ton',
    name: 'DJ + Licht + Ton',
    tagline: 'Alles außer Bühne',
    description:
      'DJ-Service kombiniert mit professioneller Licht- und Tontechnik. Perfekt für Hochzeiten, Firmenfeiern und Geburtstage.',
    features: [
      'Erfahrener DJ mit umfangreicher Musikbibliothek',
      'Stimmungsvolle Lichtanlage',
      'Tontechnik für bis zu 200 Gäste',
      'Kabelloses Mikrofon',
      'Auf- und Abbau inklusive',
    ],
    icon: 'Music',
  },
  {
    id: 'licht-ton',
    name: 'Licht & Ton Paket',
    tagline: 'Technik ohne DJ',
    description:
      'Hochwertige Licht- und Tontechnik für Ihre Veranstaltung. Ideal, wenn Sie bereits für Musik sorgen oder eine Band einsetzen.',
    features: [
      'Lichtanlage mit programmierbaren Szenen',
      'Tontechnik für bis zu 200 Gäste',
      'Mischpult & Bühnenmonitore',
      'Techniker vor Ort',
      'Auf- und Abbau inklusive',
    ],
    icon: 'Lightbulb',
  },
  {
    id: 'licht',
    name: 'Nur Licht',
    tagline: 'Atmosphäre pur',
    description:
      'Stimmungsvolle Lichttechnik, die Ihre Location in das perfekte Licht taucht. Von dezent bis Party-Modus.',
    features: [
      'LED-Par-Strahler & Moving Heads',
      'Lichtsteuerung mit DMX',
      'Nebelmaschine optional',
      'Auf- und Abbau inklusive',
      'Anpassbar an jede Location',
    ],
    icon: 'Sun',
  },
  {
    id: 'dj-licht',
    name: 'DJ & Licht Paket',
    tagline: 'Stimmung und Beats',
    description:
      'DJ-Service mit passender Lichttechnik. Die Kombination für ausgelassene Partys ohne großen Ton-Aufwand.',
    features: [
      'Erfahrener DJ',
      'Lichtanlage für Party-Atmosphäre',
      'Kompakte Tonanlage für bis zu 100 Gäste',
      'Auf- und Abbau inklusive',
    ],
    icon: 'Headphones',
  },
  {
    id: 'dj',
    name: 'Nur DJ',
    tagline: 'Musik macht die Nacht',
    description:
      'Unser DJ-Service mit eigener kompakter Anlage. Perfekt für kleinere Feiern und private Anlässe.',
    features: [
      'Erfahrener DJ mit großem Repertoire',
      'Kompakte Tonanlage',
      'Wunschtitel im Vorfeld einreichbar',
      'Persönliche Beratung',
    ],
    icon: 'Disc3',
  },
];

export const galleryImages = [
  {
    url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Konzertbeleuchtung',
    category: 'Lichttechnik',
  },
  {
    url: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'DJ am Deck',
    category: 'DJ Service',
  },
  {
    url: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Bühnentechnik',
    category: 'Tontechnik',
  },
  {
    url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Club-Atmosphäre',
    category: 'Lichttechnik',
  },
  {
    url: 'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Moving Heads',
    category: 'Lichttechnik',
  },
  {
    url: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Hochzeits-Setup',
    category: 'Eventtechnik',
  },
  {
    url: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Festival-Stimmung',
    category: 'DJ Service',
  },
  {
    url: 'https://images.pexels.com/photos/1540404/pexels-photo-1540404.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Mischpult',
    category: 'Tontechnik',
  },
];
