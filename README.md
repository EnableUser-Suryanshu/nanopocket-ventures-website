# NanoPocket Ventures — Website

Next.js 16 + Payload CMS 3 marketing site for **NanoPocket Ventures Fund** (SEBI Registered Cat-I AIF — Angel Fund).
Design language follows the **Prokit** reference (masked text reveals, sticky stacked cards, cursor-following
previews, scroll-linked marquees) applied to the NanoPocket brand guidelines, with a set of scroll-driven scenes
and studio-rendered 3D brand imagery (see *Motion design* below).

Every word on the site — headings, buttons, form questions, error messages, footer, even screen-reader labels — is editable in the CMS.

---

## Quick start (local)

```bash
npm install
npm run seed      # creates the admin user + all approved content (safe to re-run)
npm run dev       # http://localhost:3000  ·  CMS: http://localhost:3000/admin
```

The local admin login is in `.env` (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`). Change it before going live.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` / `npm start` | Production build / server |
| `npm run seed` | Adds any missing default content, including settings added in later versions (never overwrites edits) |
| `npm run seed:reset` | Restores pages & settings to the approved copy (overwrites edits) |
| `npm run generate:types` | Regenerates `src/payload-types.ts` after schema changes |
| `npm run lint` / `npm run typecheck` | Code quality checks |

---

## Editing the website (CMS guide)

Sign in at **/admin**.

- **Pages → Home** — every section of the one-page site, in order. Drag to reorder, tick *“Hide this section”*
  to take it offline (e.g. Portfolio / Insights / News until they are ready). Click the **eye icon (Live Preview)**
  to see changes as you type; nothing goes public until you press **Publish changes**.
- **Pages → Privacy / Terms** — legal pages (rich text).
- **Content → Team** — team members (photo, role, bio, LinkedIn). With a photo, the team card shows a full-bleed
  portrait (set the focal point in *Media* to frame the face); without one, initials are shown.
- **Content → Insights / Us In News / Portfolio companies** — when these are empty, the site shows a designed
  “coming soon” state. Portfolio companies only appear once *“Show on website”* is ticked.
- **Settings → Header & Menu** — header buttons (Investor Login, Invest With Us, Pitch To Us) and menu links.
- **Settings → Footer** — *Top*: line under the logo, the large catchphrase, whether to repeat the header buttons,
  and the live Mumbai clock; *Columns*: fund information, navigation, address; *Bottom bar*: copyright, legal links,
  disclaimer and the giant wordmark.
- **Settings → Pitch Form** — every question, option, “required” toggle and message of the founder application.
- **Settings → Enquiry Forms** — the Investor / Partner / Media forms. Add, remove or reorder fields freely.
- **Settings → Site Settings** — SEO title & description, share image, key links, interface labels.
- **Media** — images. *Alt text* is mandatory (accessibility); write “decorative” for purely ornamental images.

Wherever an image field is left empty, a studio-rendered 3D brand image is used instead — pick it from the
**Artwork** dropdown next to the image field (glass seed, gold coins, orbit rings, monolith, 3D logo…). Uploading
an image always takes priority.

### Where does form data go?

| Form | Stored in | Notes |
| --- | --- | --- |
| Pitch To Us | **Submissions → Pitches** | Status (New → Reviewing → Shortlisted…), internal notes. |
| Pitch decks | **Submissions → Pitch decks** | Stored in `/private`, **never publicly accessible** — only signed-in users can open them. Max 25 MB; PDF/PPT/PPTX/Keynote; file contents are verified. |
| Reach Us forms | **Submissions → Enquiries** | Every answer is saved with the question it belongs to. |

Optional e-mail alerts: set `NOTIFY_EMAIL` and the `SMTP_*` variables in `.env` and the team is e-mailed on every
submission (with a link straight to the record in the CMS).

Spam protection is silent (honeypot field, minimum fill time, per-IP rate limit) — **no CAPTCHA**, so genuine
visitors never see a “submission could not be verified” error.

---

## Accessibility (WCAG 2.2 AA · SEBI)

- Automated audit (axe-core, WCAG 2.0/2.1/2.2 A + AA + best practice): **0 violations**.
- Text colours meet AA contrast. Red is used only as a decorative accent (curved underline, small dots, button
  hover) — never for text or meaning. Gold text appears only on the tagline word “Discover”, in a darkened
  gradient that keeps ≥ 3:1 for large text; otherwise gold appears only as the logo’s seed and in the 3D imagery.
- Full keyboard support: skip link, visible focus, focus-trapped menu (Esc closes), ARIA tabs with arrow keys,
  accessible accordions, focus moved to each new step of the pitch form.
- Motion: respects the device “reduce motion” setting; a **Pause motion** control (hero, menu, footer) stops every
  animation, marquee, scroll scene and smooth scrolling (WCAG 2.2.2). Reveal animations use opacity only so content
  is never skipped by keyboard users, and every scroll scene has a static layout (used on phones, with reduced
  motion, or without JavaScript) that shows the same content.
- Type is sized with `clamp(rem…)`, so text scales with browser zoom up to 200%; layouts reflow down to 320 px.
- Forms: visible labels, required markers, inline errors linked to fields, announced status/success messages.

---

## Motion design

Scroll scenes are pinned with CSS `position: sticky` and scrubbed by GSAP ScrollTrigger (smooth scrolling by Lenis).
They run on desktop with motion enabled; everywhere else the same content is laid out statically.

| Section | Scene |
| --- | --- |
| Preloader (first visit per session) | The mark is drawn in outline, liquid gold fills the seed while the counter runs to 100, then the mark flies into the header logo |
| Hero headline | As on Prokit (“Think / Refine / Create”): oversized light lines whose letters rise one by one out of their masks while fading in, line after line; then the photo in front of “Discover” opens (15vw wide) and pushes it along, the small caption fades in beside the last line, and the red underline draws |
| Photo in the headline | A reel of the 3D renders that wipes upwards to the next one every few seconds (or one uploaded image — *Hero → Inline image*) |
| Hero → Statement | A steep wall of large 3D tiles straightens and pulls back as the headline slides away; the statement card sweeps in, its words rise, then the card shrinks to frame the wall |
| Who We Are | The screen is white with a window in the shape of the NanoPocket mark; the window grows until it swallows the screen, then the story lights up word by word |
| What We Are Looking For | Sticky cards stack up — each new card slides over while the one beneath shrinks slightly under a soft shade (GPU-only: transform + opacity, so nothing flickers while scrolling) |
| Where Are We Investing | Scroll-linked outline marquee; hovering a sector shows a floating preview that follows the cursor |
| Portfolio Highlights | Twelve gold seeds (one per planned investment) light up around the orbit as you scroll |
| Team Responsible | A 3D cube turns one face per scroll step (team members, then principles) in front of a giant marquee; keyboard focus turns it to the focused face |
| Pitch To Us | A soft spotlight follows the cursor and the title’s letters lift towards the pointer |
| Footer | The page’s rounded edge lifts off the dark footer; the catchphrase rises line by line, the columns fade up, and the giant brand-colour wordmark climbs into place while a light band sweeps across it |

Plus: scrambled eyebrow labels, magnetic buttons, a custom cursor and a section progress rail on wide screens.

The 3D images live in `public/renders/` (WebP, rendered from the brand vectors). To use different imagery, upload
images in the CMS — they replace the renders wherever they are set.

---

## Deployment

The site is a standard Next.js app with Payload running inside it.

**Option A — VPS / container (simplest, keeps SQLite):** `npm run build && npm start` behind Nginx/Caddy, or use the
included `Dockerfile` / `docker-compose.yml` (the build step needs the same environment variables as runtime). Keep `data/` (database), `media/` (images) and `private/` (pitch decks) on persistent storage
and back them up.

**Option B — Vercel (serverless):** Vercel's file system is not persistent, so the site uses Postgres for
content and Vercel Blob for uploads there — both switch on automatically:

| Variable | What it does |
| --- | --- |
| `DATABASE_URL` | A `postgres://…` URL (e.g. Neon from the Vercel Storage tab) selects the Postgres adapter |
| `BLOB_READ_WRITE_TOKEN` | Set when a Blob store is connected — images and pitch decks are stored in Vercel Blob |
| `PAYLOAD_SECRET`, `PREVIEW_SECRET` | Long random strings (different from local ones) |
| `NEXT_PUBLIC_SERVER_URL` | The live URL, e.g. `https://nanopocket-ventures-website.vercel.app` |

- The build command is `npm run ci` (`vercel.json`): it applies database migrations from `src/migrations`
  (`payload migrate`) and then builds. After changing collections or fields, create a new migration with
  `DATABASE_URL=postgres://… npx payload migrate:create <name>` and commit it.
- First-time content: pull the production variables (`vercel env pull .env.production.local`), then run
  `npm run seed` with them loaded to create the admin user and the approved copy.
- Pitch decks: Vercel functions only accept 4.5 MB requests, so on Vercel the form uploads the deck from the
  browser straight to Blob (`/forms/pitch/upload` issues a one-time token), and the server then moves it into the
  private *Pitch decks* collection. Decks get unguessable names and are only served to signed-in CMS users.

Required environment variables: see `.env.example` (`PAYLOAD_SECRET`, `PREVIEW_SECRET`, `NEXT_PUBLIC_SERVER_URL`,
`DATABASE_URL`). Content edits go live instantly — publishing in the CMS revalidates the cached pages.

---

## Project structure

```
src/
  app/(frontend)/      Public site: layout, pages, form handlers (/forms/*), live-preview routes, SEO files
  app/(payload)/       Payload admin + REST/GraphQL API (generated — do not edit)
  blocks/              CMS section blocks (Hero, Statement, Who We Are, Criteria, Thesis, …)
  collections/         Pages, Team, Insights, Press, Portfolio, Media, Pitches, Enquiries, Pitch decks, Users
  globals/             Site Settings, Header & Menu, Footer, Pitch Form, Enquiry Forms
  components/
    sections/          One React component per section (animations live here)
    forms/             Multi-step pitch form, tabbed enquiry forms
    layout/            Header, left-hand menu, footer, preloader, cursor, motion toggle
    motion/            SplitReveal, Reveal, Marquee, Counter
    art/               3D render mapping (public/renders) + vector fallback illustrations
    brand/             Logo (outlined vector wordmark)
  lib/forms/           Validation shared by browser and server
  seed/                Approved copy from the client brief
```

### Schema changes (developers)

In development the SQLite schema is pushed automatically. **Removing or renaming** a field makes Drizzle stop and
ask an interactive question, which blocks the dev server — prefer adding fields, or back up `data/` and re-seed.
Production should use migrations (`npx payload migrate:create`, then `npx payload migrate`).

---

## Notes for the client review

- **Copy source:** *Feedback on Website V2*, *8b/8c What We Are Looking For*, *9b/9c Where Are We Investing*,
  *14a Pitch to Us*. Struck-through text in those documents was **not** used.
- **Logo:** the supplied SVGs relied on installed fonts, which is why “VENTURES” looked thin on the old site.
  The wordmark is now outlined vector artwork; VENTURES is set in Montserrat Medium and spaced to the full
  NanoPocket width (per the guideline’s wordmark note) so it is crisp and more prominent everywhere.
- **Layout per feedback:** logo centred and menu on the left (blackbird.vc), compact left-hand menu that moves
  the page aside and scrolls to the chosen section; Investor Login, Invest With Us and Pitch To Us as black
  buttons turning red on hover — in the header, hero and menu. Backgrounds are white, neutral light grey and
  black (no gold/beige).
- **Still to supply / confirm:** team bios and the second team member · thesis notes for the remaining 7 sectors ·
  Portfolio pillars text and key numbers · imagery (upload in the CMS; the 3D renders can stay or be replaced) ·
  Privacy & Terms wording · the footer disclaimer and any SCORES / grievance details (legal review) ·
  whether the new pitch questions should be required (toggle in *Settings → Pitch Form*).
- “Investor Enquiries” is labelled **Investor Queries** to distinguish it from *Invest With Us* (editable).
