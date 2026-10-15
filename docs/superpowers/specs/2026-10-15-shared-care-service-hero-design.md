# Shared Care Service Hero

## Goal

Give every `/services/[slug]` page the same responsive hero layout shown in
the supplied reference while preserving each service's approved copy, image,
and destinations.

## Component

Add a single server-rendered `CareServiceHero` component under
`src/components/sections/services/`. It receives the existing page-specific
heading, supporting copy, image, image disclosure, primary CTA, and optional
secondary CTA. It has no data fetching and introduces no new content source.

The layout is a warm paper panel: copy and actions on the left, a rounded
editorial 4:5 image frame on the right, and a stacked mobile layout with copy
before the image. Existing `Button`, `CtaLink`, and `next/image` patterns are
used for consistent navigation, accessibility, and image behaviour.

## Migration

Replace the hero markup in each dedicated care landing page and the generic
`ServicePageTemplate` with `CareServiceHero`. Each page keeps its present
content module and imagery module; its current hero supplies those values to
the common component. Service-specific lower-page sections remain untouched.

## Acceptance checks

- Every service route uses the common visual hero structure.
- Desktop and mobile retain readable copy, keyboard-accessible CTAs, and
  descriptive image alt text.
- Existing CTA destinations and page content remain unchanged.
- ESLint passes for all touched files and TypeScript emits no new errors.
