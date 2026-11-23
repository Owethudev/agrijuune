// @vitest-environment jsdom

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App } from './App';

const publicPages = [
  {
    path: '/',
    heading: 'Practical farm support, in one place.',
    documentTitle: 'Agrijuune',
  },
  {
    path: '/services',
    heading: 'Two complementary divisions, one practical approach.',
    documentTitle: 'Services | Agrijuune',
  },
  {
    path: '/about',
    heading: 'About Agrijuune',
    documentTitle: 'About & Contact | Agrijuune',
  },
  {
    path: '/contact',
    heading: 'About Agrijuune',
    documentTitle: 'About & Contact | Agrijuune',
  },
  {
    path: '/faq',
    heading: 'Frequently asked questions',
    documentTitle: 'Frequently asked questions | Agrijuune',
  },
];

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

afterEach(() => {
  cleanup();
  document.head
    .querySelectorAll(
      'meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]',
    )
    .forEach((element) => element.remove());
});

describe('public application shell', () => {
  it.each(publicPages)(
    'renders the $path route',
    ({ path, heading, documentTitle }) => {
      window.history.replaceState(null, '', path);

      render(<App />);

      expect(
        screen.getByRole('heading', { level: 1, name: heading }),
      ).toBeInTheDocument();
      expect(document.title).toBe(documentTitle);
    },
  );

  it('presents both divisions with honest service and availability labels', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Practical farm support, in one place.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Farm Management Technology',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Agricultural Machinery Detailing',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Potential capabilities')).toBeInTheDocument();
    expect(screen.getByText('Planned service')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Explore services' }),
    ).toHaveAttribute('href', '#divisions');
    expect(
      screen.getByRole('link', { name: 'Explore the demo' }),
    ).toHaveAttribute('href', '#platform-demo');
    expect(
      screen.getByRole('link', { name: 'Express interest' }),
    ).toHaveAttribute('href', '#interest');
    expect(document.querySelector('#platform-demo')).toBeInTheDocument();
    expect(
      screen.getByText('Fictional demonstration data'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Start demo' }),
    ).toBeInTheDocument();
    expect(document.querySelector('#interest')).toBeInTheDocument();
    expect(
      screen.getByText(/This page does not collect personal information/),
    ).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('explains service capabilities, boundaries, and the enquiry placeholder', () => {
    window.history.replaceState(null, '', '/services');
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Two complementary divisions, one practical approach.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Potential capability areas' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/not every feature is built or included/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /not mechanical repair, fault diagnosis or formal technical inspection/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/not represented as food-safe sanitation/i),
    ).toBeInTheDocument();
    const interestLink = screen.getByRole('link', { name: 'Express interest' });
    expect(interestLink).toHaveAttribute('href', '#services-enquiry');
    expect(document.querySelector('#services-enquiry')).toBeInTheDocument();
    expect(
      screen.getByText(/does not collect personal information/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('shows only confirmed About details and leaves contact as a placeholder', () => {
    window.history.replaceState(null, '', '/about');
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'About Agrijuune' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Gauteng, South Africa',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/business email address is not available yet/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not collect personal information/i),
    ).toBeInTheDocument();
    expect(
      document.querySelector('a[href^="mailto:"]'),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('uses native details and summaries for accurate FAQ answers', () => {
    window.history.replaceState(null, '', '/faq');
    render(<App />);

    const firstQuestion = screen.getByText('What is Agrijuune developing?');

    expect(firstQuestion.closest('summary')).toBeInTheDocument();
    expect(document.querySelectorAll('.faq-page details')).toHaveLength(9);
    expect(
      screen.getByText(/not mechanical repair, fault diagnosis/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No enquiry can currently be submitted/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('localizes FAQ questions and answers into Afrikaans', () => {
    window.history.replaceState(null, '', '/faq');
    render(<App />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'af' },
    });

    expect(document.documentElement).toHaveAttribute('lang', 'af-ZA');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Gereelde vrae' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Wat ontwikkel Agrijuune?').closest('summary'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Geen navraag kan tans deur hierdie webwerf ingedien word nie/i,
      ),
    ).toBeInTheDocument();
  });

  it('provides working Home and About / Contact links on the Services page', () => {
    window.history.replaceState(null, '', '/services');
    render(<App />);

    const servicesPageNavigation = screen.getByRole('navigation', {
      name: 'Services',
    });

    fireEvent.click(
      within(servicesPageNavigation).getByRole('link', {
        name: /^Home$/,
      }),
    );
    expect(window.location.pathname).toBe('/');
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Practical farm support, in one place.',
      }),
    ).toHaveFocus();

    window.history.replaceState(null, '', '/services');
    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    fireEvent.click(
      within(screen.getByRole('navigation', { name: 'Services' })).getByRole(
        'link',
        { name: /^About \/ Contact$/ },
      ),
    );

    expect(window.location.pathname).toBe('/about');
    expect(
      screen.getByRole('heading', { level: 1, name: 'About Agrijuune' }),
    ).toHaveFocus();
  });

  it('localizes the Services page and its contact placeholders into Afrikaans', () => {
    window.history.replaceState(null, '', '/services');
    render(<App />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'af' },
    });

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Twee aanvullende afdelings, een praktiese benadering.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Moontlike vermoëns' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /hierdie bladsy versamel nie persoonlike inligting nie/i,
      ),
    ).toBeInTheDocument();
  });

  it('localizes homepage content into Afrikaans', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'af' },
    });

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Praktiese ondersteuning vir plaasbedrywighede.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Plaasbestuurstegnologie',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Skoonmaak en versorging van landboumasjinerie',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Verken die demo' }),
    ).toHaveAttribute('href', '#platform-demo');
    expect(screen.getByText('Fiktiewe demonstrasiedata')).toBeInTheDocument();
  });

  it('updates the route and focuses the new page heading', () => {
    render(<App />);
    const primaryNavigation = screen.getByRole('navigation', {
      name: 'Primary',
    });

    fireEvent.click(
      within(primaryNavigation).getByRole('link', { name: 'Services' }),
    );

    expect(window.location.pathname).toBe('/services');
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Two complementary divisions, one practical approach.',
      }),
    ).toHaveFocus();
    expect(document.title).toBe('Services | Agrijuune');
  });

  it('sets route-specific, crawlable and social metadata', () => {
    window.history.replaceState(null, '', '/services');
    render(<App />);

    expect(document.title).toBe('Services | Agrijuune');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Explore potential farm management technology capabilities and planned agricultural machinery detailing for farms in Gauteng.',
    );
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Services | Agrijuune',
    );
    expect(
      document.querySelector('meta[property="og:description"]'),
    ).toHaveAttribute(
      'content',
      'Explore potential farm management technology capabilities and planned agricultural machinery detailing for farms in Gauteng.',
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://agrijuune.vercel.app/services',
    );
    expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://agrijuune.vercel.app/services',
    );
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index,follow',
    );
  });

  it('canonicalizes the contact alias and excludes unknown routes from indexing', () => {
    window.history.replaceState(null, '', '/contact');
    render(<App />);

    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://agrijuune.vercel.app/about',
    );

    act(() => {
      window.history.replaceState(null, '', '/not-found');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex,nofollow',
    );
    expect(
      document.querySelector('link[rel="canonical"]'),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('meta[property="og:url"]'),
    ).not.toBeInTheDocument();
  });

  it('focuses the homepage heading when navigating home', () => {
    window.history.replaceState(null, '', '/services');
    render(<App />);

    fireEvent.click(
      within(screen.getByRole('navigation', { name: 'Primary' })).getByRole(
        'link',
        { name: 'Home' },
      ),
    );

    expect(window.location.pathname).toBe('/');
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Practical farm support, in one place.',
      }),
    ).toHaveFocus();
  });

  it('updates the active page after browser history navigation', () => {
    render(<App />);
    const primaryNavigation = screen.getByRole('navigation', {
      name: 'Primary',
    });

    fireEvent.click(
      within(primaryNavigation).getByRole('link', { name: 'FAQ' }),
    );
    act(() => {
      window.history.replaceState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(
      within(primaryNavigation).getByRole('link', { name: 'Home' }),
    ).toHaveAttribute('aria-current', 'page');
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Practical farm support, in one place.',
      }),
    ).toHaveFocus();
  });

  it('switches language while preserving the route and updating page metadata', () => {
    window.history.replaceState(null, '', '/services');
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.append(metaDescription);

    render(<App />);
    const languageSelect = screen.getByRole('combobox', { name: 'Language' });
    languageSelect.focus();
    fireEvent.change(languageSelect, { target: { value: 'af' } });

    expect(window.location.pathname).toBe('/services');
    expect(languageSelect).toHaveFocus();
    expect(languageSelect).toHaveValue('af');
    expect(document.documentElement).toHaveAttribute('lang', 'af-ZA');
    expect(document.title).toBe('Dienste | Agrijuune');
    expect(metaDescription).toHaveAttribute(
      'content',
      'Verken moontlike plaasbestuurstegnologievermoëns en beplande skoonmaak en versorging van landboumasjinerie vir plase in Gauteng.',
    );
    expect(
      document.querySelector('meta[property="og:locale"]'),
    ).toHaveAttribute('content', 'af_ZA');
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Twee aanvullende afdelings, een praktiese benadering.',
      }),
    ).toBeInTheDocument();

    fireEvent.click(
      within(
        screen.getByRole('navigation', { name: 'Primêre navigasie' }),
      ).getByRole('link', { name: 'Gereelde vrae' }),
    );

    expect(window.location.pathname).toBe('/faq');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Gereelde vrae' }),
    ).toHaveFocus();
    expect(document.title).toBe('Gereelde vrae | Agrijuune');
    expect(languageSelect).toHaveValue('af');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://agrijuune.vercel.app/faq',
    );
  });

  it('closes the mobile menu on Escape and restores focus to its toggle', () => {
    render(<App />);
    const menuToggle = screen.getByRole('button', { name: 'Menu' });

    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(menuToggle, { key: 'Escape' });

    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveFocus();
  });

  it('localizes the mobile menu controls when Afrikaans is selected', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'af' },
    });

    const menuToggle = screen.getByRole('button', { name: 'Kieslys' });
    fireEvent.click(menuToggle);

    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Sluit kieslys' })).toBeVisible();
    expect(
      screen.getByRole('navigation', { name: 'Primêre navigasie' }),
    ).toBeInTheDocument();
  });
});
