# Content & Design Review (2026-09-29)

A second pass focused on what visitors see (content, sharing, page weight, copy, visual
design) rather than code structure. Design notes come from reading the templates and
styles, not a browser session, so check each one visually before acting on it.

Items marked **✅ Done** were addressed on 2026-09-29; see [Changes made](#changes-made-2026-09-29)
at the end.

## Content (highest impact)

### C.1 Only one project
**`src/components/Projects.vue`**

Projects shows FretWizard plus a GitHub link card. The GitHub banner and the ClickNext
role both say *Full Stack Developer*, but nothing on the site demonstrates backend work
(C#, databases, APIs). One more project with a backend, even a small one, would back up
the title. The portfolio itself is a reasonable second card.

### C.2 A placeholder is visible to visitors
**`src/components/AboutMe.vue:149`**

The third slide of the About Me terminal card runs `$ stats` and prints
`about.toBeAdded` ("to be added later"). Fill it (years coding, projects shipped,
languages spoken…) or remove the slide.

### C.3 "3+ years" is outdated
**`src/components/AboutMe.vue:177`**

ClickNext is listed as 2022–present (about 4 years), before counting Omni Star
(2021–2022) and the internship. The number is hard-coded in the template.

### C.4 The job title is inconsistent
Banner and ClickNext entry say *Full Stack Developer*. The hero (`MainPage.vue:143`),
About Me (`AboutMe.vue:95`) and the business card say *Software Developer*. Either is
fine, but pick one on purpose, and check the résumé PDF matches.

## Sharing & performance

### C.5 No link preview (extends REFACTOR.md 4.5)
`index.html` has no `<meta name="description">` and no Open Graph tags, so links on
LinkedIn / Facebook / LINE show as bare URLs. The new GitHub banner is a ready-made
`og:image`.

### C.6 Heavy and unused assets in `public/`

| File | Size | Note |
|---|---|---|
| `world.svg` | 1.2 MB | Loads on the first screen (`MainPage.vue`, `KeepCalm.vue`). Minify with SVGO (see below). |
| `demo-picture.jpg` | 246 KB | Convert to WebP. |
| `asean.svg` | 107 KB | Not referenced anywhere — delete. |

**Minifying `world.svg`:** it has no `viewBox`, and `KeepCalm.vue` does pixel math on its
`width`/`height` and pins the Bangkok marker to `<circle cx="757" cy="422.6">`. Keep both
intact with a `svgo.config.mjs`:

```js
export default {
  multipass: true,
  floatPrecision: 2,
  plugins: [
    { name: 'preset-default', params: { overrides: { convertShapeToPath: false } } },
  ],
};
```

Then `npx svgo public/world.svg -o public/world.svg`, check the circle survived
(`grep -o '<circle[^>]*>' public/world.svg`) and that the Bangkok marker still lines up.

## Copy polish (`src/i18n/locales/en.ts`)

| Current | Suggested | Status |
|---|---|---|
| "clean and maintainable **codes**" | "clean and maintainable **code**" | ✅ Done |
| "Technologies I've used and familiar with." | "Technologies I've used and **am** familiar with." | ✅ Done |
| "I'm specializing in" | "Specializing in" | ✅ Done |
| "{years} years experience" | "{years} years **of** experience" | ✅ Done |

## Repo note

`.env` is tracked in git. It only holds the Web3Forms access key, which is public by
design (it ships in the client bundle), so nothing has leaked. Add `.env` to
`.gitignore` before anything secret ever goes in it.

---

## Design

### D.1 The monospace font falls back to Courier New on Mac and iPhone ✅ Done
**`src/scss/main.scss` (`--font-mono`), `AboutMe.vue:356`**

> **Resolved:** Courier Prime (a heavier, more legible Courier, same character width) is
> loaded from Google Fonts and replaces Courier New. `--font-mono` is now
> `Consolas, "Courier Prime", "Noto Sans Thai", "Noto Sans Myanmar", monospace`, so Windows
> keeps Consolas and Mac/iOS/Android get Courier Prime. The About Me location card is always
> Courier Prime. JetBrains Mono was tried and dropped; the sans-serif body font was
> declined to keep the all-monospace look.

The whole site is set in `Consolas, "Courier New", …`. Consolas ships only with
Windows/Office, so every Mac, iPhone and most Android visitors, which includes a lot of
recruiters, see Courier New: thin, dated, and hard to read at small sizes. Load a web
monospace such as **JetBrains Mono** or **IBM Plex Mono** from Google Fonts (already
used for Noto) and put it first in `--font-mono`. Consider a sans-serif (e.g. Inter) for
longer paragraphs like the passion card and the Keep Calm story, keeping mono for
headings, terminal cards and labels.

### D.2 The Projects section breaks the visual system
**`src/components/Projects.vue`**

- The FretWizard card is the only light-background element on a dark site, and its
  yellow badges add a colour used nowhere else.
- On hover the FretWizard card grows to full width and the GitHub card collapses to
  5% with its content removed — a large layout shift triggered just by moving the mouse.
- With one project the section looks empty.

Suggested: a grid of dark cards in the same glass style as the Contact form and logo
(`rgba(255,255,255,0.08)` + border + blur), each with a screenshot, tech tags in the
site's accent colour, and two explicit buttons (**Live** / **Code**). Hover should lift
or highlight, not resize neighbours.

### D.3 The hero has no call to action
**`src/components/MainPage.vue:128-150`**

"Hello, I'm Jhom / I'm a Software Developer" with a small arrow in the bottom-right
corner. Add a one-line value statement and two buttons, e.g. **View projects** and
**Contact me**. Also drop `.introduction-text:hover { transform: scale(1.1) }` —
headings jumping when the mouse passes over them reads as a glitch.

### D.4 Key information is hover-only
- Job descriptions in the timeline (`TechStack.vue:240-259`) appear only while hovering
  that entry. Recruiters skim, and on touch devices hover barely exists. Show them by
  default (or at least the current role).
- Tech names in the grid are only shown on hover, replacing the logo. Consider a small
  permanent label or a tooltip that doesn't swap the icon out.

### D.5 No navigation on phones
**`src/components/NavBar.vue`**

The nav bar is `display: none` below 768 px and nothing replaces it, so phone visitors
can only scroll. Add a compact menu button, or at least a floating back-to-top link.

### D.6 Low-contrast grey text
`$light-gray` (#7e7e7e) on `$light-black` (#191a1b) is about **4.3 : 1**, and Bootstrap's
`.text-secondary` on `$black` (Contact intro) is about **4.3 : 1** — both under the
WCAG AA 4.5 : 1 minimum for small text, and it's used for most secondary copy. Lightening
`$light-gray` to around `#9a9a9a` fixes it site-wide.

### D.7 Brand colour differs between GitHub and the site
The GitHub profile banner is red/black; the site is blue (`$blue` #1F51FF) with a green
status dot. Anyone who comes from GitHub lands somewhere that looks like a different
brand. Pick one accent and use it in both places.

### D.8 Reduced motion is only handled for the logo
There are many moving parts: mouse spotlight, typewriter, animated gradient text,
matrix text, parallax colour swaps, blinking dots, hover scales. Only the logo flip
respects `prefers-reduced-motion`. Extend that media query to the rest, mostly by
turning off the infinite animations and the hover scales.

## Suggested order

1. **Quick wins:** C.2, C.3, C.5, C.6, `.env` note, D.3 hover-scale removal.
2. **Design basics:** ~~D.1 (font)~~ ✅, D.6 (contrast), D.4 (show job details).
3. **Decisions first:** C.4 (title) and D.7 (brand colour), then C.1 + D.2 together —
   redesign the Projects section when the second project is ready.
4. **Mobile & motion:** D.5, D.8.

---

## Changes made (2026-09-29)

Uncommitted at the time of writing. `npm run build` passes; not yet checked in a browser.

- **Copy** (`en.ts`): "used and **am** familiar with", "{years} years **of** experience",
  "Specializing in", "maintainable **code**".
- **Font (D.1)** (`index.html`, `main.scss`, `AboutMe.vue`, `KeepCalm.vue` comment):
  Courier Prime added to the Google Fonts request and to `--font-mono` after Consolas; the
  About Me location card uses Courier Prime first.
- **Tech Stack grid** (`TechStack.vue`): hover labels inside the grid reduced to
  `font-size: 0.8em`, still scaling with the section's `clamp()`.
- **About Me location card** (`AboutMe.vue`): the map no longer appears instantly on
  hover/tap. A green wget-style bar `[====>     ]` fills under `devjhom@ubuntu:~$ find`
  over 0.5 s, then the map fades in; leaving the card restores the console immediately.
  CSS only — tuned by `$map-load-time` and `$map-load-steps`.
- **Docs:** this review was split out of `REFACTOR.md` into its own file.
