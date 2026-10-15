export type PackageId =
  | 'gesamt'
  | 'dj-licht-ton'
  | 'licht-ton'
  | 'licht'
  | 'dj-licht'
  | 'dj';

export type Channel = 'licht' | 'ton' | 'dj';

export const channelLabels: Record<Channel, string> = {
  licht: 'Licht',
  ton: 'Ton',
  dj: 'DJ',
};

export interface PackageInfo {
  id: PackageId;
  channels: Channel[];
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
    channels: ['licht', 'ton', 'dj'],
    name: 'Gesamtpaket',
    tagline: 'Das komplette Erlebnis',
    description:
      'DJ, Licht- und Tontechnik aus einer Hand. Wir übernehmen die komplette technische Umsetzung Ihres Events – vom Konzept bis zur letzten Minute.',
    features: [
      'Erfahrener DJ mit umfangreicher Musikbibliothek',
      'Lichtanlage mit Moving Heads & Effekten',
      'Tontechnik für bis zu 200 Gäste',
      'Traversensystem',
      'Nebel- und Effektmaschinen',
      'Persönliche Vorabstimmung & Eventplanung',
    ],
    badge: 'Empfehlung',
    highlighted: true,
    icon: 'Sparkles',
  },
  {
    id: 'dj-licht-ton',
    channels: ['licht', 'ton', 'dj'],
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
    channels: ['licht', 'ton'],
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
    channels: ['licht'],
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
    channels: ['licht', 'dj'],
    name: 'DJ & Licht Paket',
    tagline: 'Stimmung und Beats',
    description:
      'DJ-Service mit passender Lichttechnik. Die Kombination für ausgelassene Partys ohne großen Ton-Aufwand.',
    features: [
      'Erfahrener DJ',
      'Lichtanlage für Party-Atmosphäre',
      'Tontechnik für bis zu 200 Gäste',
      'Auf- und Abbau inklusive',
    ],
    icon: 'Headphones',
  },
  {
    id: 'dj',
    channels: ['dj'],
    name: 'Nur DJ',
    tagline: 'Musik macht die Nacht',
    description:
      'Unser DJ-Service mit eigener kompakter Anlage. Perfekt für kleinere Feiern und private Anlässe.',
    features: [
      'Erfahrener DJ mit großem Repertoire',
      'Tontechnik für bis zu 200 Gäste',
      'Wunschtitel im Vorfeld einreichbar',
      'Persönliche Beratung',
    ],
    icon: 'Disc3',
  },
];

export interface Mood {
  id: string;
  label: string;
  beam: string;
  line: string;
  packageId: PackageId;
}

/** Anlässe für den Licht-Schalter im Hero: Farbe der Scheinwerfer + passende Paket-Empfehlung. */
export const moods: Mood[] = [
  {
    id: 'hochzeit',
    label: 'Hochzeit',
    beam: '#ffd9a3',
    line: 'Warmes, weiches Licht für den ersten Tanz. Danach Party bis zum letzten Song.',
    packageId: 'dj-licht-ton',
  },
  {
    id: 'geburtstag',
    label: 'Geburtstag',
    beam: '#ff5ca8',
    line: 'Bunte Scheinwerfer, Nebel und eine Playlist, die jede Generation auf die Tanzfläche holt.',
    packageId: 'dj-licht',
  },
  {
    id: 'firmenfeier',
    label: 'Firmenfeier',
    beam: '#8fc7ff',
    line: 'Klarer Ton für Reden, dezentes Licht zum Essen und später Stimmung für alle.',
    packageId: 'dj-licht-ton',
  },
  {
    id: 'party',
    label: 'Party',
    beam: '#5cffc8',
    line: 'Traverse, Moving Heads, Nebel und ein DJ, der die Stimmung liest.',
    packageId: 'gesamt',
  },
];
