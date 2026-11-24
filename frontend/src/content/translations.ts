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

export type HomeGallerySlideCopy = {
  title: string;
  description: string;
  alt: string;
};

export type EnquiryFormCopy = {
  contactNameLabel: string;
  emailLabel: string;
  cellNumberLabel: string;
  farmNameLabel: string;
  farmLocationLabel: string;
  operationTypeLabel: string;
  machineCountEstimateLabel: string;
  servicesLabel: string;
  servicesRequiredMessage: string;
  technologyOptionLabel: string;
  detailingOptionLabel: string;
  additionalMessageLabel: string;
  privacyAcknowledgement: string;
  privacyNoticePrompt: string;
  privacyNoticeLinkLabel: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  validationErrorMessage: string;
  conflictMessage: string;
  errorMessage: string;
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
    mapAlt: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    controlsLabel: string;
    previousLabel: string;
    nextLabel: string;
    carouselRoleDescription: string;
    slideSelectorLabel: string;
    showSlideLabel: string;
    slideLabel: string;
    slideRoleDescription: string;
    ofLabel: string;
    slides: {
      fieldMachinery: HomeGallerySlideCopy;
      tractor: HomeGallerySlideCopy;
      cropWork: HomeGallerySlideCopy;
    };
  };
  demo: {
    eyebrow: string;
    title: string;
    description: string;
    startButton: string;
    stepLabel: string;
    stepOfLabel: string;
    progressLabel: string;
    potentialLabel: string;
    controlsLabel: string;
    backButton: string;
    nextButton: string;
    finishButton: string;
    restartButton: string;
    completionTitle: string;
    completionDescription: string;
    machineryCardTitle: string;
    machineryNameLabel: string;
    manufacturerLabel: string;
    modelLabel: string;
  };
  interest: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
    form: EnquiryFormCopy;
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
    form: EnquiryFormCopy;
  };
};

export type AboutPageCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  purpose: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  divisions: {
    title: string;
    description: string;
  };
  location: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    enquiryPlaceholder: string;
    servicesLinkLabel: string;
    faqLinkLabel: string;
  };
};

export type FaqPageCopy = {
  eyebrow: string;
  description: string;
  questionsLabel: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

type LanguageContent = {
  htmlLang: string;
  shared: SharedCopy;
  home: HomePageCopy;
  services: ServicesPageCopy;
  about: AboutPageCopy;
  faq: FaqPageCopy;
  routes: Partial<Record<RoutePath, RouteCopy>>;
  notFound: Omit<RouteCopy, 'label'>;
};

const englishRoutes: Record<RoutePath, RouteCopy> = {
  '/': {
    label: 'Home',
    title: 'Agrijuune',
    description:
      'Explore Agrijuune’s potential farm management technology and planned agricultural machinery detailing for farms in Gauteng.',
  },
  '/services': {
    label: 'Services',
    title: 'Services',
    description:
      'Explore potential farm management technology capabilities and planned agricultural machinery detailing for farms in Gauteng.',
  },
  '/about': {
    label: 'About / Contact',
    title: 'About & Contact',
    description:
      'Read about Agrijuune’s purpose, two divisions and current contact arrangements.',
  },
  '/faq': {
    label: 'FAQ',
    title: 'Frequently asked questions',
    description:
      'Answers about Agrijuune’s proposed services, service scope, demonstrations and enquiry arrangements.',
  },
};

export const translations: Record<Language, LanguageContent> = {
  en: {
    htmlLang: 'en-ZA',
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
        demoCta: 'Explore the demo',
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
        mapAlt:
          'Illustrative map of South Africa with Gauteng marked as the initial customer focus.',
      },
      gallery: {
        eyebrow: 'From the field',
        title: 'A closer look at farm life.',
        description:
          'A glimpse of the land and machinery behind everyday farm work.',
        controlsLabel: 'Photo carousel controls',
        previousLabel: 'Previous',
        nextLabel: 'Next',
        carouselRoleDescription: 'carousel',
        slideSelectorLabel: 'Choose a photo',
        showSlideLabel: 'Show photo',
        slideLabel: 'Slide',
        slideRoleDescription: 'slide',
        ofLabel: 'of',
        slides: {
          fieldMachinery: {
            title: 'Across the field',
            description: 'Crop rows and machinery at work.',
            alt: 'Agricultural machinery working across rows of crops.',
          },
          tractor: {
            title: 'Ready for the next job',
            description: 'A tractor standing in a green field.',
            alt: 'A green tractor in a grassy field.',
          },
          cropWork: {
            title: 'A season of work',
            description: 'Machinery moving through a cultivated field.',
            alt: 'Farm machinery working in a cultivated crop field.',
          },
        },
      },
      demo: {
        eyebrow: 'Illustrative platform demo',
        title: 'Explore potential capabilities with fictional machinery data.',
        description:
          'Explore six potential capability areas using fictional machinery examples. No login or live farm data is used.',
        startButton: 'Start demo',
        stepLabel: 'Step',
        stepOfLabel: 'of',
        progressLabel: 'Progress through demo steps',
        potentialLabel: 'Potential capability',
        controlsLabel: 'Demo controls',
        backButton: 'Back',
        nextButton: 'Next',
        finishButton: 'Finish demo',
        restartButton: 'Restart demo',
        completionTitle: 'You have reached the end of the demo.',
        completionDescription:
          'This walkthrough illustrates potential capabilities and is not a live farm-management platform.',
        machineryCardTitle: 'Fictional machinery record',
        machineryNameLabel: 'Name',
        manufacturerLabel: 'Manufacturer',
        modelLabel: 'Model',
      },
      interest: {
        eyebrow: 'Next steps',
        title: 'Express interest',
        description:
          'Use this section to express interest in Agrijuune’s potential services. The online form appears only when privacy requirements have been completed.',
        placeholder:
          'Placeholder: approved contact information will be added later. This page does not collect personal information.',
        form: {
          contactNameLabel: 'Your name',
          emailLabel: 'Email address',
          cellNumberLabel: 'Cell number',
          farmNameLabel: 'Farm or business name (optional)',
          farmLocationLabel: 'Farm location (optional)',
          operationTypeLabel: 'Operation type (optional)',
          machineCountEstimateLabel: 'Approximate machinery count (optional)',
          servicesLabel: 'Services you are interested in',
          servicesRequiredMessage: 'Select at least one service.',
          technologyOptionLabel: 'Farm Management Technology',
          detailingOptionLabel: 'Agricultural Machinery Detailing',
          additionalMessageLabel: 'Additional message (optional)',
          privacyAcknowledgement:
            "By submitting this enquiry, you acknowledge that Agrijuune will process the personal information you provide to respond to your enquiry, communicate with you about requested services and maintain an appropriate record of the communication, in accordance with applicable data protection laws, including South Africa's Protection of Personal Information Act (POPIA).",
          privacyNoticePrompt:
            'For more information about how your information is collected, used, stored and protected, please read our Privacy Notice.',
          privacyNoticeLinkLabel:
            'Read the Privacy Notice (opens in a new tab)',
          submitLabel: 'Send enquiry',
          submittingLabel: 'Sending…',
          successMessage:
            'Your enquiry has been received. Thank you for contacting Agrijuune.',
          validationErrorMessage:
            'Check your details and make sure at least one service is selected, then try again.',
          conflictMessage:
            'This submission could not be retried safely. Please refresh the form and try again.',
          errorMessage:
            'We could not submit your enquiry. Please try again later.',
        },
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
          'Use this section to express interest in Agrijuune’s potential services. The online form appears only when privacy requirements have been completed.',
        placeholder:
          'Placeholder: no form is available and this page does not collect personal information.',
        form: {
          contactNameLabel: 'Your name',
          emailLabel: 'Email address',
          cellNumberLabel: 'Cell number',
          farmNameLabel: 'Farm or business name (optional)',
          farmLocationLabel: 'Farm location (optional)',
          operationTypeLabel: 'Operation type (optional)',
          machineCountEstimateLabel: 'Approximate machinery count (optional)',
          servicesLabel: 'Services you are interested in',
          servicesRequiredMessage: 'Select at least one service.',
          technologyOptionLabel: 'Farm Management Technology',
          detailingOptionLabel: 'Agricultural Machinery Detailing',
          additionalMessageLabel: 'Additional message (optional)',
          privacyAcknowledgement:
            "By submitting this enquiry, you acknowledge that Agrijuune will process the personal information you provide to respond to your enquiry, communicate with you about requested services and maintain an appropriate record of the communication, in accordance with applicable data protection laws, including South Africa's Protection of Personal Information Act (POPIA).",
          privacyNoticePrompt:
            'For more information about how your information is collected, used, stored and protected, please read our Privacy Notice.',
          privacyNoticeLinkLabel:
            'Read the Privacy Notice (opens in a new tab)',
          submitLabel: 'Send enquiry',
          submittingLabel: 'Sending…',
          successMessage:
            'Your enquiry has been received. Thank you for contacting Agrijuune.',
          validationErrorMessage:
            'Check your details and make sure at least one service is selected, then try again.',
          conflictMessage:
            'This submission could not be retried safely. Please refresh the form and try again.',
          errorMessage:
            'We could not submit your enquiry. Please try again later.',
        },
      },
    },
    about: {
      hero: {
        eyebrow: 'Purpose and vision',
        title: 'About Agrijuune',
        description:
          'Agrijuune is an agricultural services business focused on crop and vegetable farms in Gauteng, developing two complementary divisions: Farm Management Technology and Agricultural Machinery Detailing.',
      },
      purpose: {
        title: 'Our purpose',
        description:
          'We aim to support farms with digital tools that can help organise machinery and operational information, alongside planned on-site cleaning and detailing for tractors and agricultural machinery.',
      },
      vision: {
        title: 'Our vision',
        description:
          'Our vision is to bring agricultural innovation and hands-on equipment care together in a practical, approachable offer shaped around each farm’s requirements.',
      },
      divisions: {
        title: 'Two complementary divisions',
        description:
          'Technology capabilities are potential, while detailing is a planned service. Scope and availability are discussed individually.',
      },
      location: {
        title: 'Gauteng, South Africa',
        description:
          'Gauteng is the initial customer focus. The exact travel radius and service availability are not confirmed and will be discussed individually. No private street address is published.',
      },
      contact: {
        title: 'Contact Agrijuune',
        description:
          'Email is the intended direct-contact channel for v1, but the business email address is not available yet.',
        emailLabel: 'Email',
        emailPlaceholder:
          'Placeholder: an approved business email address will be added when confirmed.',
        enquiryPlaceholder:
          'The online enquiry form, when enabled, is available on the Home and Services pages. This contact page does not collect personal information.',
        servicesLinkLabel: 'Explore services',
        faqLinkLabel: 'Read the FAQs',
      },
    },
    faq: {
      eyebrow: 'Common questions',
      description:
        'What Agrijuune is developing, how service scope is determined, and what is currently available.',
      questionsLabel: 'Questions and answers',
      questions: [
        {
          question: 'What is Agrijuune developing?',
          answer:
            'Agrijuune is an agricultural services business in Gauteng with two divisions: potential Farm Management Technology capabilities and planned Agricultural Machinery Detailing.',
        },
        {
          question: 'What could Farm Management Technology include?',
          answer:
            'Potential areas include machinery and asset records, maintenance schedules and history, tools and equipment inventory, detailing records, dashboards and reports, and possible document storage after consultation. These capabilities are not all built or included by default.',
        },
        {
          question: 'What does Agricultural Machinery Detailing include?',
          answer:
            'The planned service is on-site cleaning and detailing for tractors and agricultural machinery, tailored to the machine and customer requirements. It is not mechanical repair, fault diagnosis, formal technical inspection or food-safe sanitation.',
        },
        {
          question: 'Where are services available?',
          answer:
            'Gauteng, South Africa is the initial customer focus. The exact travel radius and service availability have not been confirmed.',
        },
        {
          question: 'How are scope and pricing decided?',
          answer:
            'Scope, package combinations, pricing, configuration and operating arrangements are discussed with each customer. Fixed packages, prices and guaranteed outcomes are not published.',
        },
        {
          question: 'Can I book machinery detailing online?',
          answer:
            'No. Online booking is not available. When enabled, the enquiry form is for discussion and does not create a booking.',
        },
        {
          question: 'Can I view a demonstration?',
          answer:
            'A guided demonstration is planned using fictional or sample farm and machinery information. It will not be a live customer system and will not require registration or farm details.',
        },
        {
          question: 'How can I express interest?',
          answer:
            'When online enquiry collection is enabled, use the form on the Home or Services page. No response time is promised.',
        },
        {
          question: 'What happens after I submit an enquiry?',
          answer:
            'When the form is enabled, Agrijuune intends to follow up manually to understand requirements before discussing a proposal or customer-specific arrangement. No response time is promised.',
        },
      ],
    },
    routes: englishRoutes,
    notFound: {
      title: 'Page not found',
      description: 'The page you requested could not be found.',
    },
  },
  af: {
    htmlLang: 'af-ZA',
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
        demoCta: 'Verken die demo',
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
        mapAlt:
          'Illustratiewe kaart van Suid-Afrika met Gauteng as die aanvanklike kliëntfokus aangedui.',
      },
      gallery: {
        eyebrow: 'Van die plaas af',
        title: 'Kyk nader na die plaaslewe.',
        description:
          '’n Blik op die grond en masjinerie agter alledaagse plaaswerk.',
        controlsLabel: 'Fotokarouselkontroles',
        previousLabel: 'Vorige',
        nextLabel: 'Volgende',
        carouselRoleDescription: 'fotokarousel',
        slideSelectorLabel: 'Kies ’n foto',
        showSlideLabel: 'Wys foto',
        slideLabel: 'Skyfie',
        slideRoleDescription: 'skyfie',
        ofLabel: 'van',
        slides: {
          fieldMachinery: {
            title: 'Oor die land',
            description: 'Gewasrye en masjinerie aan die werk.',
            alt: 'Landboumasjinerie wat tussen gewasrye werk.',
          },
          tractor: {
            title: 'Gereed vir die volgende taak',
            description: '’n Trekker in ’n groen land.',
            alt: '’n Groen trekker in ’n grasland.',
          },
          cropWork: {
            title: '’n Seisoen se werk',
            description: 'Masjinerie wat deur ’n bewerkte land beweeg.',
            alt: 'Plaasmasjinerie wat in ’n bewerkte gewasland werk.',
          },
        },
      },
      demo: {
        eyebrow: 'Illustratiewe platformdemo',
        title: 'Verken moontlike vermoëns met fiktiewe masjineriedata.',
        description:
          'Verken ses moontlike vermoëns met fiktiewe masjinerievoorbeelde. Geen aanmelding of regstreekse plaasdata word gebruik nie.',
        startButton: 'Begin demonstrasie',
        stepLabel: 'Stap',
        stepOfLabel: 'van',
        progressLabel: 'Vordering deur demostappe',
        potentialLabel: 'Moontlike vermoë',
        controlsLabel: 'Demokontroles',
        backButton: 'Terug',
        nextButton: 'Volgende',
        finishButton: 'Voltooi demo',
        restartButton: 'Herbegin demo',
        completionTitle: 'Jy het die einde van die demo bereik.',
        completionDescription:
          'Hierdie deurloping illustreer moontlike vermoëns en is nie ’n regstreekse plaasbestuurplatform nie.',
        machineryCardTitle: 'Fiktiewe masjinerierekord',
        machineryNameLabel: 'Naam',
        manufacturerLabel: 'Vervaardiger',
        modelLabel: 'Model',
      },
      interest: {
        eyebrow: 'Volgende stappe',
        title: 'Stel belang',
        description:
          'Gebruik hierdie afdeling om belangstelling in Agrijuune se moontlike dienste te toon. Die aanlyn vorm verskyn slegs wanneer die privaatheidsvereistes afgehandel is.',
        placeholder:
          'Plekhouer: goedgekeurde kontakbesonderhede sal later bygevoeg word. Hierdie bladsy versamel nie persoonlike inligting nie.',
        form: {
          contactNameLabel: 'Jou naam',
          emailLabel: 'E-posadres',
          cellNumberLabel: 'Selfoonnommer',
          farmNameLabel: 'Plaas- of besigheidsnaam (opsioneel)',
          farmLocationLabel: 'Plaasligging (opsioneel)',
          operationTypeLabel: 'Tipe onderneming (opsioneel)',
          machineCountEstimateLabel: 'Geskatte aantal masjiene (opsioneel)',
          servicesLabel: 'Dienste waarin jy belangstel',
          servicesRequiredMessage: 'Kies ten minste een diens.',
          technologyOptionLabel: 'Plaasbestuurstegnologie',
          detailingOptionLabel: 'Versorging van landboumasjinerie',
          additionalMessageLabel: 'Bykomende boodskap (opsioneel)',
          privacyAcknowledgement:
            'Deur hierdie navraag in te dien, erken jy dat Agrijuune die persoonlike inligting wat jy verskaf sal verwerk om op jou navraag te reageer, met jou oor aangevraagde dienste te kommunikeer en ’n toepaslike rekord van die kommunikasie te hou, in ooreenstemming met toepaslike databeskermingswette, insluitend Suid-Afrika se Wet op die Beskerming van Persoonlike Inligting (POPIA).',
          privacyNoticePrompt:
            'Lees ons Privaatheidskennisgewing vir meer inligting oor hoe jou inligting ingesamel, gebruik, gestoor en beskerm word.',
          privacyNoticeLinkLabel:
            'Lees die Privaatheidskennisgewing (maak in ’n nuwe oortjie oop)',
          submitLabel: 'Stuur navraag',
          submittingLabel: 'Word gestuur…',
          successMessage:
            'Jou navraag is ontvang. Dankie dat jy Agrijuune kontak.',
          validationErrorMessage:
            'Kontroleer jou besonderhede, kies ten minste een diens en probeer weer.',
          conflictMessage:
            'Hierdie indiening kon nie veilig herhaal word nie. Verfris die vorm en probeer weer.',
          errorMessage:
            'Ons kon nie jou navraag indien nie. Probeer asseblief later weer.',
        },
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
          'Gebruik hierdie afdeling om belangstelling in Agrijuune se moontlike dienste te toon. Die aanlyn vorm verskyn slegs wanneer die privaatheidsvereistes afgehandel is.',
        placeholder:
          'Plekhouer: geen vorm is beskikbaar nie en hierdie bladsy versamel nie persoonlike inligting nie.',
        form: {
          contactNameLabel: 'Jou naam',
          emailLabel: 'E-posadres',
          cellNumberLabel: 'Selfoonnommer',
          farmNameLabel: 'Plaas- of besigheidsnaam (opsioneel)',
          farmLocationLabel: 'Plaasligging (opsioneel)',
          operationTypeLabel: 'Tipe onderneming (opsioneel)',
          machineCountEstimateLabel: 'Geskatte aantal masjiene (opsioneel)',
          servicesLabel: 'Dienste waarin jy belangstel',
          servicesRequiredMessage: 'Kies ten minste een diens.',
          technologyOptionLabel: 'Plaasbestuurstegnologie',
          detailingOptionLabel: 'Versorging van landboumasjinerie',
          additionalMessageLabel: 'Bykomende boodskap (opsioneel)',
          privacyAcknowledgement:
            'Deur hierdie navraag in te dien, erken jy dat Agrijuune die persoonlike inligting wat jy verskaf sal verwerk om op jou navraag te reageer, met jou oor aangevraagde dienste te kommunikeer en ’n toepaslike rekord van die kommunikasie te hou, in ooreenstemming met toepaslike databeskermingswette, insluitend Suid-Afrika se Wet op die Beskerming van Persoonlike Inligting (POPIA).',
          privacyNoticePrompt:
            'Lees ons Privaatheidskennisgewing vir meer inligting oor hoe jou inligting ingesamel, gebruik, gestoor en beskerm word.',
          privacyNoticeLinkLabel:
            'Lees die Privaatheidskennisgewing (maak in ’n nuwe oortjie oop)',
          submitLabel: 'Stuur navraag',
          submittingLabel: 'Word gestuur…',
          successMessage:
            'Jou navraag is ontvang. Dankie dat jy Agrijuune kontak.',
          validationErrorMessage:
            'Kontroleer jou besonderhede, kies ten minste een diens en probeer weer.',
          conflictMessage:
            'Hierdie indiening kon nie veilig herhaal word nie. Verfris die vorm en probeer weer.',
          errorMessage:
            'Ons kon nie jou navraag indien nie. Probeer asseblief later weer.',
        },
      },
    },
    routes: {
      '/': {
        label: 'Tuis',
        title: 'Agrijuune',
        description:
          'Verken Agrijuune se moontlike plaasbestuurstegnologie en beplande skoonmaak en versorging van landboumasjinerie vir plase in Gauteng.',
      },
      '/services': {
        label: 'Dienste',
        title: 'Dienste',
        description:
          'Verken moontlike plaasbestuurstegnologievermoëns en beplande skoonmaak en versorging van landboumasjinerie vir plase in Gauteng.',
      },
      '/about': {
        label: 'Oor ons / Kontak',
        title: 'Oor ons en kontak',
        description:
          'Lees oor Agrijuune se doel, twee afdelings en huidige kontakreëlings.',
      },
      '/faq': {
        label: 'Gereelde vrae',
        title: 'Gereelde vrae',
        description:
          'Antwoorde oor Agrijuune se voorgestelde dienste, omvang, demonstrasies en navraagreëlings.',
      },
    },
    about: {
      hero: {
        eyebrow: 'Doel en visie',
        title: 'Oor Agrijuune',
        description:
          'Agrijuune is ’n landboudiensonderneming vir gewas- en groenteplase in Gauteng wat twee aanvullende afdelings ontwikkel: Plaasbestuurstegnologie en skoonmaak en versorging van landboumasjinerie.',
      },
      purpose: {
        title: 'Ons doel',
        description:
          'Ons wil plase ondersteun met digitale hulpmiddels wat kan help om masjinerie- en bedryfsinligting te organiseer, saam met beplande skoonmaak en versorging op die perseel vir trekkers en landboumasjinerie.',
      },
      vision: {
        title: 'Ons visie',
        description:
          'Ons visie is om landbou-innovasie en praktiese toerustingversorging saam te bring in ’n toeganklike aanbod wat volgens elke plaas se vereistes gevorm kan word.',
      },
      divisions: {
        title: 'Twee aanvullende afdelings',
        description:
          'Tegnologievermoëns is moontlik, terwyl masjienversorging ’n beplande diens is. Omvang en beskikbaarheid word individueel bespreek.',
      },
      location: {
        title: 'Gauteng, Suid-Afrika',
        description:
          'Gauteng is die aanvanklike kliëntfokus. Die presiese reisafstand en diensbeskikbaarheid is nie bevestig nie en sal individueel bespreek word. Geen privaat straatadres word gepubliseer nie.',
      },
      contact: {
        title: 'Kontak Agrijuune',
        description:
          'E-pos is die beoogde regstreekse kontakmetode vir die eerste weergawe, maar die besigheids-e-posadres is nog nie beskikbaar nie.',
        emailLabel: 'E-pos',
        emailPlaceholder:
          'Plekhouer: ’n goedgekeurde besigheids-e-posadres sal bygevoeg word wanneer dit bevestig is.',
        enquiryPlaceholder:
          'Die aanlyn navraagvorm sal, wanneer dit geaktiveer is, op die Tuis- en Dienste-bladsye beskikbaar wees. Hierdie kontakblad versamel nie persoonlike inligting nie.',
        servicesLinkLabel: 'Verken dienste',
        faqLinkLabel: 'Lees die algemene vrae',
      },
    },
    faq: {
      eyebrow: 'Algemene vrae',
      description:
        'Wat Agrijuune ontwikkel, hoe diensomvang bepaal word en wat tans beskikbaar is.',
      questionsLabel: 'Vrae en antwoorde',
      questions: [
        {
          question: 'Wat ontwikkel Agrijuune?',
          answer:
            'Agrijuune is ’n landboudiensonderneming in Gauteng met twee afdelings: moontlike plaasbestuurstegnologievermoëns en beplande skoonmaak en versorging van landboumasjinerie.',
        },
        {
          question: 'Wat kan plaasbestuurstegnologie insluit?',
          answer:
            'Moontlike areas sluit masjien- en baterekords, instandhoudingskedules en -geskiedenis, voorraad van gereedskap en toerusting, detaileringsrekords, dashboards en verslae, en moontlike dokumentberging ná konsultasie in. Hierdie vermoëns is nie almal reeds gebou of by verstek ingesluit nie.',
        },
        {
          question:
            'Wat sluit skoonmaak en versorging van landboumasjinerie in?',
          answer:
            'Die beplande diens is skoonmaak en versorging op die perseel vir trekkers en landboumasjinerie, aangepas volgens die masjien en klantvereistes. Dit is nie meganiese herstelwerk, foutdiagnose, formele tegniese inspeksie of voedselveilige sanitasie nie.',
        },
        {
          question: 'Waar is dienste beskikbaar?',
          answer:
            'Gauteng, Suid-Afrika is die aanvanklike kliëntfokus. Die presiese reisafstand en diensbeskikbaarheid is nog nie bevestig nie.',
        },
        {
          question: 'Hoe word omvang en pryse bepaal?',
          answer:
            'Omvang, kombinasies van pakkette, pryse, opstelling en bedryfsreëlings word met elke klant bespreek. Geen vaste pakkette, pryse of gewaarborgde uitkomste word gepubliseer nie.',
        },
        {
          question: 'Kan ek masjienversorging aanlyn bespreek?',
          answer:
            'Nee. Aanlyn bespreking is nie beskikbaar nie. Wanneer dit geaktiveer is, is die navraagvorm vir bespreking en skep dit nie ’n bespreking nie.',
        },
        {
          question: 'Kan ek ’n demonstrasie sien?',
          answer:
            '’n Begeleide demonstrasie met fiktiewe of voorbeeldinligting oor plase en masjinerie word beplan. Dit sal nie ’n regstreekse klantstelsel wees nie en sal nie registrasie of plaasbesonderhede vereis nie.',
        },
        {
          question: 'Hoe kan ek belangstelling toon?',
          answer:
            'Wanneer aanlyn navraaginsameling geaktiveer is, gebruik die vorm op die Tuis- of Dienste-bladsy. Geen reaksietyd word belowe nie.',
        },
        {
          question: 'Wat gebeur nadat ek ’n navraag indien?',
          answer:
            'Wanneer die vorm geaktiveer is, beoog Agrijuune om die klant met die hand op te volg om vereistes te verstaan voordat ’n voorstel of klantspesifieke reëling bespreek word. Geen reaksietyd word belowe nie.',
        },
      ],
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
