import type { Ref } from 'react';
import type { HomeDivisionCopy, HomePageCopy } from '../content/translations';
import './HomePage.css';

type HomePageProps = {
  copy: HomePageCopy;
  headingRef: Ref<HTMLHeadingElement>;
};

type DivisionCardProps = {
  copy: HomeDivisionCopy;
  variant: 'technology' | 'detailing';
};

function DivisionCard({ copy, variant }: DivisionCardProps) {
  return (
    <article
      className={`home-division-card home-division-card--${variant}`}
      aria-labelledby={`division-${variant}-title`}
    >
      <p className="home-division-card__status">{copy.status}</p>
      <h3 id={`division-${variant}-title`}>{copy.title}</h3>
      <p className="home-division-card__description">{copy.description}</p>
      <ul className="home-division-card__highlights">
        {copy.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <a className="home-text-link" href="#interest">
        {copy.ctaLabel}
      </a>
    </article>
  );
}

export function HomePage({ copy, headingRef }: HomePageProps) {
  return (
    <div className="home-page">
      <section
        className="home-hero home-section"
        aria-labelledby="home-hero-title"
      >
        <div className="home-hero__copy">
          <p className="home-eyebrow">{copy.hero.eyebrow}</p>
          <h1 id="home-hero-title" ref={headingRef} tabIndex={-1}>
            {copy.hero.title}
          </h1>
          <p className="home-hero__description">{copy.hero.description}</p>
          <div className="home-hero__actions">
            <a className="button button--primary" href="#divisions">
              {copy.hero.servicesCta}
            </a>
            <a className="button button--secondary" href="#platform-demo">
              {copy.hero.demoCta}
            </a>
            <a className="button button--accent" href="#interest">
              {copy.hero.interestCta}
            </a>
          </div>
        </div>

        <div className="home-hero__visual" aria-hidden="true">
          <div className="home-hero__visual-grid">
            <div className="home-hero__visual-item home-hero__visual-item--technology">
              <span className="home-hero__visual-index">01</span>
              <span>{copy.hero.visualTechnology}</span>
            </div>
            <div className="home-hero__visual-item home-hero__visual-item--detailing">
              <span className="home-hero__visual-index">02</span>
              <span>{copy.hero.visualDetailing}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-divisions home-section"
        id="divisions"
        aria-labelledby="home-divisions-title"
        tabIndex={-1}
      >
        <p className="home-eyebrow">{copy.divisions.eyebrow}</p>
        <h2 id="home-divisions-title">{copy.divisions.title}</h2>
        <p className="home-section__intro">{copy.divisions.description}</p>
        <div className="home-division-grid">
          <DivisionCard copy={copy.divisions.technology} variant="technology" />
          <DivisionCard copy={copy.divisions.detailing} variant="detailing" />
        </div>
        <p className="home-disclaimer">{copy.divisions.disclaimer}</p>
      </section>

      <section
        className="home-coverage home-section"
        aria-labelledby="home-coverage-title"
      >
        <div className="home-coverage__visual" aria-hidden="true">
          <span className="home-coverage__location">
            {copy.coverage.location}
          </span>
        </div>
        <div className="home-coverage__copy">
          <p className="home-eyebrow">{copy.coverage.eyebrow}</p>
          <h2 id="home-coverage-title">{copy.coverage.title}</h2>
          <p>{copy.coverage.description}</p>
        </div>
      </section>

      <section
        className="home-demo home-section"
        id="platform-demo"
        aria-labelledby="home-demo-title"
        tabIndex={-1}
      >
        <div className="home-demo__content">
          <p className="home-eyebrow">{copy.demo.eyebrow}</p>
          <h2 id="home-demo-title">{copy.demo.title}</h2>
          <p>{copy.demo.description}</p>
        </div>
      </section>

      <section
        className="home-interest home-section"
        id="interest"
        aria-labelledby="home-interest-title"
        tabIndex={-1}
      >
        <div>
          <p className="home-eyebrow">{copy.interest.eyebrow}</p>
          <h2 id="home-interest-title">{copy.interest.title}</h2>
          <p className="home-section__intro">{copy.interest.description}</p>
        </div>
        <p className="home-interest__placeholder">
          {copy.interest.placeholder}
        </p>
      </section>
    </div>
  );
}
