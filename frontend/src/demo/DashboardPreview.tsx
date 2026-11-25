import { useEffect, useRef, useState } from 'react';
import type { HomePageCopy, Language } from '../content/translations';
import { DEMO_MACHINERY_RECORDS } from './demoData';
import './DashboardPreview.css';

type DashboardTab = 'overview' | 'fleet' | 'schedule';

type DashboardPreviewProps = {
  copy: HomePageCopy['demo']['dashboard'];
  language: Language;
  onClose: () => void;
};

export function DashboardPreview({
  copy,
  language,
  onClose,
}: DashboardPreviewProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const fleetStatuses = [
    copy.statuses.active,
    copy.statuses.serviceDue,
    copy.statuses.detailingDone,
  ] as const;

  const kpiCards = [
    {
      label: copy.kpis.fleetLabel,
      value: copy.kpis.fleetValue,
      note: copy.kpis.fleetNote,
    },
    {
      label: copy.kpis.maintenanceLabel,
      value: copy.kpis.maintenanceValue,
      note: copy.kpis.maintenanceNote,
    },
    {
      label: copy.kpis.toolsLabel,
      value: copy.kpis.toolsValue,
      note: copy.kpis.toolsNote,
    },
    {
      label: copy.kpis.detailingLabel,
      value: copy.kpis.detailingValue,
      note: copy.kpis.detailingNote,
    },
  ];

  return (
    <div
      className="dashboard-preview__backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="dashboard-preview__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-preview-title"
      >
        <header className="dashboard-preview__header">
          <div>
            <p className="dashboard-preview__eyebrow">{copy.eyebrow}</p>
            <h2 id="dashboard-preview-title">{copy.title}</h2>
            <p className="dashboard-preview__subtitle">{copy.subtitle}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="button button--secondary dashboard-preview__close"
            onClick={onClose}
            aria-label={copy.closeLabel}
          >
            {copy.closeLabel}
          </button>
        </header>

        <section
          className="dashboard-preview__kpis"
          aria-label={copy.tabs.overview}
        >
          {kpiCards.map((kpi) => (
            <article className="dashboard-preview__kpi" key={kpi.label}>
              <p className="dashboard-preview__kpi-label">{kpi.label}</p>
              <p className="dashboard-preview__kpi-value">{kpi.value}</p>
              <p className="dashboard-preview__kpi-note">{kpi.note}</p>
            </article>
          ))}
        </section>

        <div
          className="dashboard-preview__tabs"
          role="tablist"
          aria-label={copy.tabsLabel}
        >
          {(
            [
              ['overview', copy.tabs.overview],
              ['fleet', copy.tabs.fleet],
              ['schedule', copy.tabs.schedule],
            ] as const
          ).map(([tabId, label]) => (
            <button
              key={tabId}
              id={`dashboard-tab-${tabId}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tabId}
              aria-controls={`dashboard-panel-${tabId}`}
              className={`dashboard-preview__tab${
                activeTab === tabId ? ' dashboard-preview__tab--active' : ''
              }`}
              onClick={() => setActiveTab(tabId)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="dashboard-preview__body">
          {activeTab === 'overview' && (
            <div
              id="dashboard-panel-overview"
              role="tabpanel"
              aria-labelledby="dashboard-tab-overview"
              className="dashboard-preview__grid"
            >
              <section className="dashboard-preview__panel">
                <h3>{copy.fleetTitle}</h3>
                <ul className="dashboard-preview__list">
                  {DEMO_MACHINERY_RECORDS.map((machine, index) => (
                    <li
                      key={machine.id}
                      className="dashboard-preview__list-item"
                    >
                      <div>
                        <strong>{machine.name[language]}</strong>
                        <span>{machine.model[language]}</span>
                      </div>
                      <span className="dashboard-preview__pill">
                        {fleetStatuses[index] ?? copy.statuses.active}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="dashboard-preview__panel">
                <h3>{copy.fieldsTitle}</h3>
                <ul className="dashboard-preview__list">
                  {copy.fields.map((field) => (
                    <li
                      key={field.name}
                      className="dashboard-preview__list-item"
                    >
                      <div>
                        <strong>{field.name}</strong>
                        <span>{field.crop}</span>
                      </div>
                      <span className="dashboard-preview__pill">
                        {field.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {activeTab === 'fleet' && (
            <div
              id="dashboard-panel-fleet"
              role="tabpanel"
              aria-labelledby="dashboard-tab-fleet"
              className="dashboard-preview__panel"
            >
              <h3>{copy.toolsTitle}</h3>
              <ul className="dashboard-preview__list">
                {copy.tools.map((tool) => (
                  <li key={tool.name} className="dashboard-preview__list-item">
                    <div>
                      <strong>{tool.name}</strong>
                      <span>{tool.location}</span>
                    </div>
                    <span className="dashboard-preview__pill">
                      {tool.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div
              id="dashboard-panel-schedule"
              role="tabpanel"
              aria-labelledby="dashboard-tab-schedule"
              className="dashboard-preview__panel"
            >
              <h3>{copy.scheduleTitle}</h3>
              <ul className="dashboard-preview__list">
                {copy.scheduleItems.map((item) => (
                  <li
                    key={`${item.date}-${item.asset}`}
                    className="dashboard-preview__list-item"
                  >
                    <div>
                      <strong>
                        {item.date} — {item.task}
                      </strong>
                      <span>{item.asset}</span>
                    </div>
                    <span className="dashboard-preview__pill">{item.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <footer className="dashboard-preview__footer">
          <p>{copy.ctaText}</p>
          <div className="dashboard-preview__footer-actions">
            <a
              href="#home-interest"
              className="button button--primary"
              onClick={onClose}
            >
              {copy.ctaButton}
            </a>
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
            >
              {copy.closeLabel}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
