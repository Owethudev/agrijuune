import { useState } from 'react';
import type { Ref } from 'react';
import type { HomePageCopy, Language } from '../content/translations';
import { GuidedDemo } from '../demo/GuidedDemo';
import { EnquiryForm } from '../enquiry/EnquiryForm';
import { enquiryCollectionEnabled } from '../enquiry/config';
import { DivisionCard } from './DivisionCard';
import './HomePage.css';

type HomePageProps = {
  copy: HomePageCopy;
  headingRef: Ref<HTMLHeadingElement>;
  language: Language;
};

function HomePhotoCarousel({ copy }: { copy: HomePageCopy['gallery'] }) {
  const slides = [
    {
      image: '/images/field-machinery.webp',
      copy: copy.slides.fieldMachinery,
    },
    {
      image: '/images/tractor.webp',
      copy: copy.slides.tractor,
    },
    {
      image: '/images/crop-work.webp',
      copy: copy.slides.cropWork,
    },
  ];
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = slides[activeSlideIndex];

  function moveSlide(direction: -1 | 1) {
    setActiveSlideIndex(
      (currentIndex) =>
        (currentIndex + direction + slides.length) % slides.length,
    );
  }

  return (
    <section
      className="home-gallery home-section"
      aria-labelledby="home-gallery-title"
      aria-roledescription={copy.carouselRoleDescription}
    >
      <div className="home-gallery__intro">
        <p className="home-eyebrow">{copy.eyebrow}</p>
        <h2 id="home-gallery-title">{copy.title}</h2>
        <p className="home-section__intro">{copy.description}</p>
      </div>

      <div className="home-gallery__carousel">
        <figure
          className="home-gallery__frame"
          role="group"
          aria-roledescription={copy.slideRoleDescription}
          aria-label={`${copy.slideLabel} ${activeSlideIndex + 1} ${copy.ofLabel} ${slides.length}`}
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.copy.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="home-gallery__caption">
            <h3>{activeSlide.copy.title}</h3>
            <p>{activeSlide.copy.description}</p>
          </figcaption>
        </figure>

        <div
          className="home-gallery__controls"
          role="group"
          aria-label={copy.controlsLabel}
        >
          <button
            className="button button--secondary"
            type="button"
            onClick={() => moveSlide(-1)}
          >
            {copy.previousLabel}
          </button>
          <p
            className="home-gallery__status"
            aria-live="polite"
            aria-atomic="true"
          >
            {copy.slideLabel} {activeSlideIndex + 1} {copy.ofLabel}{' '}
            {slides.length}: {activeSlide.copy.title}
          </p>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => moveSlide(1)}
          >
            {copy.nextLabel}
          </button>
        </div>

        <div
          className="home-gallery__selectors"
          role="group"
          aria-label={copy.slideSelectorLabel}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              aria-label={`${copy.showSlideLabel} ${index + 1}`}
              aria-pressed={activeSlideIndex === index}
              onClick={() => setActiveSlideIndex(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage({ copy, headingRef, language }: HomePageProps) {
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
          <DivisionCard
            copy={copy.divisions.technology}
            variant="technology"
            ctaHref="#interest"
          />
          <DivisionCard
            copy={copy.divisions.detailing}
            variant="detailing"
            ctaHref="#interest"
          />
        </div>
        <p className="home-disclaimer">{copy.divisions.disclaimer}</p>
      </section>

      <section
        className="home-coverage home-section"
        aria-labelledby="home-coverage-title"
      >
        <div className="home-coverage__visual">
          <img
            src="/images/south-africa-map.webp"
            alt={copy.coverage.mapAlt}
            loading="lazy"
            decoding="async"
          />
          <span className="home-coverage__location">
            <span className="home-coverage__location-dot" aria-hidden="true" />
            {copy.coverage.location}
          </span>
        </div>
        <div className="home-coverage__copy">
          <p className="home-eyebrow">{copy.coverage.eyebrow}</p>
          <h2 id="home-coverage-title">{copy.coverage.title}</h2>
          <p>{copy.coverage.description}</p>
        </div>
      </section>

      <HomePhotoCarousel copy={copy.gallery} />

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
          <GuidedDemo copy={copy.demo} language={language} />
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
        {enquiryCollectionEnabled ? (
          <EnquiryForm copy={copy.interest.form} />
        ) : (
          <p className="home-interest__placeholder">
            {copy.interest.placeholder}
          </p>
        )}
      </section>
    </div>
  );
}
