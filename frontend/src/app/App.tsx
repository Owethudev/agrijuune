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
import './App.css';

const notFoundPage = {
  title: 'Page not found',
  description: 'The page you requested could not be found.',
};

export function App() {
  const [pathname, setPathname] = useState(() =>
    normalizePath(window.location.pathname),
  );
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const activeRoute = getRoute(pathname);
  const page = activeRoute ?? notFoundPage;
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
    document.title =
      page.title === 'Agrijuune' ? 'Agrijuune' : `${page.title} | Agrijuune`;

    if (previousPathRef.current !== pathname) {
      headingRef.current?.focus();
    }

    previousPathRef.current = pathname;
  }, [page.title, pathname]);

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

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header" onKeyDown={handleNavigationKeyDown}>
        <div className="site-header__inner">
          <a
            className="site-brand"
            href="/"
            aria-label="Agrijuune home"
            onClick={(event) => navigate(event, '/')}
          >
            <img src="/agrijuune-logo.svg" alt="" />
          </a>

          <button
            ref={menuButtonRef}
            className="navigation-toggle"
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={isNavigationOpen}
            onClick={() => setIsNavigationOpen((isOpen) => !isOpen)}
          >
            {isNavigationOpen ? 'Close menu' : 'Menu'}
          </button>

          <nav
            id="primary-navigation"
            className={`primary-navigation${isNavigationOpen ? ' primary-navigation--open' : ''}`}
            aria-label="Primary"
          >
            {routes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                aria-current={
                  activeRoute?.path === route.path ? 'page' : undefined
                }
                onClick={(event) => navigate(event, route.path)}
              >
                {route.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" className="main-content" tabIndex={-1}>
        <div className="page-content">
          <p className="page-eyebrow">Agrijuune</p>
          <h1 ref={headingRef} tabIndex={-1}>
            {page.title}
          </h1>
          <p className="page-description">{page.description}</p>
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <a
            className="footer-brand"
            href="/"
            onClick={(event) => navigate(event, '/')}
          >
            Agrijuune
          </a>
          <p>
            Farm management technology and agricultural machinery detailing.
          </p>
          <nav className="footer-navigation" aria-label="Footer">
            {routes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                onClick={(event) => navigate(event, route.path)}
              >
                {route.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
