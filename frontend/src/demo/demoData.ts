import type { Language } from '../content/translations';

type LocalizedText = Readonly<Record<Language, string>>;

export type DemoMachineryRecord = Readonly<{
  id: string;
  category: 'tractor' | 'trailer' | 'harvester';
  name: LocalizedText;
  manufacturer: LocalizedText;
  model: LocalizedText;
  dataClassification: 'fictional';
}>;

export type DemoCapabilityRecord = Readonly<{
  id:
    | 'machinery-register'
    | 'maintenance-records'
    | 'tools-and-equipment-stock'
    | 'detailing-records'
    | 'reports'
    | 'document-storage';
  title: LocalizedText;
  description: LocalizedText;
  availability: 'potential';
  dataClassification: 'fictional';
}>;

export const DEMO_DATA_NOTICE = {
  title: {
    en: 'Fictional demonstration data',
    af: 'Fiktiewe demonstrasiedata',
  },
  description: {
    en: 'These invented examples are stored with the website and are not connected to a live farm or customer system.',
    af: 'Hierdie versinde voorbeelde is saam met die webwerf gestoor en is nie aan ’n regstreekse plaas- of klantstelsel gekoppel nie.',
  },
} as const satisfies Readonly<{
  title: LocalizedText;
  description: LocalizedText;
}>;

export const DEMO_MACHINERY_RECORDS = [
  {
    id: 'tractor-01',
    category: 'tractor',
    name: { en: 'Tractor A-01', af: 'Trekker A-01' },
    manufacturer: {
      en: 'Example manufacturer',
      af: 'Voorbeeldvervaardiger',
    },
    model: {
      en: 'Generic utility tractor',
      af: 'Algemene veeldoelige trekker',
    },
    dataClassification: 'fictional',
  },
  {
    id: 'trailer-01',
    category: 'trailer',
    name: { en: 'Trailer B-01', af: 'Sleepwa B-01' },
    manufacturer: {
      en: 'Example manufacturer',
      af: 'Voorbeeldvervaardiger',
    },
    model: {
      en: 'General-purpose trailer',
      af: 'Veeldoelige sleepwa',
    },
    dataClassification: 'fictional',
  },
  {
    id: 'harvester-01',
    category: 'harvester',
    name: { en: 'Harvester C-01', af: 'Oesmasjien C-01' },
    manufacturer: {
      en: 'Example manufacturer',
      af: 'Voorbeeldvervaardiger',
    },
    model: {
      en: 'Generic crop harvester',
      af: 'Algemene oesmasjien',
    },
    dataClassification: 'fictional',
  },
] as const satisfies readonly DemoMachineryRecord[];

export const DEMO_CAPABILITY_RECORDS = [
  {
    id: 'machinery-register',
    title: { en: 'Machinery register', af: 'Masjinerieregister' },
    description: {
      en: 'Illustrative asset records for a farm-defined register.',
      af: 'Illustratiewe bate-rekords vir ’n plaasbepaalde register.',
    },
    availability: 'potential',
    dataClassification: 'fictional',
  },
  {
    id: 'maintenance-records',
    title: { en: 'Maintenance records', af: 'Onderhoudsrekords' },
    description: {
      en: 'Example records only; farms remain responsible for their own maintenance decisions and work.',
      af: 'Slegs voorbeeldrekords; plase bly verantwoordelik vir hul eie onderhoudsbesluite en werk.',
    },
    availability: 'potential',
    dataClassification: 'fictional',
  },
  {
    id: 'tools-and-equipment-stock',
    title: {
      en: 'Tools and equipment stock',
      af: 'Gereedskap- en toerustingvoorraad',
    },
    description: {
      en: 'A sample view of tools and equipment availability.',
      af: '’n Voorbeeld van die beskikbaarheid van gereedskap en toerusting.',
    },
    availability: 'potential',
    dataClassification: 'fictional',
  },
  {
    id: 'detailing-records',
    title: { en: 'Detailing service records', af: 'Detaildiensrekords' },
    description: {
      en: 'Fictional examples of Agrijuune detailing work records.',
      af: 'Fiktiewe voorbeelde van Agrijuune-detailwerkrekords.',
    },
    availability: 'potential',
    dataClassification: 'fictional',
  },
  {
    id: 'reports',
    title: { en: 'Dashboards and reports', af: 'Kontroleskerms en verslae' },
    description: {
      en: 'Illustrative summaries that make no measured performance claims.',
      af: 'Illustratiewe opsommings wat geen gemete prestasie-aansprake maak nie.',
    },
    availability: 'potential',
    dataClassification: 'fictional',
  },
  {
    id: 'document-storage',
    title: { en: 'Document storage', af: 'Dokumentberging' },
    description: {
      en: 'A possible capability, subject to client requirements and consultation.',
      af: '’n Moontlike vermoë, onderhewig aan kliëntvereistes en konsultasie.',
    },
    availability: 'potential',
    dataClassification: 'fictional',
  },
] as const satisfies readonly DemoCapabilityRecord[];
