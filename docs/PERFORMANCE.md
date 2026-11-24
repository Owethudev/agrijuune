# Agrijuune Performance Baseline

**Measured:** 2026-11-24\
**Target:** Production site at <https://agrijuune.vercel.app/>\
**Build:** `a3e4e2a`\
**Method:** Chromium browser measurements and the frontend production
build. These are lab observations, not field Core Web Vitals.

## Mobile lab baseline

The homepage was loaded with a 390 × 844 viewport, 4× CPU throttling,
150 ms network latency, 1.6 Mbps download and 512 Kbps upload. Browser
cache was disabled for the load.

| Metric | Observation | Target | Result |
| --- | ---: | ---: | --- |
| First Contentful Paint | 1,340 ms | — | Observed |
| Largest Contentful Paint | 1,340 ms | ≤ 2,500 ms | Pass |
| Cumulative Layout Shift | 0.000 | ≤ 0.100 | Pass |
| Longest tested interaction | 216–224 ms | INP ≤ 200 ms | Lab proxy only |

Interaction timings were collected with Chromium's Event Timing API
during menu open, internal navigation, anchor navigation, demo start and
demo step changes. Menu, anchor and demo interactions were 80–104 ms;
two route-navigation samples were 216 ms and 224 ms. This synthetic
maximum is not a field INP measurement. PageSpeed Insights returned
HTTP 429 during this check, so no CrUX field data was available.

## Production build and asset review

The Vite production build emitted one shared JavaScript bundle, one CSS
bundle and four route HTML entry points:

| Asset group | Baseline | Budget |
| --- | ---: | ---: |
| JavaScript, gzip | 76.46 KiB | ≤ 100 KiB |
| CSS, gzip | 3.61 KiB | ≤ 20 KiB |
| Route HTML, gzip total | 2.52 KiB | ≤ 20 KiB |
| Images, uncompressed total | 21,665 bytes | ≤ 100 KiB |

The page's initial network requests were limited to HTML, the shared
JavaScript and CSS, and the 825-byte SVG logo. The 20,327-byte social
preview image is not requested during page rendering. No external fonts,
video or WebGL assets are loaded; the demo uses locally bundled fictional
data and remains usable without decorative effects.

Direct production requests to `/`, `/services`, `/about` and `/faq` all
returned HTTP 200 with their expected page title and heading.

## Enforced budgets and follow-up

`npm run build` runs `npm run check:performance` after the workspace
builds. The check gzips all emitted JavaScript, CSS and HTML and checks
the total uncompressed image assets against the budgets above. It fails
the build if an asset group exceeds its limit.

The build budgets are guardrails, not substitutes for real-user
measurements. Recheck route-navigation responsiveness on representative
mobile devices and review field INP once production traffic provides
usable CrUX data. No asset or UI optimization was made before recording
this baseline.
