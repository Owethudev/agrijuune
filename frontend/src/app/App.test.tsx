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
  { path: '/', heading: 'Agrijuune' },
  { path: '/services', heading: 'Services' },
  { path: '/about', heading: 'About & Contact' },
  { path: '/contact', heading: 'About & Contact' },
  { path: '/faq', heading: 'Frequently asked questions' },
];

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

afterEach(() => {
  cleanup();
});

describe('public application shell', () => {
  it.each(publicPages)('renders the $path route', ({ path, heading }) => {
    window.history.replaceState(null, '', path);

    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: heading }),
    ).toBeInTheDocument();
    expect(document.title).toBe(
      heading === 'Agrijuune' ? 'Agrijuune' : `${heading} | Agrijuune`,
    );
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
      screen.getByRole('heading', { level: 1, name: 'Agrijuune' }),
    ).toHaveFocus();
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
});
