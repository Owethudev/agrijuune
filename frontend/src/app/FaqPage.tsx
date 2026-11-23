import type { Ref } from 'react';
import type { FaqPageCopy } from '../content/translations';
import './InfoPages.css';

type FaqPageProps = {
  copy: FaqPageCopy;
  title: string;
  headingRef: Ref<HTMLHeadingElement>;
};

export function FaqPage({ copy, title, headingRef }: FaqPageProps) {
  return (
    <section
      className="page-content card info-page faq-page"
      aria-labelledby="faq-page-title"
    >
      <p className="page-eyebrow">{copy.eyebrow}</p>
      <h1 id="faq-page-title" ref={headingRef} tabIndex={-1}>
        {title}
      </h1>
      <p className="page-description">{copy.description}</p>

      <section className="faq-list" aria-label={copy.questionsLabel}>
        {copy.questions.map(({ question, answer }) => (
          <details className="faq-item" key={question}>
            <summary>{question}</summary>
            <div className="faq-item__answer">
              <p>{answer}</p>
            </div>
          </details>
        ))}
      </section>
    </section>
  );
}
