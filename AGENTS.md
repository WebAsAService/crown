# Crown Website — Agent Notes

This repo is the Crown Acquisition Group website revamp.

## Current Branch

- Active branch: `copy-revamp-and-team`
- Remote: `origin/copy-revamp-and-team`
- Latest relevant implementation commit: `3ef8ad1 Polish team card copy and layout`

## Recent Work

- Homepage copy was repositioned away from early-stage/startup language toward Crown's current ICP: growing and established companies, executive teams, finance leaders, and business owners.
- A standalone `/team` page was added and linked from the header/footer.
- `/team` now separates day-to-day operators from the Advisory Board.
- Final team-page revision notes were applied: the main headline is "The people who connect the dots.", the duplicate pre-card heading was removed, five functional boxes use the approved function copy, the CTA says "Talk with Crown", and the footer now uses Crown's broader audience framing.
- Team card polish after review: operator bios are balanced to roughly the same length, the four-card desktop row uses the wider page container, Czarla's LinkedIn is included, the hero headline is kept to one line on desktop, and all team/advisor function tags use Title Case for consistency.
- The operator section is 4-up on desktop.
- On mobile, the team and advisor card rows use horizontal swipe/scroll snap carousels to avoid a long vertical stack of bios.
- Mobile team/advisor carousels have visible right-arrow controls. The controls advance by real card position and loop from the last card back to the first card.
- The five function cards use a centered flex wrap on mobile so the fifth item does not sit alone in a left-aligned grid cell. They return to a 5-up grid at tablet/desktop widths.
- The two Advisory Board cards are centered on desktop with fixed max-width cards inside the two-column grid.

## Deployment

- Netlify project: `crown-ag-revamp-preview`
- Production URL: `https://crown-ag-revamp-preview.netlify.app`
- Project ID: `a3517f04-c6e6-4b56-ac3c-356d27d9f8cd`
- Last direct production deploy: July 30, 2026, from local `dist`
- Deploy URL: `https://6a6b869eacde713493bd3ab5--crown-ag-revamp-preview.netlify.app`
- Build logs: `https://app.netlify.com/projects/crown-ag-revamp-preview/deploys/6a6b869eacde713493bd3ab5`

Use `npm run build` locally. Netlify's UI build command is currently `yarn run build`; on this machine, `yarn` was not available, so the direct production deploy used:

```powershell
netlify deploy --prod --no-build --dir=dist --site=a3517f04-c6e6-4b56-ac3c-356d27d9f8cd
```

## Known Cleanup Candidates

- Future blog/SEO/AEO work is parked in `BACKLOG.md`. Do not implement it until explicitly requested.
- `package-lock.json` is untracked locally while the repo also has `yarn.lock`; decide which package manager is canonical before committing lockfile changes.
- `/landing/clarity-check` still contains old investor and early-stage positioning.
- `/clients/crown` still uses the older Crown theme and embedded `TeamSection`; decide whether to retire it or align it with `/`.
- Build warnings remain for unsupported image files under `src/pages/clients/crown/assets`, a missing `/images/clients/crown/grid-pattern.svg`, stale Browserslist data, and PostCSS `@import` ordering.
