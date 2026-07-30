# Crown Website Backlog

This file tracks deferred website ideas that should not be treated as active implementation work.

## Future Blog And SEO/AEO Content Engine

Status: Backlog. Do not implement until explicitly requested.

Goal: Add a repo-managed blog to Crown's Astro site without a CMS. Agents should manage content through Markdown/MDX files and follow strict publishing instructions optimized for SEO, AEO, and AI citation.

### Why No CMS

- The repo can remain the source of truth.
- Agents can create, review, and update content through version control.
- Static Astro content keeps the site fast and simple on Netlify.
- Editorial rules can live beside the content as instructions.

### Proposed Technical Shape

- Add `src/content/blog/*.md` or `src/content/blog/*.mdx` for posts.
- Add `src/content.config.ts` for frontmatter validation.
- Add `/blog` listing page.
- Add `/blog/[slug]` article page.
- Add a reusable blog/article layout.
- Add links in `Header.astro` and `Footer.astro` only after the first posts exist.
- Add article schema (`Article` or `BlogPosting`), sitemap support, and optional RSS.
- Consider adding `llms.txt` later with a clear Crown overview and key public URLs.

### Required Frontmatter

Each post should include:

```yaml
title:
description:
target_query:
search_intent:
icp:
author:
publish_date:
updated_date:
category:
tags:
canonical:
summary:
sources:
draft: true
```

### Publishing Rules

- Do not write generic blog posts.
- Do not use old ICP language: startup, Series A/B, runway, burn rate.
- Speak to founder-led growing businesses, especially the $10M-$40M revenue band.
- One post should answer one primary search intent.
- Each article should open with a direct 40-60 word answer block.
- Use H2/H3 headings that match real search phrasing.
- Include FAQ blocks for natural-language questions.
- Include source-backed claims when citing data, benchmarks, or market facts.
- Include author/expert attribution and a visible "last updated" date.
- Add internal links to relevant service, pricing, team, Clarity Check, or contact pages.
- Use Crown voice: structured, strategic, executive, calm-confident.

### Topic Mapping Before Writing

Before creating posts, build a topic map from real searches:

1. Pull available Google Search Console queries for Crown.
2. Check Google autocomplete, People Also Ask, and related searches.
3. Review competitor pages ranking for relevant queries.
4. Group queries by intent: problem-aware, solution-aware, comparison, decision, and answer-engine.
5. Prioritize by ICP fit, commercial intent, search demand, and whether Crown has a credible POV.

### Initial Topic Clusters To Research

- Fractional CFO for founder-led businesses.
- When to hire a CFO.
- Fractional CFO vs bookkeeper.
- Fractional CFO vs full-time CFO.
- Finance function for a $10M business.
- Month-end close process.
- Why books close late.
- Financial visibility for business owners.
- Back-office systems for growing businesses.
- Cash flow visibility for business owners.
- Preparing a business for sale.
- Exit readiness for founder-led businesses.
- Accounting cleanup before a sale.
- What clean financials mean for a buyer.

### First Cornerstone Candidates

- `what-does-a-fractional-cfo-do`
- `when-to-hire-a-cfo-for-a-growing-business`
- `fractional-cfo-vs-bookkeeper`
- `month-end-close-process-for-growing-business`
- `prepare-business-for-sale-clean-financials`

### Future Agent Workflow

When implementing the blog:

1. Create the content infrastructure first.
2. Create a topic map before drafting posts.
3. Publish 3-5 cornerstone articles before adding supporting posts.
4. Keep every post open and crawlable.
5. Add schema and sitemap support before launch.
6. Run `npm run build`.
7. Deploy through Netlify only after user approval.

