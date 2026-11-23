import type { MouseEvent, Ref } from 'react';
import type { HomePageCopy, ServicesPageCopy } from '../content/translations';
import type { RoutePath } from '../routing/routes';
import { DivisionCard } from './DivisionCard';
import './ServicesPage.css';

type ServicesPageProps = {
  copy: ServicesPageCopy;
  divisions: HomePageCopy['divisions'];
  headingRef: Ref<HTMLHeadingElement>;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, path: RoutePath) => void;
};

export function ServicesPage({
  copy,
  divisions,
  headingRef,
  onNavigate,
}: ServicesPageProps) {
  return (
    <div className="services-page">
      <section
        className="services-hero services-section"
        aria-labelledby="services-hero-title"
      >
        <p className="services-eyebrow">{copy.hero.eyebrow}</p>
        <h1 id="services-hero-title" ref={headingRef} tabIndex={-1}>
          {copy.hero.title}
        </h1>
        <p className="services-hero__description">{copy.hero.description}</p>
        <nav className="services-hero__links" aria-label={copy.hero.eyebrow}>
          <a
            className="button button--secondary"
            href="/"
            onClick={(event) => onNavigate(event, '/')}
          >
            {copy.hero.homeLinkLabel}
          </a>
          <a
            className="button button--secondary"
            href="/about"
            onClick={(event) => onNavigate(event, '/about')}
          >
            {copy.hero.aboutLinkLabel}
          </a>
          <a className="button button--accent" href="#services-enquiry">
            {copy.hero.interestLinkLabel}
          </a>
        </nav>
      </section>

      <section
        className="services-offerings services-section"
        aria-labelledby="services-offerings-title"
      >
        <p className="services-eyebrow">{copy.divisions.eyebrow}</p>
        <h2 id="services-offerings-title">{copy.divisions.title}</h2>
        <p className="services-section__intro">{copy.divisions.description}</p>
        <div className="services-division-grid">
          <DivisionCard
            copy={divisions.technology}
            variant="technology"
            ctaHref="#services-enquiry"
          />
          <DivisionCard
            copy={divisions.detailing}
            variant="detailing"
            ctaHref="#services-enquiry"
          />
        </div>
      </section>

      <section
        className="services-details services-section"
        aria-labelledby="services-details-title"
      >
        <h2 id="services-details-title">{copy.details.title}</h2>
        <div className="services-detail-grid">
          <article
            className="services-detail-card services-detail-card--technology"
            aria-labelledby="services-technology-title"
          >
            <h3 id="services-technology-title">{divisions.technology.title}</h3>
            <h4>{copy.details.technology.capabilitiesTitle}</h4>
            <ul>
              {copy.details.technology.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
            <h4>{copy.details.technology.boundariesTitle}</h4>
            <ul>
              {copy.details.technology.boundaries.map((boundary) => (
                <li key={boundary}>{boundary}</li>
              ))}
            </ul>
          </article>

          <article
            className="services-detail-card services-detail-card--detailing"
            aria-labelledby="services-detailing-title"
          >
            <h3 id="services-detailing-title">{divisions.detailing.title}</h3>
            <h4>{copy.details.detailing.approachTitle}</h4>
            <ul>
              {copy.details.detailing.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h4>{copy.details.detailing.boundariesTitle}</h4>
            <ul>
              {copy.details.detailing.boundaries.map((boundary) => (
                <li key={boundary}>{boundary}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section
        className="services-arrangements services-section"
        aria-labelledby="services-arrangements-title"
      >
        <h2 id="services-arrangements-title">{copy.arrangements.title}</h2>
        <p>{copy.arrangements.description}</p>
      </section>

      <section
        className="services-enquiry services-section"
        id="services-enquiry"
        aria-labelledby="services-enquiry-title"
        tabIndex={-1}
      >
        <div>
          <p className="services-eyebrow">{copy.enquiry.eyebrow}</p>
          <h2 id="services-enquiry-title">{copy.enquiry.title}</h2>
          <p>{copy.enquiry.description}</p>
        </div>
        <p className="services-enquiry__placeholder">
          {copy.enquiry.placeholder}
        </p>
      </section>
    </div>
  );
}
