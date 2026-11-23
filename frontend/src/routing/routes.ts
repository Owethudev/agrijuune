export const routes = [
  {
    path: '/',
    label: 'Home',
    title: 'Agrijuune',
    description:
      'Farm management technology and agricultural machinery detailing.',
  },
  {
    path: '/services',
    label: 'Services',
    title: 'Services',
    description: 'Information about Agrijuune services will be added here.',
  },
  {
    path: '/about',
    label: 'About / Contact',
    title: 'About & Contact',
    description: 'Company and contact information will be added here.',
  },
  {
    path: '/faq',
    label: 'FAQ',
    title: 'Frequently asked questions',
    description: 'Answers to common questions will be added here.',
  },
] as const;

export type RoutePath = (typeof routes)[number]['path'];

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
