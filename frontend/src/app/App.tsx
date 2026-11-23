import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import {
  getRoute,
  normalizePath,
  routes,
  type RoutePath,
} from '../routing/routes';
import {
  getRouteCopy,
  translations,
  type Language,
} from '../content/translations';
import { HomePage } from './HomePage';
import './App.css';

export function App() {
  const [pathname, setPathname] = useState(() =>
    normalizePath(window.location.pathname),
  );
  const [language, setLanguage] = useState<Language>('en');
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const activeRoute = getRoute(pathname);
  const isHomePage = activeRoute?.path === '/';
  const languageContent = translations[language];
  const page = activeRoute
    ? getRouteCopy(language, activeRoute.path)
    : languageContent.notFound;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname));
      setIsNavigationOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = languageContent.htmlLang;
    document.title =
      page.title === 'Agrijuune' ? 'Agrijuune' : `${page.title} | Agrijuune`;

    const metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (metaDescription) {
      metaDescription.content = languageContent.metaDescription;
    }

    if (previousPathRef.current !== pathname) {
      headingRef.current?.focus();
    }

    previousPathRef.current = pathname;
  }, [
    language,
    languageContent.htmlLang,
    languageContent.metaDescription,
    page.title,
    pathname,
  ]);

  function navigate(event: MouseEvent<HTMLAnchorElement>, path: RoutePath) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setIsNavigationOpen(false);

    const nextPath = normalizePath(path);
    if (nextPath === pathname) {
      headingRef.current?.focus();
      return;
    }

    window.history.pushState(null, '', nextPath);
    setPathname(nextPath);
  }

  function handleNavigationKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && isNavigationOpen) {
      setIsNavigationOpen(false);
      menuButtonRef.current?.focus();
    }
  }

  function handleLanguageChange(value: string) {
    if (value === 'en' || value === 'af') {
      setLanguage(value);
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {languageContent.shared.skipLink}
      </a>

      <header className="site-header" onKeyDown={handleNavigationKeyDown}>
        <div className="container site-header__inner">
          <a
            className="site-brand"
            href="/"
            aria-label={languageContent.shared.homeLinkLabel}
            onClick={(event) => navigate(event, '/')}
          >
            <img src="/agrijuune-logo.svg" alt="" />
          </a>

          <button
            ref={menuButtonRef}
            className="button button--secondary navigation-toggle"
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={isNavigationOpen}
            onClick={() => setIsNavigationOpen((isOpen) => !isOpen)}
          >
            {isNavigationOpen
              ? languageContent.shared.closeMenu
              : languageContent.shared.menu}
          </button>

          <nav
            id="primary-navigation"
            className={`primary-navigation${isNavigationOpen ? ' primary-navigation--open' : ''}`}
            aria-label={languageContent.shared.primaryNavigationLabel}
          >
            {routes.map((route) => {
              const routeCopy = getRouteCopy(language, route.path);

              return (
                <a
                  key={route.path}
                  href={route.path}
                  aria-current={
                    activeRoute?.path === route.path ? 'page' : undefined
                  }
                  onClick={(event) => navigate(event, route.path)}
                >
                  {routeCopy.label}
                </a>
              );
            })}
            <div className="language-switch">
              <select
                aria-label={languageContent.shared.languageSwitcherLabel}
                value={language}
                onChange={(event) =>
                  handleLanguageChange(event.currentTarget.value)
                }
              >
                <option value="en" lang="en-ZA">
                  English
                </option>
                <option value="af" lang="af-ZA">
                  Afrikaans
                </option>
              </select>
            </div>
          </nav>
        </div>
      </header>

      <main
        id="main-content"
        className={`main-content${isHomePage ? ' main-content--home' : ''}`}
        tabIndex={-1}
      >
        {isHomePage ? (
          <HomePage copy={languageContent.home} headingRef={headingRef} />
        ) : (
          <div className="page-content card">
            <p className="page-eyebrow">Agrijuune</p>
            <h1 ref={headingRef} tabIndex={-1}>
              {page.title}
            </h1>
            <p className="page-description">{page.description}</p>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <a
            className="footer-brand"
            href="/"
            onClick={(event) => navigate(event, '/')}
          >
            Agrijuune
          </a>
          <p>{languageContent.shared.footerDescription}</p>
          <nav
            className="footer-navigation"
            aria-label={languageContent.shared.footerNavigationLabel}
          >
            {routes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                onClick={(event) => navigate(event, route.path)}
              >
                {getRouteCopy(language, route.path).label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
