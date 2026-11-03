export type PackageId =
  | 'gesamt'
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
      'Tontechnik passend zu Ihrer Gästezahl',
      'Traversensystem',
      'Nebel- und Effektmaschinen',
      'Persönliche Vorabstimmung & Eventplanung',
    ],
    badge: 'Empfehlung',
    highlighted: true,
    icon: 'Sparkles',
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
      'Tontechnik passend zu Ihrer Gästezahl',
      'Mischpult & Monitorboxen',
      'Techniker vor Ort',
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
      'Tontechnik passend zu Ihrer Gästezahl',
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
      'Tontechnik passend zu Ihrer Gästezahl',
      'Wunschtitel im Vorfeld einreichbar',
      'Persönliche Beratung',
    ],
    icon: 'Disc3',
  },
];

export const WHATSAPP_LINK = `https://wa.me/4915121931491?text=${encodeURIComponent(
  'Hallo DBV Veranstaltungstechnik, ich habe eine Anfrage für ein Event:',
)}`;

/** Wert im Formular, wenn noch kein Paket feststeht. */
export const NO_PACKAGE = 'Noch unsicher, bitte beraten';
