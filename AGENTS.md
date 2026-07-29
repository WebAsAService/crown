# Crown Website — Agent Notes

This repo is the Crown Acquisition Group website revamp.

## Current Branch

- Active branch: `copy-revamp-and-team`
- Remote: `origin/copy-revamp-and-team`
- Latest relevant commit: `621b91b Refine team page responsive layout`

## Recent Work

- Homepage copy was repositioned away from early-stage/startup language toward Crown's current ICP: founder-led growing businesses, especially the $10M-$40M revenue range.
- A standalone `/team` page was added and linked from the header/footer.
- `/team` now separates day-to-day operators from the Board of Advisors.
- The operator section is 4-up on desktop.
- On mobile, the team and advisor card rows use horizontal swipe/scroll snap carousels to avoid a long vertical stack of bios.

## Deployment

- Netlify project: `crown-ag-revamp-preview`
- Production URL: `https://crown-ag-revamp-preview.netlify.app`
- Project ID: `a3517f04-c6e6-4b56-ac3c-356d27d9f8cd`
- Last direct production deploy: July 29, 2026, from local `dist`
- Deploy URL: `https://6a6a67639ac5faa3905defc5--crown-ag-revamp-preview.netlify.app`
- Build logs: `https://app.netlify.com/projects/crown-ag-revamp-preview/deploys/6a6a67639ac5faa3905defc5`

Use `npm run build` locally. Netlify's UI build command is currently `yarn run build`; on this machine, `yarn` was not available, so the direct production deploy used:

```powershell
netlify deploy --prod --no-build --dir=dist --site=a3517f04-c6e6-4b56-ac3c-356d27d9f8cd
```

## Known Cleanup Candidates

- `package-lock.json` is untracked locally while the repo also has `yarn.lock`; decide which package manager is canonical before committing lockfile changes.
- `/landing/clarity-check` still contains old ICP language such as investors, runway, seed, and Series A.
- `/clients/crown` still uses the older Crown theme and embedded `TeamSection`; decide whether to retire it or align it with `/`.
- Build warnings remain for unsupported image files under `src/pages/clients/crown/assets`, a missing `/images/clients/crown/grid-pattern.svg`, stale Browserslist data, and PostCSS `@import` ordering.

