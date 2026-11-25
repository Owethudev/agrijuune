import type { RefObject } from 'react';
import type { PrivacyPageCopy } from '../content/translations';
import './InfoPages.css';

type PrivacyPageProps = {
  copy: PrivacyPageCopy;
  headingRef: RefObject<HTMLHeadingElement | null>;
};

export function PrivacyPage({ copy, headingRef }: PrivacyPageProps) {
  return (
    <article className="page-content card info-page privacy-page">
      <p className="page-eyebrow">{copy.eyebrow}</p>
      <h1 ref={headingRef} tabIndex={-1}>
        {copy.title}
      </h1>
      <p className="page-description">{copy.description}</p>

      {copy.sections.map((section) => (
        <section className="about-page__section" key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </section>
      ))}

      <section className="about-page__section">
        <h2>{copy.contactTitle}</h2>
        <p>
          {copy.contactDescription}{' '}
          <a href={`mailto:${copy.contactEmail}`}>{copy.contactEmail}</a>
        </p>
      </section>

      <p className="privacy-page__disclaimer">{copy.disclaimer}</p>
    </article>
  );
}
