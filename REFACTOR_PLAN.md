# Prioritized refactor plan

## P0 - Make the core journey work

- [x] Preserve organization repositories as read-only sources.
- [x] Combine frontend and backend into a reproducible personal working copy.
- [x] Repair contact, registration, and login wiring.
- [x] Await database operations and report failures correctly.
- [x] Remove plaintext password storage.
- [x] Add environment configuration and a health endpoint.
- [x] Add a small automated test baseline.
- [ ] Verify successful writes against a disposable MySQL database.

## P1 - Portfolio credibility

- [ ] Run responsive and accessibility checks on all pages.
- [ ] Replace missing cart links with a completed cart flow or remove them from navigation.
- [ ] Consolidate duplicated CSS and fix invalid/nested HTML.
- [ ] Add loading, success, and inline error states instead of alerts.
- [ ] Add screenshots, architecture diagram, API examples, and a deployed demo.

## P2 - Production hardening

- [ ] Add sessions, logout, authorization, rate limiting, and CSRF strategy.
- [ ] Replace schema sync with migrations.
- [ ] Add full database integration and browser end-to-end tests.
- [ ] Add CI for tests, linting, and dependency review.
