# Project Language and Styling Defaults

- **Status:** Accepted.
- **Date:** 2026-11-22
- **Confirmed:** 2026-11-23

## Context

The project uses React/Vite for the frontend and Node/Express for the
backend. Both applications already use strict TypeScript. The frontend
already uses CSS files and shared CSS custom properties; no styling
framework is installed.

## Decision

- Keep strict TypeScript in both the frontend and backend.
- Keep the existing CSS approach, including shared CSS custom
  properties. Do not introduce Tailwind CSS or another styling
  framework.
- Leave the existing npm workspace setup unchanged; package-manager
  changes are outside this decision.

## Consequences

- The existing TypeScript compiler configurations remain authoritative.
- New frontend styling follows the current CSS conventions.
- Reconsider this decision only with product-owner approval and a
  documented migration plan.
