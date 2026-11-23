import { useState } from 'react';
import type { HomePageCopy, Language } from '../content/translations';
import {
  DEMO_CAPABILITY_RECORDS,
  DEMO_DATA_NOTICE,
  DEMO_MACHINERY_RECORDS,
} from './demoData';
import './GuidedDemo.css';

type GuidedDemoProps = {
  copy: HomePageCopy['demo'];
  language: Language;
};

export function GuidedDemo({ copy, language }: GuidedDemoProps) {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const activeStepIndex =
    currentStep !== null && currentStep < DEMO_CAPABILITY_RECORDS.length
      ? currentStep
      : null;
  const activeCapability =
    activeStepIndex !== null ? DEMO_CAPABILITY_RECORDS[activeStepIndex] : null;
  const isComplete = currentStep === DEMO_CAPABILITY_RECORDS.length;

  if (activeStepIndex !== null && !activeCapability) {
    throw new Error(`Missing demo capability for step ${activeStepIndex}.`);
  }

  function showNextStep() {
    if (currentStep !== null && currentStep < DEMO_CAPABILITY_RECORDS.length) {
      setCurrentStep(currentStep + 1);
    }
  }

  function showPreviousStep() {
    if (currentStep !== null && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function restartDemo() {
    setCurrentStep(null);
  }

  return (
    <div className="guided-demo">
      <aside className="guided-demo__notice" role="note">
        <strong>{DEMO_DATA_NOTICE.title[language]}</strong>
        <p>{DEMO_DATA_NOTICE.description[language]}</p>
      </aside>

      {currentStep === null && (
        <div className="guided-demo__intro">
          <button
            className="button button--primary"
            type="button"
            onClick={() => setCurrentStep(0)}
          >
            {copy.startButton}
          </button>
        </div>
      )}

      {activeStepIndex !== null && activeCapability && (
        <div className="guided-demo__step">
          <div className="guided-demo__progress">
            <p aria-live="polite" aria-atomic="true">
              {copy.stepLabel} {activeStepIndex + 1} {copy.stepOfLabel}{' '}
              {DEMO_CAPABILITY_RECORDS.length}
            </p>
            <progress
              aria-label={copy.progressLabel}
              max={DEMO_CAPABILITY_RECORDS.length}
              value={activeStepIndex + 1}
            />
          </div>

          <article className="guided-demo__capability" aria-live="polite">
            <p className="guided-demo__badge">{copy.potentialLabel}</p>
            <h3>{activeCapability.title[language]}</h3>
            <p>{activeCapability.description[language]}</p>

            {activeCapability.id === 'machinery-register' && (
              <section
                className="guided-demo__machinery"
                aria-label={copy.machineryCardTitle}
              >
                <h4>{copy.machineryCardTitle}</h4>
                <dl>
                  <div>
                    <dt>{copy.machineryNameLabel}</dt>
                    <dd>{DEMO_MACHINERY_RECORDS[0].name[language]}</dd>
                  </div>
                  <div>
                    <dt>{copy.manufacturerLabel}</dt>
                    <dd>{DEMO_MACHINERY_RECORDS[0].manufacturer[language]}</dd>
                  </div>
                  <div>
                    <dt>{copy.modelLabel}</dt>
                    <dd>{DEMO_MACHINERY_RECORDS[0].model[language]}</dd>
                  </div>
                </dl>
              </section>
            )}
          </article>

          <nav
            className="guided-demo__controls"
            aria-label={copy.controlsLabel}
          >
            <button
              className="button button--secondary"
              type="button"
              onClick={showPreviousStep}
              disabled={activeStepIndex === 0}
            >
              {copy.backButton}
            </button>
            <button
              className="button button--primary"
              type="button"
              onClick={showNextStep}
            >
              {activeStepIndex === DEMO_CAPABILITY_RECORDS.length - 1
                ? copy.finishButton
                : copy.nextButton}
            </button>
            <button
              className="button button--secondary"
              type="button"
              onClick={restartDemo}
            >
              {copy.restartButton}
            </button>
          </nav>
        </div>
      )}

      {isComplete && (
        <div className="guided-demo__completion" aria-live="polite">
          <h3>{copy.completionTitle}</h3>
          <p>{copy.completionDescription}</p>
          <button
            className="button button--primary"
            type="button"
            onClick={restartDemo}
          >
            {copy.restartButton}
          </button>
        </div>
      )}
    </div>
  );
}
