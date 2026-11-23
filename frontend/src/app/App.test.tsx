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
    heading: 'Services',
    documentTitle: 'Services | Agrijuune',
  },
  {
    path: '/about',
    heading: 'About & Contact',
    documentTitle: 'About & Contact | Agrijuune',
  },
  {
    path: '/contact',
    heading: 'About & Contact',
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
  document.head.querySelector('meta[name="description"]')?.remove();
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
      screen.getByRole('link', { name: 'Explore the demo plan' }),
    ).toHaveAttribute('href', '#platform-demo');
    expect(
      screen.getByRole('link', { name: 'Express interest' }),
    ).toHaveAttribute('href', '#interest');
    expect(document.querySelector('#platform-demo')).toBeInTheDocument();
    expect(document.querySelector('#interest')).toBeInTheDocument();
    expect(
      screen.getByText(/This page does not collect personal information/),
    ).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
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
      screen.getByRole('link', { name: 'Verken die demoplan' }),
    ).toHaveAttribute('href', '#platform-demo');
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
      screen.getByRole('heading', { level: 1, name: 'Services' }),
    ).toHaveFocus();
    expect(document.title).toBe('Services | Agrijuune');
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
      'Agrijuune bring plaasbestuurstegnologie en dieptereiniging van landboumasjinerie bymekaar.',
    );
    expect(
      screen.getByRole('heading', { level: 1, name: 'Dienste' }),
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
