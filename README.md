# Kylle Ian Acibron — Portfolio

A single-page portfolio for Kylle Ian Acibron, an IT student and full-stack developer in
Negros Oriental, Philippines. It is a **static React site**: no server, no database, no API
keys. The whole thing builds to a folder of HTML, CSS, JS and images that any static host can
serve — including **Render**, which is the target this README documents.

- **Stack:** React 19, Vite, CSS Modules, `lucide-react`, `ogl` (PatternWaves and MicroSlats backdrops), Google Fonts (Sora + IBM Plex Sans)
- **No backend, no tracking, no cookies** — only `localStorage` for appearance settings
- **Light/dark themes, 3 accent colours, 4 background options**
- **Deployment:** one `render.yaml` Blueprint; build `npm ci && npm run build`, publish `dist`

---

## Table of contents

1. [Technologies used](#technologies-used)
2. [Project structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Run the project locally](#run-the-project-locally)
6. [Build for production](#build-for-production)
7. [Deploy to Render — step by step](#deploy-to-render--step-by-step)
8. [Render configuration](#render-configuration)
9. [Environment variables](#environment-variables)
10. [Deploying without `render.yaml` (manual setup)](#deploying-without-renderyaml-manual-setup)
11. [Updating and redeploying](#updating-and-redeploying)
12. [Verify the live site](#verify-the-live-site)
13. [Common deployment errors and fixes](#common-deployment-errors-and-fixes)
14. [Editing the content](#editing-the-content)
15. [Navigation and appearance panel](#navigation-and-appearance-panel)
16. [Accessibility and performance notes](#accessibility-and-performance-notes)
17. [Placeholders still to replace](#placeholders-still-to-replace)

---

## Technologies used

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | React 19 | Component structure for the sections |
| Build tool | Vite 8 | Fast dev server, hashed production assets |
| Styling | CSS Modules + CSS custom properties (`src/styles/tokens.css`) | Scoped styles, themes and accents from one token file |
| Icons | `lucide-react` | The icon-only sidebar and section headers |
| WebGL | `ogl` | Animated `PatternWaves` / `MicroSlats` backgrounds |
| Fonts | Google Fonts — Sora (headings), IBM Plex Sans (body) | Loaded with `display=swap` |
| Hosting | **Render Static Site** | Free TLS, global CDN, GitHub auto-deploy |
| Node (build) | 22.20.0, pinned in `.node-version` and `render.yaml` | Reproducible builds |

No test framework, linter or backend is included, and none is required to deploy.

## Project structure

```
myportfolio/
├── index.html                 Meta tags, fonts, JSON-LD, no-flash appearance script
├── package.json               Scripts, dependencies, engines (Node >= 20.19)
├── package-lock.json          Exact dependency tree used by `npm ci`
├── vite.config.js             Build config: outDir dist, base '/'
├── render.yaml                Render Blueprint (build, publish path, rewrite, headers)
├── .node-version              Node 22.20.0 for Render and other hosts
├── .gitignore                 node_modules, dist, local env files
├── .github/workflows/
│   └── deploy.yml             Optional GitHub Pages workflow (not used by Render)
├── public/
│   ├── favicon.svg            Served as /favicon.svg
│   └── og-image.svg           Placeholder social card
└── src/
    ├── main.jsx               Entry point (imports tokens.css + base.css)
    ├── App.jsx                Section order
    ├── assets/
    │   └── images/
    │       └── Kylle.jpg      Profile photo, imported once by src/data/profile.js
    ├── data/
    │   ├── profile.js         Name, photo + alt text, bio, links, stats
    │   ├── projects.js        Project cards and filter categories
    │   ├── skills.js          Skill groups
    │   ├── experience.js      Experience and education timeline
    │   └── pets.js            Names and caption note for the two dogs
    ├── hooks/
    │   └── useAppearance.js   Theme / accent / backdrop state + persistence
    ├── styles/
    │   ├── tokens.css         Colours, spacing, radii, shadows, themes, accents
    │   └── base.css           Resets, shared buttons, layout helpers
    └── components/            Nav, Hero, About, Projects, Activity, Skills,
                               Experience, Contact, Footer, ThemePanel, Section,
                               SocialLinks, BrandIcons, Pets, Background,
                               PatternWaves, MicroSlats, patternTheme.js
                               (+ one *.module.css each)
```

## Prerequisites

- **Node.js 20.19 or newer** (22 LTS recommended — that is what Render uses here).
  Check with `node -v`. Download from <https://nodejs.org>.
- **npm 10 or newer** (ships with Node). Check with `npm -v`.
- **Git** — needed to push the project to GitHub.
- **A GitHub account** and **a Render account** (free tier is enough; sign up with GitHub at
  <https://render.com>).

## Installation

```bash
# 1. Get the code
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2. Install the exact dependency versions from package-lock.json
npm ci
```

If you are working from a folder that has no git history yet:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`npm install` also works locally, but `npm ci` is what Render runs: it is faster and fails if
`package-lock.json` and `package.json` disagree.

## Run the project locally

```bash
npm run dev      # http://localhost:2005
```

The dev server hot-reloads on save and is pinned to port **2005** in `vite.config.js`
(`server.port` with `strictPort: true`). If 2005 is already taken, Vite exits with a
"Port 2005 is already in use" error rather than switching to another port — free the port
or change `server.port` there. This setting only affects local development; the production
build and Render deployment do not use it.

Other scripts:

```bash
npm run build    # production build into dist/
npm run preview  # serve the built dist/ at http://localhost:4173
```

`npm run preview` is the closest local equivalent of the deployed site — use it to check
production behaviour before pushing.

## Build for production

```bash
npm run build
```

Output in `dist/`:

```
dist/
├── index.html
├── favicon.svg
├── og-image.svg
├── og-image.png            # social share preview (1200×630)
├── resume.pdf              # the downloadable résumé
└── assets/
    ├── index-<hash>.js
    ├── index-<hash>.css
    ├── Kylle-<hash>.jpg
    └── <Project>-<hash>.png  # project card screenshots
```

`vite.config.js` sets `base: '/'`, so asset URLs are absolute (`/assets/...`). That is what
Render (and Vercel/Netlify) serve at a domain root. The `Kylle.jpg` photo is imported from
`src/`, so Vite copies it byte-for-byte, hashes the filename for cache busting, and rewrites
the URL in the bundle automatically — no hard-coded path to maintain.

## Deploy to Render — step by step

This repository already contains everything Render needs: `render.yaml`, a committed
`package-lock.json`, and a pinned Node version. You do **not** need to configure anything in
the dashboard if you use the Blueprint route.

### Step 1 — Push the project to GitHub

If your code is already on GitHub, confirm the branch is `main` and skip to Step 2.

```bash
git init
git add .
git commit -m "Portfolio ready for deployment"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Make sure `package-lock.json` is committed (it is not ignored) — `npm ci` requires it, and
`node_modules/` and `dist/` must stay untracked (they already are in `.gitignore`).

### Step 2 — Create the Render service from the Blueprint

1. Sign in at <https://dashboard.render.com>.
2. Click **New +** → **Blueprint**.
3. Connect your GitHub account if prompted, then pick this repository.
4. Render detects `render.yaml` and shows one service: **kylle-portfolio** (Static Site).
5. Click **Apply** / **Deploy**.

Render now runs the build and publishes the site. The first deploy takes a couple of minutes;
watch the log stream in the dashboard.

### Step 3 — Open the live URL

When the log ends with a success line, the site is live at:

```
https://kylle-portfolio.onrender.com
```

That URL is also the canonical URL in `index.html`. If you rename the service or add a custom
domain, update the canonical link, `og:url` and the JSON-LD `url` there in the same commit.

### Step 4 — (Optional) Add a custom domain

1. Open the service → **Settings** → **Custom Domains** → **Add Custom Domain**.
2. Enter your domain (for example `kylle.dev`).
3. At your DNS provider, add the `CNAME`/`ALIAS` record Render shows you.
4. Wait for the certificate to be issued (usually minutes). Render provisions TLS
   automatically.
5. Update the canonical/OG/JSON-LD URLs in `index.html` to the new domain and push.

### Step 5 — Confirm auto-deploy is on

`render.yaml` sets `autoDeployTrigger: commit`, so every push to the linked branch rebuilds
and republishes automatically. No webhook setup is needed.

## Render configuration

These are the values Render applies from `render.yaml`:

| Setting | Value |
| --- | --- |
| Service type | **Static Site** (`type: web`, `runtime: static`) |
| Service name | `kylle-portfolio` |
| Repository | Your GitHub repo containing `render.yaml` |
| Branch | `main` (the repo's default branch) |
| Root directory | *(blank — repository root)* |
| **Build Command** | **`npm ci && npm run build`** |
| **Publish Directory** | **`dist`** (`staticPublishPath: ./dist`) |
| Node version | `22.20.0` (`.node-version`, plus `NODE_VERSION` env var) |
| Environment variables | None required (see below) |
| Auto deploy | On every commit to `main` |
| Region | Not applicable — static sites are served from Render's global CDN |
| Plan | Free |

### SPA fallback (no 404 on refresh)

The site has no client-side router, but the rewrite is still configured so that any path —
`/projects`, a shared deep link, or a refresh on a sub-path — serves `index.html` instead of
Render's 404 page:

```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

Render only applies a rewrite when **no file exists** at the requested path, so hashed files
under `/assets/` are always served as themselves. This is verified in the deploy checklist
below.

### Caching and security headers

```yaml
headers:
  - path: /assets/*          # hashed filenames -> safe to cache forever
    name: Cache-Control
    value: public, max-age=31536000, immutable
  - path: /*                # index.html stays revalidating, so deploys are picked up
    name: X-Content-Type-Options
    value: nosniff
  - path: /*
    name: Referrer-Policy
    value: strict-origin-when-cross-origin
  - path: /*
    name: X-Frame-Options
    value: SAMEORIGIN
```

## Environment variables

**None are required.** The site reads no API keys, secrets or `.env` values at build time.
The only `import.meta.env` usage is the built-in `BASE_URL` (in `src/data/profile.js`, for
the résumé PDF link), which is always defined by Vite and needs no configuration.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NODE_VERSION` | No (already set to `22.20.0` in `render.yaml`) | Pins the build Node version. `.node-version` does the same if the variable is removed. |
| `VITE_BASE` | No | Only for hosting under a sub-path (e.g. `VITE_BASE=/my-repo/ npm run build` for GitHub Pages). **Leave unset on Render** — the default `/` is correct. |

If you later add something like a contact-form endpoint, put the key in the Render dashboard
under **Environment** and prefix it with `VITE_` so Vite exposes it to the bundle. Remember
that anything `VITE_*` is public in the shipped JavaScript.

## Deploying without `render.yaml` (manual setup)

Useful if you prefer configuring in the dashboard, or if you delete the Blueprint:

1. **New +** → **Static Site** → connect the repository.
2. Name: `kylle-portfolio`; branch: `main`; root directory: leave blank.
3. **Build Command:** `npm ci && npm run build`
4. **Publish Directory:** `dist`
5. **Advanced** → add environment variable `NODE_VERSION` = `22.20.0` (optional; the
   `.node-version` file covers it).
6. **Redirects/Rewrites** → add: Source `/*`, Destination `/index.html`, Action **Rewrite**.
7. **Create Static Site**.

## Updating and redeploying

```bash
# edit files...
npm run build       # optional sanity check before pushing
git add .
git commit -m "Update projects section"
git push            # Render redeploys automatically
```

- **Automatic:** every push to `main` triggers a build and deploy (from `render.yaml`).
- **Manual:** dashboard → service → **Manual Deploy** → **Deploy latest commit** (or
  **Clear build cache & deploy** if a stale dependency is suspected).
- **Rollback:** service → **Deploys** → pick an earlier successful deploy → **Redeploy**.

Hashed asset names change on each build, so visitors get the new files immediately; only
`index.html` is revalidated.

## Verify the live site

Run through this after the first deploy (and after any big change):

- [ ] Home loads with the profile photo visible in the sidebar, hero and About section.
- [ ] Photo request returns `200` with `content-type: image/jpeg` (DevTools → Network →
      `Kylle-*.jpg`).
- [ ] Sidebar icons navigate to Home, About, Projects, Activity, Skills, Experience, Contact;
      the active icon is highlighted while scrolling; tooltips appear on hover/focus.
- [ ] Sidebar collapse toggle hides the rail and the floating button reopens it.
- [ ] Under ~900 px the nav becomes a drawer; it closes on link click and on Escape.
- [ ] Theme (light/dark), accent colour and background (`Waves`, `Slats`, `Dots`, `None`)
      all apply globally and **survive a refresh** (`localStorage`).
- [ ] The animated background renders and reacts to the cursor (needs WebGL 2).
- [ ] Project filters work; the copy-email button confirms with a status message.
- [ ] `https://kylle-portfolio.onrender.com/resume.pdf` downloads the résumé PDF (not the
      index.html fallback), and the résumé page at `/#/resume` renders with its preview.
- [ ] Refreshing on a sub-path such as `/projects` returns the app, not a 404.
- [ ] `https://` is active with a valid certificate.

## Common deployment errors and fixes

| Symptom | Cause | Fix |
| --- | --- | --- |
| **404 on refresh / deep link** | SPA rewrite missing (manual setup) | Add rewrite `/*` → `/index.html` under **Redirects/Rewrites**, or re-apply `render.yaml`. Redeploy. |
| **Blank page, HTML served for `.js`/`.css`** | A catch-all redirect instead of a *rewrite* sent assets to `index.html` | Delete any `/*` **redirect** rule; keep exactly one `/*` → `/index.html` **rewrite**. |
| **"Publish directory dist does not exist"** | Build failed, or the publish path is wrong | Read the build log above that line; publish directory must be `dist` (no trailing slash needed). |
| **`npm ci` fails: "can only install with an existing package-lock.json"** | Lockfile not committed | Run `npm install` locally, commit `package-lock.json`, push. |
| **`npm ci` fails: "Missing: … from lock file" / `Invalid: lock file's … does not satisfy …`** | `package.json` edited without updating the lockfile | Run `npm install` locally, commit the updated `package-lock.json`. |
| **`npm ci` fails with `EBADENGINE` / unsupported Node** | Build Node older than Vite 8's requirement | Keep `NODE_VERSION=22.20.0` and `.node-version`; `engines.node` is `>=20.19.0`. |
| **Build fails on an import path that works on Windows** | Linux is case-sensitive | Match filenames exactly, e.g. `./Nav.jsx`, not `./nav.jsx`. |
| **Assets 404 after deploy** | `VITE_BASE` set to a sub-path on a root-hosted site, or `dist/` not published | Remove `VITE_BASE` from Render env vars; confirm publish directory `dist`. |
| **Old content still shows** | Browser/CDN cache or the deploy didn't trigger | Hard refresh (Ctrl/Cmd+Shift+R); check **Deploys** for the latest commit; use **Clear build cache & deploy**. |
| **Background animation missing** | Browser lacks WebGL 2, or `prefers-reduced-motion` is on | Expected fallback: the page stays fully usable on the plain background. Not a deploy error. |
| **Blueprint shows a YAML validation error** | Indentation or an unsupported field | Re-check against <https://render.com/docs/blueprint-spec>; static sites need `type: web` + `runtime: static`. |
| **Render can't see the repository** | GitHub app not authorized for that repo | GitHub → Settings → Applications → Render → grant access to the repo, then retry. |
| **Fonts look wrong in production** | Google Fonts blocked by a network filter | The CSS declares system fallbacks; the layout still holds. |

## Editing the content

All copy lives in `src/data/`. Components only render it.

| File | What it controls |
| --- | --- |
| `src/data/profile.js` | Name, profile photo + alt text, role, headline, bio, email, location, GitHub, Facebook, Instagram and résumé URLs, social links, activity card stats |
| `src/data/projects.js` | Project cards, filter categories, the "earlier experiments" links |
| `src/data/skills.js` | Skill groups and items |
| `src/data/caseStudies.js` | Case study content, including the repository evidence behind each study. Rendered at `#/case-studies/<id>` by `CaseStudy.jsx` |
| `src/data/experience.js` | Experience and education timeline entries |
| `src/data/resume.js` | Résumé content — the single source for both the résumé page at `#/resume` and `public/resume.pdf` |
| `src/data/pets.js` | Names of the two illustrated dogs and their one-line caption note |
| `src/data/cats.js` | Names of the four illustrated cats and their one-line caption note |

`profile.bio` is an array of paragraphs; wrap a phrase in `**double asterisks**` to render it
**bold** in the About section. The first entry is reused as the section's intro paragraph.

The two illustrated dogs under the quick-facts card in the About section are inline SVG in
`src/components/Pets.jsx`. The drawings are `aria-hidden`; the visible caption (names plus a
one-line note) is plain text from `src/data/pets.js`, so the pair adds no image requests and
needs no assets to maintain. Their idle motion (tail wag, blink, breathing and the two head
turns that share an 11 s cycle) and the hover reaction are plain CSS in `Pets.module.css`:
transform-only, no JavaScript, and disabled entirely under
`prefers-reduced-motion: reduce`. Hovering the About section lifts the pair and perks their
ears; hovering one dog lifts that dog a little further.

The **Say hi** button under the caption greets both dogs at once. Hovering it (or tapping it,
where there is no hover) starts a coordinated greeting in each — faster tail wag, bouncing
head and ears, body bounce, paw shifts and an open barking mouth — with different timings and
phase offsets so they read as two animals rather than one mirrored animation. They settle
back to idle when the pointer leaves, or a few seconds after a tap.

Page-level metadata (title, description, Open Graph, JSON-LD) lives in `index.html`.

Design tokens — colours, fonts, spacing, radii, shadows, both themes and all three accents —
are in `src/styles/tokens.css`. Global resets, shared buttons and layout helpers are in
`src/styles/base.css`. Component-specific styles are `*.module.css` next to each component.

**Profile photo:** `src/assets/images/Kylle.jpg` is imported once in `src/data/profile.js`
and reused by the sidebar, hero and About section. To change it, replace that file (keep the
name) or update the import — Vite re-hashes the filename on the next build, so no other path
needs editing.

**Résumé:** `src/data/resume.js` feeds three surfaces at once — the résumé page at `#/resume`
(`Resume.jsx`, reached from the Contact tile), the hero's Download button, and the PDF at
`public/resume.pdf`. After editing the data, run `npm run resume` to regenerate the PDF with
headless Chrome/Edge (`scripts/generate-resume.mjs`, rendered from the same data module so
the page and the PDF cannot drift apart). The PDF is real selectable text with working links.

## Navigation and appearance panel

The site uses a fixed, icon-only sidebar on the left instead of a top bar. Each icon is a
real anchor link to its section, marked with `aria-current` as you scroll, and identified by
a hover/focus tooltip plus an accessible name. The sidebar collapses with its bottom toggle;
`base.css` offsets the page by `--rail-width` while it is open, and the collapsed state is
reopened with the floating menu button. Under 900 px it becomes a slide-in drawer with a
backdrop, closing on link selection or Escape.

The palette button in the sidebar opens a panel with three controls:

- **Theme** — light or dark.
- **Accent** — indigo, teal or clay. It also re-tints the animated backdrop.
- **Backdrop** — `Waves` (PatternWaves silk dots), `Slats` (MicroSlats sea), `Dots` (static
  CSS grid) or `None`. Every option applies to the whole page, behind every section.

Choices are written to `localStorage` under `theme`, `accent` and `backdrop` inside
`try/catch`, so the site still works when storage is blocked. The previous `background` key
is migrated automatically. The default theme follows the operating system, and an inline
script in `index.html` applies the saved values before first paint so there is no flash.

## Accessibility and performance notes

- Semantic landmarks (`aside`, `nav`, `main`, `footer`), a "Skip to main content" link and
  one `h1`. The icon-only sidebar links carry `aria-label` and `aria-current`, so the icons
  are never the only way to identify a section.
- All controls are real buttons or links with accessible names; filter chips and the
  appearance panel expose state through `aria-pressed`, `aria-expanded` and `aria-controls`.
- Focus styles are never removed, contrast targets 4.5:1 for text, and the copy-email result
  is announced through `role="status"`.
- Motion is opt-in: the fade-up reveal and hover lifts are disabled under
  `prefers-reduced-motion`, and content stays visible when animation does not run.
- No layout depends on JavaScript-driven measurement, so the page works at 360 px, 768 px
  and 1280 px without horizontal scrolling.
- Fonts load with `display=swap` and only three weights per family; images are lazy-loaded.
- Production build (measured on Node 24 / Vite 8): **~108 kB JS gzip**, **~6.6 kB CSS gzip**,
  one hashed JPEG. Hashed assets are served immutable; the HTML stays revalidating.
- One background layer (`Background`) sits behind **every** section — Home, About, Projects,
  Activity, Skills, Experience, Contact and the footer. It mounts exactly one canvas for the
  selected option (PatternWaves or MicroSlats), or none for Dots/None, so the page never
  holds more than one WebGL context. It is decorative (`aria-hidden`,
  `pointer-events: none`), follows the theme and accent, pauses when the tab is hidden, and
  is skipped entirely when WebGL 2 is unavailable. Section content is raised above it by the
  `#root > main/footer` stacking rules in `base.css`; the fixed sidebar keeps its own
  `z-index`, and the page reserves `--rail-width` for it on desktop.

## Placeholders still to replace

These are deliberately left empty instead of being filled with invented content. Every
placeholder is also marked in the UI or in a `title` attribute so you can find it. None of
them block deployment.

- [x] **Résumé PDF** — generated to `public/resume.pdf` from `src/data/resume.js` and wired
      through `resumeUrl` in `src/data/profile.js`. Regenerate with `npm run resume`.
- [x] **Project screenshots** — `CVO.png`, `PickleSphere.png` and `BayawanBaiHotel.png` in
      `src/assets/images/` are wired into the project cards and case study galleries.
- [ ] **Live demo links** — none of these repositories is deployed publicly, so no demo
      links are shown. Set `demo` on a project once something is live.
- [x] **Social share image** — `public/og-image.png` (1200×630, captured from the hero) is
      wired into the `og:image` and `twitter:image` tags in `index.html`. Regenerate by
      capturing the live site at 1200×630 after a redesign.
- [ ] **Canonical URL** — currently `https://kylle-portfolio.onrender.com/`. Update it in
      `index.html` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`) if you
      rename the Render service or add a custom domain.
- [ ] **Activity numbers** — `repoCount` and `joinedYear` in `src/data/profile.js` were read
      from the GitHub API on 2026-11-05 (`repoCount` 7, `joinedYear` 2024). Update them if
      they drift.

## Where this content came from

The project cards were written by reading the actual repositories on
[github.com/kairu15](https://github.com/kairu15) — READMEs, root folder structure, language
breakdown, commit history, `requirements.txt` and `package.json`. No metrics, testimonials,
employers or demo URLs were invented. Assumptions and corrections:

- **`CVO` is Laravel + MySQL, not Django REST Framework + PostgreSQL.** Its README tech-stack
  table and `docker-compose.yml` (PHP 8.4, MySQL 8.4, nginx/php-fpm) show a Laravel API;
  `frontend/package.json` lists React 19, Vite, Tailwind CSS 4, React Router, React Query,
  MapLibre GL and Recharts. The brief said Django REST Framework, PostgreSQL and Leaflet, so
  the card follows the repository instead.
- **`CVO` is still in development.** The card says "Capstone project · In development"
  because the README's Status section says the registry, geo-tagging and dispersal modules
  are in progress.
- **`pickleball` and `django-project-picklesphere` are the same Django application.** Two
  repositories exist; the card links `django-project-picklesphere` because it is the fuller
  copy (includes the `organizations` and `equipment` apps). `pickleball` holds an earlier
  snapshot plus production-hardening commits.
- **`django-project-picklesphere` and `pickleball` have no README.** The card was written
  from the app folders (`courts`, `reservations`, `payments`, `tournaments`, `scoring`,
  `equipment`, `notifications`), templates, and `requirements.txt` (Django 4.2, Channels,
  Redis, Stripe, MySQL, WhiteNoise).
- **`Project-Hotel-Management-System` is "Bayawan Bai Hotel".** Name and features come from
  its README; the stack is PHP, MySQL and inline CSS/JS, so no framework is claimed.
- **The two older portfolios are not project cards.** `django-portfolio` and
  `react-portfolio` are linked as "earlier experiments" instead, as instructed.
- **Skills omissions.** `XAMPP` and `DBeaver` from the brief do not appear in any repository,
  so they are not listed; add them in `src/data/skills.js` if you use them. Django REST
  Framework and PostgreSQL are likewise absent from the code. `Bootstrap` is included because
  `django-portfolio` uses Bootstrap 5.
- **Experience wording** is exactly as supplied: intern role 2026 at NORSU-BSC (on-site), and
  the B.S. in Information Technology, "2023 to present", still in progress.
