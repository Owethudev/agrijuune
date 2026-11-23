import type { HomeDivisionCopy } from '../content/translations';
import './DivisionCard.css';

type DivisionCardProps = {
  copy: HomeDivisionCopy;
  variant: 'technology' | 'detailing';
  ctaHref: string;
};

export function DivisionCard({ copy, variant, ctaHref }: DivisionCardProps) {
  return (
    <article
      className={`division-card division-card--${variant}`}
      aria-labelledby={`division-${variant}-title`}
    >
      <p className="division-card__status">{copy.status}</p>
      <h3 id={`division-${variant}-title`}>{copy.title}</h3>
      <p className="division-card__description">{copy.description}</p>
      <ul className="division-card__highlights">
        {copy.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <a className="division-card__link" href={ctaHref}>
        {copy.ctaLabel}
      </a>
    </article>
  );
}
