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

type LanguageContent = {
  htmlLang: string;
  metaDescription: string;
  shared: SharedCopy;
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
