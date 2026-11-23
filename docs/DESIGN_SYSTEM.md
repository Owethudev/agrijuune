# Agrijuune Design System

## Status

The supplied identity pack provides the working palette. Typography and
the detailed UI tokens below are provisional until founder review; they
are not final brand approval. Keep the existing CSS approach and use
these shared values and primitives rather than introducing a styling
framework.

## Working palette

The values below come from
[`resources/companyIdentityPack/brand-colors.json`](../resources/companyIdentityPack/brand-colors.json):

| Token                     | Value     | Intended use                       |
| ------------------------- | --------- | ---------------------------------- |
| `--agrijuune-navy`        | `#0B2D5B` | Primary brand surface and headings |
| `--agrijuune-red`         | `#E30613` | Accent and focus indicator         |
| `--agrijuune-blue`        | `#00AEEF` | Decorative accents                 |
| `--agrijuune-cloud-white` | `#F8FAFC` | Subtle page surface                |
| `--agrijuune-ink`         | `#071B33` | Primary text                       |

Blue is decorative, not text, on cloud white: its contrast is below the
WCAG AA threshold for normal text. The red has a 4.67:1 contrast ratio
against cloud white. Check contrast again whenever adding a new
foreground/background pairing.

Semantic surface, muted-text, border and hover colors are implementation
choices and remain provisional.

## Provisional UI tokens

The token source is [`frontend/src/styles/tokens.css`](../frontend/src/styles/tokens.css).

- **Typography:** Inter with system sans-serif fallbacks; body 16px,
  small labels 13px, and responsive display/lead sizes. Final typeface
  and scale require founder review.
- **Spacing:** A provisional 8px base scale, with a 4px half-step.
- **Layout:** Content width 72rem, page width 48rem, copy width 38rem.
- **Breakpoints:** 40rem for the horizontal primary navigation and
  64rem for the wide footer layout. CSS media queries use matching
  literal values because custom properties cannot be used there.
- **Shape and depth:** Small/medium/large radii and three restrained
  elevation levels; all remain provisional.
- **Accessibility:** Controls are at least 44px tall. Keep visible
  keyboard focus indicators, semantic landmarks, and responsive
  layouts.

Review these values against the PRD and brand direction before treating
them as approved design tokens.

## Shared CSS primitives

The primitives live in [`frontend/src/app/App.css`](../frontend/src/app/App.css)
and can be reused by public pages:

- `.container` constrains and centers page content.
- `.button` provides a shared control size and shape; use
  `.button--primary`, `.button--secondary` or `.button--accent` for
  visual variants.
- `.card` provides a bordered surface with restrained elevation.

Extend these primitives only when a public-page need is shared; keep
page-specific layout and content styles scoped to their page.
