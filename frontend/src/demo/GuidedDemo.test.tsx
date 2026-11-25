// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it } from 'vitest';
import { translations } from '../content/translations';
import { GuidedDemo } from './GuidedDemo';

afterEach(cleanup);

describe('GuidedDemo', () => {
  it('walks through all six potential capabilities and completes', () => {
    render(<GuidedDemo copy={translations.en.home.demo} language="en" />);

    expect(
      screen.getByText('Fictional demonstration data'),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start demo' }));

    const expectedTitles = [
      'Machinery register',
      'Maintenance records',
      'Tools and equipment stock',
      'Detailing service records',
      'Dashboards and reports',
      'Document storage',
    ];

    for (const [index, title] of expectedTitles.entries()) {
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
      expect(screen.getByText('Potential capability')).toBeInTheDocument();

      if (index < expectedTitles.length - 1) {
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      } else {
        fireEvent.click(screen.getByRole('button', { name: 'Finish demo' }));
      }
    }

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'You have reached the end of the demo.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Fictional demonstration data'),
    ).toBeInTheDocument();
  });

  it('supports back and restart controls', () => {
    render(<GuidedDemo copy={translations.en.home.demo} language="en" />);

    fireEvent.click(screen.getByRole('button', { name: 'Start demo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step 2 of 6')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('Step 1 of 6')).toBeInTheDocument();
    expect(screen.getAllByText('Tractor A-01').length).toBeGreaterThanOrEqual(
      1,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Restart demo' }));
    expect(
      screen.getByRole('button', { name: 'Start demo' }),
    ).toBeInTheDocument();
  });

  it('localizes the fictional notice, first record, and controls', () => {
    render(<GuidedDemo copy={translations.af.home.demo} language="af" />);

    expect(screen.getByText('Fiktiewe demonstrasiedata')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Begin demonstrasie' }));

    expect(screen.getByText('Stap 1 van 6')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Masjinerieregister' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Trekker A-01').length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it('pops up the mini dashboard preview, switches tabs, and closes on Escape', () => {
    render(<GuidedDemo copy={translations.en.home.demo} language="en" />);

    fireEvent.click(screen.getByRole('button', { name: 'Start demo' }));

    const dialog = screen.getByRole('dialog', {
      name: 'Your Farm Operations Dashboard',
    });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('North Block')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: 'Fleet & tools' }));
    expect(screen.getByText('Hydraulic Jack 20T')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: 'Schedule' }));
    expect(screen.getByText(/500h oil & filter service/i)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(
      screen.queryByRole('dialog', { name: 'Your Farm Operations Dashboard' }),
    ).not.toBeInTheDocument();
  });
});
