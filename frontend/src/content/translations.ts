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

type LanguageContent = {
  htmlLang: string;
  metaDescription: string;
  shared: SharedCopy;
  home: HomePageCopy;
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
    description: 'Service descriptions will be added after content approval.',
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
          'Diensbeskrywings sal bygevoeg word ná goedkeuring van die inhoud.',
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
