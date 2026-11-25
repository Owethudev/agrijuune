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
  signOut: string;
  skipLink: string;
  teamPortal: string;
  teamSignIn: string;
};

export type TeamCopy = {
  accessDenied: string;
  accessCheckError: string;
  addMemberButton: string;
  addMemberError: string;
  addMemberSuccess: string;
  adminRole: string;
  backToSignIn: string;
  confirmPasswordLabel: string;
  emailLabel: string;
  invitationInstructions: string;
  loadMembersError: string;
  memberEmailLabel: string;
  memberExistsError: string;
  membersDescription: string;
  membersTitle: string;
  notConfigured: string;
  portalLinkLabel: string;
  portalDescription: string;
  portalTitle: string;
  removeMemberButton: string;
  removeMemberConfirmation: string;
  removeMemberError: string;
  signInButton: string;
  signInDescription: string;
  signInTitle: string;
  signOutButton: string;
  signingIn: string;
  checkingSession: string;
  signOutError: string;
  teamRole: string;
  passwordLabel: string;
  authError: string;
  passwordMinimumLength: string;
  passwordMismatch: string;
  passwordResetDescription: string;
  passwordResetLink: string;
  passwordResetRequestError: string;
  passwordResetRequestSuccess: string;
  passwordResetSend: string;
  passwordResetSending: string;
  passwordResetTitle: string;
  passwordUpdateButton: string;
  passwordUpdateDescription: string;
  passwordUpdateError: string;
  passwordUpdateLinkExpired: string;
  passwordUpdateSuccess: string;
  passwordUpdateTitle: string;
  passwordUpdating: string;
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
    pauseLabel: string;
    playLabel: string;
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

export type PrivacyPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  sections: {
    title: string;
    body: string;
  }[];
  contactTitle: string;
  contactDescription: string;
  contactEmail: string;
  disclaimer: string;
};

type LanguageContent = {
  htmlLang: string;
  shared: SharedCopy;
  team: TeamCopy;
  home: HomePageCopy;
  services: ServicesPageCopy;
  about: AboutPageCopy;
  faq: FaqPageCopy;
  privacy: PrivacyPageCopy;
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
  '/privacy': {
    label: 'Privacy',
    title: 'Privacy and demo data',
    description:
      'How Agrijuune handles sample demo data, team-account and technical data.',
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
      signOut: 'Sign out',
      skipLink: 'Skip to main content',
      teamPortal: 'Team portal',
      teamSignIn: 'Team sign in',
    },
    team: {
      accessDenied:
        'This account does not have team access. Contact an administrator.',
      accessCheckError: 'Team access could not be verified. Try again later.',
      addMemberButton: 'Add team member',
      addMemberError: 'The team member could not be added. Try again.',
      addMemberSuccess:
        'Team access added. Invite this email from Supabase Auth to let them sign in.',
      adminRole: 'Administrator',
      backToSignIn: 'Back to team sign in',
      confirmPasswordLabel: 'Confirm new password',
      emailLabel: 'Email address',
      invitationInstructions:
        'Add a team email here, then invite that same address from Supabase Auth. Only invited accounts with a matching role can sign in.',
      loadMembersError: 'Team access could not be loaded. Try again later.',
      memberEmailLabel: 'Team member email',
      memberExistsError: 'That email already has team access.',
      membersDescription:
        'Invite new people from Supabase Auth after adding their email here. Only team roles can be assigned from this page.',
      membersTitle: 'Team access',
      notConfigured: 'Team sign-in is not configured in this environment yet.',
      portalLinkLabel: 'Open team portal',
      portalDescription:
        'This private workspace is separate from the public Agrijuune website.',
      portalTitle: 'Team workspace',
      removeMemberButton: 'Remove access',
      removeMemberConfirmation:
        'Remove this team member’s role? Existing sessions may remain active until refreshed. Disable their Supabase Auth user for immediate revocation.',
      removeMemberError: 'Team access could not be removed. Try again.',
      signInButton: 'Sign in',
      signInDescription:
        'This sign-in is for invited Agrijuune team members only.',
      signInTitle: 'Team sign in',
      signOutButton: 'Sign out',
      signingIn: 'Signing in…',
      checkingSession: 'Checking team access…',
      signOutError: 'You could not be signed out. Please try again.',
      teamRole: 'Team member',
      passwordLabel: 'Password',
      authError: 'Sign-in failed. Check your details and try again.',
      passwordMinimumLength: 'Password must be at least 12 characters.',
      passwordMismatch: 'Passwords do not match.',
      passwordResetDescription:
        'Enter the email address for your invited team account. If an account matches, we will send a secure password link.',
      passwordResetLink: 'Need to set or reset your password?',
      passwordResetRequestError:
        'The password link could not be sent. Try again later.',
      passwordResetRequestSuccess:
        'If an invited account matches that email, a password link has been sent.',
      passwordResetSend: 'Send password link',
      passwordResetSending: 'Sending…',
      passwordResetTitle: 'Set or reset your team password',
      passwordUpdateButton: 'Save password',
      passwordUpdateDescription:
        'Choose a new password with at least 12 characters.',
      passwordUpdateError:
        'The password could not be saved. Request a new link and try again.',
      passwordUpdateLinkExpired:
        'This password link is invalid or expired. Request a new one to continue.',
      passwordUpdateSuccess:
        'Password saved. Open the team portal to continue.',
      passwordUpdateTitle: 'Set your team password',
      passwordUpdating: 'Saving…',
    },
    home: {
      hero: {
        eyebrow: 'Farm technology & machinery care',
        title: 'Practical farm support, in one place.',
        description:
          'Agrijuune brings together farm management technology and agricultural machinery detailing for farms in Gauteng. It is not currently offering live services or accepting public enquiries.',
        servicesCta: 'Explore services',
        demoCta: 'Explore the demo',
        interestCta: 'Project information',
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
        pauseLabel: 'Pause conveyor belt',
        playLabel: 'Start conveyor belt',
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
        eyebrow: 'Project information',
        title: 'Demo and data limits',
        description:
          'Explore our proposed services. Public enquiries are not accepted.',
        placeholder:
          'Do not enter real personal, farm or business information. See Privacy and demo data in the footer.',
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
        interestLinkLabel: 'Project information',
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
        eyebrow: 'Project information',
        title: 'Demo and data limits',
        description:
          'Explore our proposed services. Public enquiries are not accepted.',
        placeholder:
          'No form is available. Do not send real personal, farm or business information.',
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
          'Agrijuune explores practical agricultural services for farms in Gauteng.',
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
        description: 'Agrijuune does not accept public business enquiries.',
        emailLabel: 'Email',
        emailPlaceholder:
          'For privacy questions, use the contact on the Privacy and Demo Data page.',
        enquiryPlaceholder: 'No public enquiry form is available.',
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
            'Agrijuune presents two agricultural-service concepts: Farm Management Technology and Agricultural Machinery Detailing.',
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
            'Agrijuune does not currently accept public enquiries or create customer requests.',
        },
        {
          question: 'What happens after I submit an enquiry?',
          answer:
            'There is no public enquiry form, and this demonstration does not create bookings or service commitments.',
        },
      ],
    },
    privacy: {
      eyebrow: 'Privacy and data notice',
      title: 'Privacy and demo data',
      description:
        'Agrijuune is not currently accepting public enquiries, orders or marketing sign-ups.',
      sections: [
        {
          title: 'Use fictional data only',
          body: 'Do not enter real names, email addresses, phone numbers, farm details or other personal or confidential information. The public enquiry form and enquiry email notifications are disabled.',
        },
        {
          title: 'Team sign-in and technical data',
          body: 'Team sign-in is invite-only. If an invited team member signs in, Supabase Auth processes the account email and authentication data. Vercel, Render and Supabase may process technical connection data, such as IP addresses and security logs, to operate and protect their services. Provider-specific log retention and processing regions have not been independently verified.',
        },
        {
          title: 'Storage and retention limits',
          body: 'The seven-day database purge is configured for enquiry records, but its first scheduled run has not yet been verified. The current Supabase plan does not include project backups. This site is not a place to store real enquiries, and it does not promise deletion or recovery of provider-held logs or account data.',
        },
      ],
      contactTitle: 'Privacy questions',
      contactDescription:
        'For a privacy question or a request about an invited team account, contact the site owner:',
      contactEmail: 'jezvestptyltd@gmail.com',
      disclaimer:
        'This notice describes how data is handled on this site; it is not legal advice or a claim of legal compliance.',
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
      signOut: 'Meld af',
      skipLink: 'Slaan na hoofinhoud oor',
      teamPortal: 'Spanportaal',
      teamSignIn: 'Spanaanmelding',
    },
    team: {
      accessDenied:
        'Hierdie rekening het nie spantoegang nie. Kontak ’n administrateur.',
      accessCheckError:
        'Spantoegang kon nie bevestig word nie. Probeer later weer.',
      addMemberButton: 'Voeg spanlid by',
      addMemberError: 'Die spanlid kon nie bygevoeg word nie. Probeer weer.',
      addMemberSuccess:
        'Spantoegang is bygevoeg. Nooi hierdie e-posadres via Supabase Auth sodat hulle kan aanmeld.',
      adminRole: 'Administrateur',
      backToSignIn: 'Terug na span-aanmelding',
      confirmPasswordLabel: 'Bevestig nuwe wagwoord',
      emailLabel: 'E-posadres',
      invitationInstructions:
        'Voeg eers ’n span-e-posadres hier by en nooi dan dieselfde adres via Supabase Auth. Slegs genooide rekeninge met ’n ooreenstemmende rol kan aanmeld.',
      loadMembersError:
        'Spantoegang kon nie gelaai word nie. Probeer later weer.',
      memberEmailLabel: 'Spanlid se e-posadres',
      memberExistsError: 'Daardie e-posadres het reeds spantoegang.',
      membersDescription:
        'Nooi nuwe persone via Supabase Auth nadat hul e-posadres hier bygevoeg is. Slegs spanrolle kan vanaf hierdie bladsy toegeken word.',
      membersTitle: 'Spantoegang',
      notConfigured:
        'Spanaanmelding is nog nie in hierdie omgewing opgestel nie.',
      portalLinkLabel: 'Maak spanportaal oop',
      portalDescription:
        'Hierdie privaat werkruimte is apart van die openbare Agrijuune-webwerf.',
      portalTitle: 'Spanwerkruimte',
      removeMemberButton: 'Verwyder toegang',
      removeMemberConfirmation:
        'Verwyder hierdie spanlid se rol? Bestaande sessies kan aktief bly totdat dit verfris. Deaktiveer die Supabase Auth-gebruiker vir onmiddellike intrekking.',
      removeMemberError: 'Spantoegang kon nie verwyder word nie. Probeer weer.',
      signInButton: 'Meld aan',
      signInDescription:
        'Hierdie aanmelding is slegs vir genooide Agrijuune-spanlede.',
      signInTitle: 'Spanaanmelding',
      signOutButton: 'Meld af',
      signingIn: 'Meld aan…',
      checkingSession: 'Kontroleer spantoegang…',
      signOutError: 'Jy kon nie afmeld nie. Probeer asseblief weer.',
      teamRole: 'Spanlid',
      passwordLabel: 'Wagwoord',
      authError:
        'Aanmelding het misluk. Kontroleer jou besonderhede en probeer weer.',
      passwordMinimumLength:
        'Die wagwoord moet minstens 12 karakters lank wees.',
      passwordMismatch: 'Wagwoorde stem nie ooreen nie.',
      passwordResetDescription:
        'Voer die e-posadres van jou genooide spanrekening in. Indien ’n rekening daarmee ooreenstem, stuur ons ’n veilige wagwoordskakel.',
      passwordResetLink: 'Moet jy jou wagwoord stel of terugstel?',
      passwordResetRequestError:
        'Die wagwoordskakel kon nie gestuur word nie. Probeer later weer.',
      passwordResetRequestSuccess:
        'Indien ’n genooide rekening met daardie e-posadres bestaan, is ’n wagwoordskakel gestuur.',
      passwordResetSend: 'Stuur wagwoordskakel',
      passwordResetSending: 'Stuur tans…',
      passwordResetTitle: 'Stel of herstel jou spanwagwoord',
      passwordUpdateButton: 'Stoor wagwoord',
      passwordUpdateDescription:
        'Kies ’n nuwe wagwoord van minstens 12 karakters.',
      passwordUpdateError:
        'Die wagwoord kon nie gestoor word nie. Vra ’n nuwe skakel aan en probeer weer.',
      passwordUpdateLinkExpired:
        'Hierdie wagwoordskakel is ongeldig of het verval. Vra ’n nuwe een aan om voort te gaan.',
      passwordUpdateSuccess:
        'Wagwoord gestoor. Maak die spanportaal oop om voort te gaan.',
      passwordUpdateTitle: 'Stel jou spanwagwoord',
      passwordUpdating: 'Stoor tans…',
    },
    home: {
      hero: {
        eyebrow: 'Plaastegnologie & masjienversorging',
        title: 'Praktiese ondersteuning vir plaasbedrywighede.',
        description:
          'Agrijuune bring plaasbestuurstegnologie en skoonmaak en versorging van landboumasjinerie vir plase in Gauteng saam. Dit bied tans nie regstreekse dienste aan nie en aanvaar nie openbare navrae nie.',
        servicesCta: 'Verken die dienste',
        demoCta: 'Verken die demo',
        interestCta: 'Projekinligting',
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
        pauseLabel: 'Onderbreek vervoerband',
        playLabel: 'Begin vervoerband',
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
        eyebrow: 'Projekinligting',
        title: 'Demonstrasie- en databeperkings',
        description:
          'Verken ons voorgestelde dienste. Openbare navrae word nie aanvaar nie.',
        placeholder:
          'Moenie regte persoonlike, plaas- of besigheidsinligting invoer nie. Sien Privaatheid en demodata in die voetskrif.',
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
        interestLinkLabel: 'Projekinligting',
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
        eyebrow: 'Projekinligting',
        title: 'Demonstrasie- en databeperkings',
        description:
          'Verken ons voorgestelde dienste. Openbare navrae word nie aanvaar nie.',
        placeholder:
          'Geen vorm is beskikbaar nie. Moenie regte persoonlike, plaas- of besigheidsinligting stuur nie.',
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
      '/privacy': {
        label: 'Privaatheid',
        title: 'Privaatheid en demodata',
        description:
          'Hoe Agrijuune voorbeelddemodata, spanrekeninge en tegniese data hanteer.',
      },
    },
    privacy: {
      eyebrow: 'Privaatheid- en datakennisgewing',
      title: 'Privaatheid en demodata',
      description:
        'Agrijuune aanvaar tans nie openbare navrae, bestellings of bemarkingsintekeninge nie.',
      sections: [
        {
          title: 'Gebruik slegs fiktiewe data',
          body: 'Moenie regte name, e-posadresse, telefoonnommers, plaasbesonderhede of ander persoonlike of vertroulike inligting invoer nie. Die openbare navraagvorm en e-poskennisgewings vir navrae is gedeaktiveer.',
        },
        {
          title: 'Spanaanmelding en tegniese data',
          body: 'Spanaanmelding is slegs op uitnodiging. Indien ’n genooide spanlid aanmeld, verwerk Supabase Auth die rekening se e-posadres en stawingsdata. Vercel, Render en Supabase kan tegniese verbindingsdata, soos IP-adresse en sekuriteitslogboeke, verwerk om hul dienste te bedryf en te beskerm. Verskafferspesifieke logboekbewaring en verwerkingsstreke is nie onafhanklik bevestig nie.',
        },
        {
          title: 'Berging en bewaringsbeperkings',
          body: 'Die sewedag-databasisverwydering is vir navraagrekords opgestel, maar die eerste geskeduleerde uitvoering is nog nie bevestig nie. Die huidige Supabase-plan sluit nie projekrugsteune in nie. Hierdie webwerf is nie bedoel om regte navrae te stoor nie en waarborg nie die verwydering of herstel van verskafferlogboeke of rekeningdata nie.',
        },
      ],
      contactTitle: 'Privaatheidsvrae',
      contactDescription:
        'Vir ’n privaatheidsvraag of ’n versoek oor ’n genooide spanrekening, kontak die webwerfeienaar:',
      contactEmail: 'jezvestptyltd@gmail.com',
      disclaimer:
        'Hierdie kennisgewing beskryf hoe data op hierdie webwerf hanteer word; dit is nie regsadvies of ’n bewering van wetlike nakoming nie.',
    },
    about: {
      hero: {
        eyebrow: 'Doel en visie',
        title: 'Oor Agrijuune',
        description:
          'Agrijuune verken praktiese landboudienste vir plase in Gauteng.',
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
        description: 'Agrijuune aanvaar nie openbare besigheidsnavrae nie.',
        emailLabel: 'E-pos',
        emailPlaceholder:
          'Vir privaatheidsvrae, gebruik die kontak op die Privaatheid- en demodatablad.',
        enquiryPlaceholder: 'Geen openbare navraagvorm is beskikbaar nie.',
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
            'Agrijuune stel twee landboudienskonsepte voor: Plaasbestuurstegnologie en skoonmaak en versorging van landboumasjinerie.',
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
            'Agrijuune aanvaar tans nie openbare navrae of skep klantversoeke nie.',
        },
        {
          question: 'Wat gebeur nadat ek ’n navraag indien?',
          answer:
            'Daar is geen openbare navraagvorm nie, en hierdie demonstrasie skep nie besprekings of diensverpligtinge nie.',
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
