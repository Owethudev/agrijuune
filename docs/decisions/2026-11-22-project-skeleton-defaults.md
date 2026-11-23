# Project Skeleton Defaults

- **Status:** Provisional; confirmation is still required.
- **Date:** 2026-11-22

## Context

The project documentation establishes React/Vite, Node/Express and
Supabase/PostgreSQL, but leaves the application language and package
manager open. No manifests or lockfiles existed when the skeleton was
started.

## Provisional setup

- TypeScript is used because `ARCHITECTURE.md` recommends it.
- npm workspaces are used as the default because no package manager was
  previously established.

These are setup assumptions, not product-owner-approved architectural
decisions. Confirm them before treating this scaffold as the permanent
project standard.
