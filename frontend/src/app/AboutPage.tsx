import type { MouseEvent, Ref } from 'react';
import type { AboutPageCopy, HomePageCopy } from '../content/translations';
import type { RoutePath } from '../routing/routes';
import './InfoPages.css';

type AboutPageProps = {
  copy: AboutPageCopy;
  divisions: HomePageCopy['divisions'];
  headingRef: Ref<HTMLHeadingElement>;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, path: RoutePath) => void;
};

export function AboutPage({
  copy,
  divisions,
  headingRef,
  onNavigate,
}: AboutPageProps) {
  return (
    <div className="page-content card info-page about-page">
      <p className="page-eyebrow">{copy.hero.eyebrow}</p>
      <h1 ref={headingRef} tabIndex={-1}>
        {copy.hero.title}
      </h1>
      <p className="page-description">{copy.hero.description}</p>

      <section
        className="about-page__section"
        aria-labelledby="about-purpose-title"
      >
        <h2 id="about-purpose-title">{copy.purpose.title}</h2>
        <p>{copy.purpose.description}</p>
      </section>

      <section
        className="about-page__section"
        aria-labelledby="about-vision-title"
      >
        <h2 id="about-vision-title">{copy.vision.title}</h2>
        <p>{copy.vision.description}</p>
      </section>

      <section
        className="about-page__section"
        aria-labelledby="about-divisions-title"
      >
        <h2 id="about-divisions-title">{copy.divisions.title}</h2>
        <p>{copy.divisions.description}</p>
        <div className="about-division-grid">
          {[
            { id: 'technology', copy: divisions.technology },
            { id: 'detailing', copy: divisions.detailing },
          ].map(({ id, copy: division }) => (
            <article
              className="about-division-card"
              key={id}
              aria-labelledby={`about-division-${id}`}
            >
              <p className="about-division-card__status">{division.status}</p>
              <h3 id={`about-division-${id}`}>{division.title}</h3>
              <p>{division.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="about-page__section"
        aria-labelledby="about-location-title"
      >
        <h2 id="about-location-title">{copy.location.title}</h2>
        <p>{copy.location.description}</p>
      </section>

      <section
        className="about-page__section about-contact"
        aria-labelledby="about-contact-title"
      >
        <h2 id="about-contact-title">{copy.contact.title}</h2>
        <p>{copy.contact.description}</p>
        <div className="about-contact__email">
          <h3>{copy.contact.emailLabel}</h3>
          <p>{copy.contact.emailPlaceholder}</p>
        </div>
        <p className="about-contact__placeholder">
          {copy.contact.enquiryPlaceholder}
        </p>
        <nav className="about-page__links" aria-label={copy.contact.title}>
          <a
            className="button button--primary"
            href="/services"
            onClick={(event) => onNavigate(event, '/services')}
          >
            {copy.contact.servicesLinkLabel}
          </a>
          <a
            className="button button--secondary"
            href="/faq"
            onClick={(event) => onNavigate(event, '/faq')}
          >
            {copy.contact.faqLinkLabel}
          </a>
        </nav>
      </section>
    </div>
  );
}
