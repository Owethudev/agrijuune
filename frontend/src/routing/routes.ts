export const routes = [
  { path: '/' },
  { path: '/services' },
  { path: '/about' },
  { path: '/faq' },
] as const;

export type RoutePath = (typeof routes)[number]['path'];

export const teamPaths = {
  signIn: '/team/sign-in',
  portal: '/team',
} as const;

export type AppPath = RoutePath | (typeof teamPaths)[keyof typeof teamPaths];

export function normalizePath(pathname: string) {
  if (pathname === '/') {
    return pathname;
  }

  return pathname.replace(/\/+$/, '') || '/';
}

export function getRoute(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  const path = normalizedPath === '/contact' ? '/about' : normalizedPath;

  return routes.find((route) => route.path === path);
}
