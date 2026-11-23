import type { RoutePath } from '../routing/routes';

const SITE_URL = 'https://agrijuune.vercel.app';
const SOCIAL_IMAGE_URL = `${SITE_URL}/agrijuune-social-image.png`;

type MetadataAttribute = 'name' | 'property';

function setMeta(attribute: MetadataAttribute, key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.content = content;
}

function setCanonicalUrl(url: string | null) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (!url) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.append(element);
  }

  element.href = url;
}

export function updatePageMetadata({
  language,
  path,
  title,
  description,
}: {
  language: string;
  path: RoutePath | null;
  title: string;
  description: string;
}) {
  const documentTitle = title === 'Agrijuune' ? title : `${title} | Agrijuune`;
  const pageUrl = path ? new URL(path, `${SITE_URL}/`).href : null;

  document.documentElement.lang = language;
  document.title = documentTitle;

  setMeta('name', 'description', description);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'Agrijuune');
  setMeta('property', 'og:title', documentTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:image', SOCIAL_IMAGE_URL);
  setMeta(
    'property',
    'og:image:alt',
    'Agrijuune logo and Manage, Maintain, Perform brand line',
  );
  setMeta('property', 'og:image:type', 'image/png');
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:locale', language.replace('-', '_'));
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', documentTitle);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', SOCIAL_IMAGE_URL);
  setMeta(
    'name',
    'twitter:image:alt',
    'Agrijuune logo and Manage, Maintain, Perform brand line',
  );
  setMeta('name', 'robots', pageUrl ? 'index,follow' : 'noindex,nofollow');
  setCanonicalUrl(pageUrl);

  if (pageUrl) {
    setMeta('property', 'og:url', pageUrl);
  } else {
    document.head.querySelector('meta[property="og:url"]')?.remove();
  }
}
