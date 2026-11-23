import type { RoutePath } from '../routing/routes';

export type Language = 'en' | 'af';

type RouteCopy = {
  label: string;
  title: string;
  description: string;
};

type SharedCopy = {
  closeMenu: string;
  footerNavigationLabel: string;
  footerDescription: string;
  homeLinkLabel: string;
  languageSwitcherLabel: string;
  menu: string;
  primaryNavigationLabel: string;
  skipLink: string;
};

export type HomeDivisionCopy = {
  title: string;
  status: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
};

export type HomePageCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    servicesCta: string;
    demoCta: string;
    interestCta: string;
    visualTechnology: string;
    visualDetailing: string;
  };
  divisions: {
    eyebrow: string;
    title: string;
    description: string;
    technology: HomeDivisionCopy;
    detailing: HomeDivisionCopy;
    disclaimer: string;
  };
  coverage: {
    eyebrow: string;
    title: string;
    location: string;
    description: string;
  };
  demo: {
    eyebrow: string;
    title: string;
    description: string;
  };
  interest: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
  };
};

export type ServicesPageCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    homeLinkLabel: string;
    aboutLinkLabel: string;
    interestLinkLabel: string;
  };
  divisions: {
    eyebrow: string;
    title: string;
    description: string;
  };
  details: {
    title: string;
    technology: {
      capabilitiesTitle: string;
      capabilities: string[];
      boundariesTitle: string;
      boundaries: string[];
    };
    detailing: {
      approachTitle: string;
      approach: string[];
      boundariesTitle: string;
      boundaries: string[];
    };
  };
  arrangements: {
    title: string;
    description: string;
  };
  enquiry: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
  };
};

type LanguageContent = {
  htmlLang: string;
  metaDescription: string;
  shared: SharedCopy;
  home: HomePageCopy;
  services: ServicesPageCopy;
  routes: Partial<Record<RoutePath, RouteCopy>>;
  notFound: Omit<RouteCopy, 'label'>;
};

const englishRoutes: Record<RoutePath, RouteCopy> = {
  '/': {
    label: 'Home',
    title: 'Agrijuune',
    description:
      'Farm management technology and agricultural machinery detailing.',
  },
  '/services': {
    label: 'Services',
    title: 'Services',
    description:
      'Potential farm management technology capabilities and planned agricultural machinery detailing.',
  },
  '/about': {
    label: 'About / Contact',
    title: 'About & Contact',
    description:
      'Company and contact information will be added after content approval.',
  },
  '/faq': {
    label: 'FAQ',
    title: 'Frequently asked questions',
    description:
      'Answers to common questions will be added after content approval.',
  },
};

export const translations: Record<Language, LanguageContent> = {
  en: {
    htmlLang: 'en-ZA',
    metaDescription:
      'Agrijuune brings together farm management technology and agricultural machinery detailing.',
    shared: {
      closeMenu: 'Close menu',
      footerNavigationLabel: 'Footer',
      footerDescription:
        'Farm management technology and agricultural machinery detailing.',
      homeLinkLabel: 'Agrijuune home',
      languageSwitcherLabel: 'Language',
      menu: 'Menu',
      primaryNavigationLabel: 'Primary',
      skipLink: 'Skip to main content',
    },
    home: {
      hero: {
        eyebrow: 'Two complementary divisions for farms',
        title: 'Practical farm support, in one place.',
        description:
          'Agrijuune is developing two complementary divisions for crop and vegetable farms in Gauteng: Farm Management Technology and Agricultural Machinery Detailing. Scope and availability are discussed individually.',
        servicesCta: 'Explore services',
        demoCta: 'Explore the demo plan',
        interestCta: 'Express interest',
        visualTechnology: 'Farm Management Technology',
        visualDetailing: 'Agricultural Machinery Detailing',
      },
      divisions: {
        eyebrow: 'The proposed offer',
        title: 'Two divisions, one farm-support focus.',
        description:
          'Explore potential technology capabilities and planned detailing work. Specific scope and availability are agreed before any work begins.',
        technology: {
          title: 'Farm Management Technology',
          status: 'Potential capabilities',
          description:
            'Digital tools and setup/support intended to help farms organise machinery and operational information. Workflows, configuration, and support are agreed during consultation.',
          highlights: [
            'Machinery and asset records',
            'Maintenance schedules and history',
            'Tools and equipment inventory',
            'Detailing records, dashboards, and reports',
          ],
          ctaLabel: 'Express interest in Farm Management Technology',
        },
        detailing: {
          title: 'Agricultural Machinery Detailing',
          status: 'Planned service',
          description:
            'On-site cleaning and detailing for tractors and agricultural machinery. Work scope and availability are confirmed with each farm before agreement.',
          highlights: [
            'Initially focused on tractors and agricultural machinery',
            'No mechanical repair, fault diagnosis, or formal technical inspection',
          ],
          ctaLabel: 'Express interest in Agricultural Machinery Detailing',
        },
        disclaimer:
          'These are potential capabilities and planned services, not guarantees of current availability, fixed pricing, or outcomes.',
      },
      coverage: {
        eyebrow: 'Initial customer focus',
        title: 'Gauteng, South Africa',
        location: 'Gauteng',
        description:
          'The exact travel radius and service availability have not been confirmed. They will be discussed before any work is agreed.',
      },
      demo: {
        eyebrow: 'Illustrative platform demo',
        title: 'Explore the concept with fictional farm records.',
        description:
          'A guided walkthrough is planned to demonstrate potential capabilities using fictional farm and machinery information, not a live customer system.',
      },
      interest: {
        eyebrow: 'Next steps',
        title: 'Express interest',
        description:
          'Contact details and an enquiry route are still being prepared.',
        placeholder:
          'Placeholder: approved contact information will be added later. This page does not collect personal information.',
      },
    },
    services: {
      hero: {
        eyebrow: 'Services',
        title: 'Two complementary divisions, one practical approach.',
        description:
          'Explore potential farm management technology capabilities and planned machinery detailing. Actual features, work scope, pricing and availability are discussed individually.',
        homeLinkLabel: 'Home',
        aboutLinkLabel: 'About / Contact',
        interestLinkLabel: 'Express interest',
      },
      divisions: {
        eyebrow: 'What we are developing',
        title: 'Explore both divisions',
        description:
          'Each division has a distinct role. The cards summarize the proposed offer; further details clarify what is potential, planned or outside scope.',
      },
      details: {
        title: 'Scope and service boundaries',
        technology: {
          capabilitiesTitle: 'Potential capability areas',
          capabilities: [
            'Machinery registration and digital asset records',
            'Maintenance schedules, history and reminders',
            'Tools and equipment stock availability',
            'Detailing service records',
            'Dashboards and reports',
            'Possible document storage, subject to consultation',
          ],
          boundariesTitle: 'What to expect',
          boundaries: [
            'These are potential capabilities; not every feature is built or included in every system.',
            'Workflows, data, permissions, recipients, configuration, hosting and support are agreed during consultation.',
            'Operating-hours tracking, telematics and automated maintenance decisions are not committed capabilities.',
          ],
        },
        detailing: {
          approachTitle: 'Planned approach',
          approach: [
            'On-site cleaning and detailing for tractors and agricultural machinery.',
            'Work is tailored to machine type, condition and customer requirements.',
          ],
          boundariesTitle: 'What is not included',
          boundaries: [
            'This service is not mechanical repair, fault diagnosis or formal technical inspection.',
            'Standard detailing is not represented as food-safe sanitation.',
            'Online booking is not available.',
          ],
        },
      },
      arrangements: {
        title: 'Agreed for each customer',
        description:
          'Scope, package combinations, pricing, configuration and operating arrangements are determined with each customer. No fixed packages, prices or guaranteed outcomes are published.',
      },
      enquiry: {
        eyebrow: 'Next steps',
        title: 'Express interest',
        description:
          'Contact details and an enquiry route are still being prepared.',
        placeholder:
          'Placeholder: no form is available and this page does not collect personal information.',
      },
    },
    routes: englishRoutes,
    notFound: {
      title: 'Page not found',
      description: 'The page you requested could not be found.',
    },
  },
  af: {
    htmlLang: 'af-ZA',
    metaDescription:
      'Agrijuune bring plaasbestuurstegnologie en dieptereiniging van landboumasjinerie bymekaar.',
    shared: {
      closeMenu: 'Sluit kieslys',
      footerNavigationLabel: 'Voetskrifnavigasie',
      footerDescription:
        'Plaasbestuurstegnologie en dieptereiniging van landboumasjinerie.',
      homeLinkLabel: 'Agrijuune tuis',
      languageSwitcherLabel: 'Taal',
      menu: 'Kieslys',
      primaryNavigationLabel: 'Primêre navigasie',
      skipLink: 'Slaan na hoofinhoud oor',
    },
    home: {
      hero: {
        eyebrow: 'Twee aanvullende afdelings vir plase',
        title: 'Praktiese ondersteuning vir plaasbedrywighede.',
        description:
          'Agrijuune ontwikkel twee aanvullende afdelings vir gewas- en groenteplase in Gauteng: Plaasbestuurstegnologie en skoonmaak en versorging van landboumasjinerie. Diensomvang en beskikbaarheid word individueel bespreek.',
        servicesCta: 'Verken die dienste',
        demoCta: 'Verken die demoplan',
        interestCta: 'Stel belang',
        visualTechnology: 'Plaasbestuurstegnologie',
        visualDetailing: 'Skoonmaak en versorging van landboumasjinerie',
      },
      divisions: {
        eyebrow: 'Die voorgestelde aanbod',
        title: 'Twee afdelings, een fokus op plaasondersteuning.',
        description:
          'Verken moontlike tegnologievermoëns en beplande detaileringswerk. Spesifieke omvang en beskikbaarheid word ooreengekom voordat werk begin.',
        technology: {
          title: 'Plaasbestuurstegnologie',
          status: 'Moontlike vermoëns',
          description:
            'Digitale hulpmiddels en opstelling/ondersteuning om plase te help om masjinerie en bedryfsinligting te organiseer. Werkvloeie, opstelling en ondersteuning word tydens konsultasie ooreengekom.',
          highlights: [
            'Masjinerie- en baterekords',
            'Instandhoudingskedules en -geskiedenis',
            'Voorraad van gereedskap en toerusting',
            'Detaileringsrekords, dashboards en verslae',
          ],
          ctaLabel: 'Stel belang in plaasbestuurstegnologie',
        },
        detailing: {
          title: 'Skoonmaak en versorging van landboumasjinerie',
          status: 'Beplande diens',
          description:
            'Skoonmaak en detailering op die plaas vir trekkers en landboumasjinerie. Omvang en beskikbaarheid word met elke plaas bevestig voordat werk ooreengekom word.',
          highlights: [
            'Aanvanklik gefokus op trekkers en landboumasjinerie',
            'Geen meganiese herstelwerk, foutdiagnose of formele tegniese inspeksie nie',
          ],
          ctaLabel:
            'Stel belang in skoonmaak en versorging van landboumasjinerie',
        },
        disclaimer:
          'Dit is moontlike vermoëns en beplande dienste, nie waarborge van huidige beskikbaarheid, vaste pryse of uitkomste nie.',
      },
      coverage: {
        eyebrow: 'Aanvanklike kliëntfokus',
        title: 'Gauteng, Suid-Afrika',
        location: 'Gauteng',
        description:
          'Die presiese reisafstand en diensbeskikbaarheid is nog nie bevestig nie. Dit sal bespreek word voordat enige werk ooreengekom word.',
      },
      demo: {
        eyebrow: 'Illustratiewe platformdemo',
        title: 'Verken die konsep met fiktiewe plaasrekords.',
        description:
          '’n Begeleide deurloping word beplan om moontlike vermoëns met fiktiewe plaas- en masjinerie-inligting te wys, nie ’n regstreekse klantstelsel nie.',
      },
      interest: {
        eyebrow: 'Volgende stappe',
        title: 'Stel belang',
        description:
          'Kontakbesonderhede en ’n navraagroete word nog voorberei.',
        placeholder:
          'Plekhouer: goedgekeurde kontakbesonderhede sal later bygevoeg word. Hierdie bladsy versamel nie persoonlike inligting nie.',
      },
    },
    services: {
      hero: {
        eyebrow: 'Dienste',
        title: 'Twee aanvullende afdelings, een praktiese benadering.',
        description:
          'Verken moontlike plaasbestuurstegnologievermoëns en beplande masjienversorging. Werklike funksies, diensomvang, pryse en beskikbaarheid word individueel bespreek.',
        homeLinkLabel: 'Tuis',
        aboutLinkLabel: 'Oor ons / Kontak',
        interestLinkLabel: 'Stel belang',
      },
      divisions: {
        eyebrow: 'Wat ons ontwikkel',
        title: 'Verken albei afdelings',
        description:
          'Elke afdeling het ’n eie rol. Die kaarte som die voorgestelde aanbod op; verdere besonderhede verduidelik wat moontlik, beplan of buite omvang is.',
      },
      details: {
        title: 'Omvang en diensgrense',
        technology: {
          capabilitiesTitle: 'Moontlike vermoëns',
          capabilities: [
            'Masjienregistrasie en digitale baterekords',
            'Instandhoudingskedules, -geskiedenis en aanmanings',
            'Beskikbaarheid van gereedskap en toerusting',
            'Detaileringsdiensrekords',
            'Dashboards en verslae',
            'Moontlike dokumentberging, onderhewig aan konsultasie',
          ],
          boundariesTitle: 'Wat om te verwag',
          boundaries: [
            'Dit is moontlike vermoëns; nie elke funksie is reeds gebou of by elke stelsel ingesluit nie.',
            'Werkvloeie, data, toestemmings, ontvangers, opstelling, huisvesting en ondersteuning word tydens konsultasie ooreengekom.',
            'Ure-opsporing, telematika en outomatiese instandhoudingsbesluite is nie bevestigde vermoëns nie.',
          ],
        },
        detailing: {
          approachTitle: 'Beplande benadering',
          approach: [
            'Skoonmaak en versorging op die perseel vir trekkers en landboumasjinerie.',
            'Werk word aangepas volgens masjientipe, toestand en klantvereistes.',
          ],
          boundariesTitle: 'Wat nie ingesluit is nie',
          boundaries: [
            'Hierdie diens sluit nie meganiese herstelwerk, foutdiagnose of formele tegniese inspeksie in nie.',
            'Standaardversorging word nie as voedselveilige sanitasie voorgestel nie.',
            'Aanlyn bespreking is nie beskikbaar nie.',
          ],
        },
      },
      arrangements: {
        title: 'Ooreengekom met elke klant',
        description:
          'Omvang, kombinasies van pakkette, pryse, opstelling en bedryfsreëlings word met elke klant bepaal. Geen vaste pakkette, pryse of gewaarborgde uitkomste word gepubliseer nie.',
      },
      enquiry: {
        eyebrow: 'Volgende stappe',
        title: 'Stel belang',
        description:
          'Kontakbesonderhede en ’n navraagroete word nog voorberei.',
        placeholder:
          'Plekhouer: geen vorm is beskikbaar nie en hierdie bladsy versamel nie persoonlike inligting nie.',
      },
    },
    routes: {
      '/': {
        label: 'Tuis',
        title: 'Agrijuune',
        description:
          'Plaasbestuurstegnologie en dieptereiniging van landboumasjinerie.',
      },
      '/services': {
        label: 'Dienste',
        title: 'Dienste',
        description:
          'Moontlike plaasbestuurstegnologievermoëns en beplande skoonmaak en versorging van landboumasjinerie.',
      },
      '/about': {
        label: 'Oor ons / Kontak',
        title: 'Oor ons en kontak',
        description:
          'Maatskappy- en kontakinligting sal bygevoeg word ná goedkeuring van die inhoud.',
      },
      '/faq': {
        label: 'Gereelde vrae',
        title: 'Gereelde vrae',
        description:
          'Antwoorde op algemene vrae sal bygevoeg word ná goedkeuring van die inhoud.',
      },
    },
    notFound: {
      title: 'Bladsy nie gevind nie',
      description: 'Die bladsy waarna u soek, kon nie gevind word nie.',
    },
  },
};

export function getRouteCopy(language: Language, path: RoutePath): RouteCopy {
  return translations[language].routes[path] ?? englishRoutes[path];
}
