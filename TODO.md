# To-do

Open items merged from `CONTENT-REVIEW.md` (2026-09-29) and `REFACTOR.md`, re-checked
against the code on 2026-10-10. Finished and obsolete items have been removed.

Design notes come from reading templates and styles, not a browser session, so check each
one visually before acting on it. Refactors are meant to be behaviour-preserving:
`npm run build` is the only gate, so also check `npm run dev` at three widths (>1024 px,
768–1024 px, <768 px).

## Content

### C.1 Only one project
**`src/components/Projects.vue`**

Projects shows FretWizard plus a GitHub link card. Every title on the site says *Full Stack
Developer*, but nothing demonstrates backend work (C#, databases, APIs). One more project
with a backend, even a small one, would back up the title. The portfolio itself is a
reasonable second card.

### C.2 Check the résumé title
The site now says *Full Stack Developer* everywhere. Confirm
`public/Resume_Sai_Swan_Wan.pdf` uses the same title.

## Design

### D.1 The Projects section breaks the visual system
**`src/components/Projects.vue`**

- The FretWizard card is the only light-background element on a dark site, and its
  yellow badges add a colour used nowhere else.
- On hover the FretWizard card grows to full width and the GitHub card collapses to
  5% with its content removed — a large layout shift triggered just by moving the mouse.
- With one project the section looks empty.

Suggested: a grid of dark cards in the same glass style as the Contact form and logo
(`rgba(255,255,255,0.08)` + border + blur), each with a screenshot, tech tags in the
site's accent colour, and two explicit buttons (**Live** / **Code**). Hover should lift
or highlight, not resize neighbours. Do this together with C.1.

### D.2 The hero has no call to action
**`src/components/MainPage.vue`**

The hero has a greeting, the role and a stack line, with a small arrow in the corner. Add
two buttons, e.g. **View projects** and **Contact me**. Also drop
`.introduction-text:hover { transform: scale(1.1) }` (`:427`) — headings jumping when the
mouse passes over them reads as a glitch.

### D.3 Job details and tech names are still partly hidden on desktop
**`src/components/TechStack.vue`**

- Phones always show the job descriptions. On desktop only the job under the scroll
  pointer (or the mouse) shows its description; consider showing all three, or at least
  the current role, by default.
- In grid view a tech's name only appears on hover, replacing the logo. Consider a small
  permanent label or a tooltip that doesn't swap the icon out.

### D.4 No navigation on phones
**`src/components/NavBar.vue:83`**

The nav bar is `display: none` below 768 px and nothing replaces it, so phone visitors
can only scroll. Add a compact menu button, or at least a floating back-to-top link.

### D.6 Brand colour differs between GitHub and the site
The GitHub profile banner (also used as `og-image.png`) is red/black; the site is blue
(`$blue` #1F51FF) with a green status dot. Anyone who comes from GitHub lands somewhere
that looks like a different brand. Pick one accent and use it in both places.

### D.7 Reduced motion is only partly handled
`prefers-reduced-motion` now covers the logo flip, the About Me wires, the source-code
backdrop, the tech-stack scroll pointer and the 3D constellation. Still running
regardless: the mouse spotlights, the hero typewriter and gradient text, the Keep Calm
matrix text, map-label blink and floating boxes, the About Me gradient and floating boxes,
the blinking status dots, and the hover scales.

## Performance

### P.1 Heavy assets in `public/`

| File | Size | Note |
|---|---|---|
| `world.svg` | 1.2 MB | Loads on the first screen (`MainPage.vue`, `KeepCalm.vue`). Minify with SVGO (see below). |
| `demo-picture.jpg` | 246 KB | Background in `AboutMe.vue`. Convert to WebP. |

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

### P.3 Bootstrap costs most of the CSS bundle
**`src/main.ts:4`**

The full `bootstrap.min.css` is imported for a small set of utility, nav and form classes;
the CSS bundle is about 305 kB (43 kB gzipped). Options, in increasing effort: import only
the needed Bootstrap SCSS partials, or replace those classes with local rules and drop the
dependency.

## Correctness

### B.1 `#keep-calm` can never fire its IntersectionObserver
**`src/components/MainPage.vue:21`, `:63`**

`sections` registers `keep-calm`, the observer uses `threshold: 0.5`, and `#keep-calm` is
300vh tall. An element three viewports tall can never have 50% of itself on screen, so
`activeSection` is never set to `'keep-calm'` and that array entry is dead. Harmless today
(the inner `keep-calm-1/2/3` ids do the real work), but a trap for the next tall section.
Drop the entry or give tall sections a per-section threshold.

### B.2 Timers that are never cleared
- `Loading.vue:6` — `setTimeout` at setup, no `onUnmounted`.
- `Contact.vue:19` — the copy-feedback timer isn't stored, so it also stacks when the
  button is clicked repeatedly. Store the id and `clearTimeout` before re-arming, as
  `statusTimer` already does.
- `KeepCalm.vue:28` — the typewriter `setTimeout` inside the `activeSection` watcher.

### B.3 `KeepCalm.vue` reads colours out of CSS at setup time
**`src/components/KeepCalm.vue:22-23`**

`getComputedStyle(...).getPropertyValue('--color-black')` runs during `setup()` and yields
`''` if the stylesheet hasn't applied. It also means the palette lives in three places:
`scss/colors.scss`, the `:root` custom properties in `main.scss`, and this JS. Drop the JS
and toggle a class — `:class="{ 'is-blue': activeSection === 'keep-calm-3' }"` — with the
colour staying in SCSS.

## Refactoring

### R.1 `TechStack.vue` drives the DOM by hand instead of by state
**`src/components/TechStack.vue:172`**

`triggerHover()` uses `querySelectorAll` and toggles a `.my-hover` class on the three
timeline `<li>`s by index, in a long if/else chain. It is unguarded: `listItems[0]` is
`undefined` if the section hasn't rendered. Replace it with one reactive value and bind
it: `:class="{ 'my-hover': activeJob === 'clicknext' }"`. `activeJob` already exists.

### R.2 `TechStack.vue`'s tech grid is 19 copies of the same thing
**`src/components/TechStack.vue`** (1,020 lines)

Each technology is hand-written four times: a key in `isHover` (`:44`) and in `hasUsed`
(`:106`), a near-identical `<div class="tech-stack-grid-item grid-N">` block in the
template (from `:311`), a `.grid-N` placement rule (from `:630`), and a
`.grid-N:hover, .used-X` colour rule (from `:756`).

Fix: one data array, one `v-for`, one CSS rule driven by a `--tech-color` custom property.
`src/constellation/techs.ts` and `jobs.ts` already hold the labels and the job → tech
mapping, so the grid and `mouseOnExp()` can read from them instead of repeating both.
Keep Google Cloud's gradient border as an override. While there, tighten the
`{ [key: string]: boolean }` types to a union of the real keys so a typo fails the build.

### R.3 The spotlight effect is written twice
**`src/components/MainPage.vue:40`** and **`src/components/Contact.vue:78-83`**

Two near-identical `updateSpotlight` functions, two `mousemove` listeners, two
`document.querySelector` lookups, and `Contact.vue` carries
`scrolledViewHeight = 750`, which has to be retuned by hand whenever a section above it
changes. Extract `useSpotlight(elRef, { radius, falloff })` into `src/helpers/`, pass the
element as a template ref, and compute the offset from the element's own
`getBoundingClientRect().top`.

### R.4 `useIsMobile()` is always immediately re-derived
**`src/helpers/helpers.ts:3`**

`AboutMe`, `KeepCalm`, `Projects` and `TechStack` each follow it with
`const isDesktop = computed(() => !isMobile.value)`. Return `{ isMobile, isDesktop }` from
the composable, and consider hoisting the `matchMedia` object to module scope so each
component doesn't register its own listener for the same query.

### R.5 Navigation has two sources of truth
**`src/components/MainPage.vue:18-28`** and **`src/components/NavBar.vue`**

`MainPage` owns a `sections` array with `id` and `label`; `NavBar` ignores it and
hardcodes five `<li>`s, so `label` is never read. Pass `sections` to `NavBar` and `v-for`
over it, with a `showInNav` flag (and the i18n key in place of `label`) so the
`keep-calm-*` observer targets stay out of the nav.

### R.6 `AboutMe.vue` grid placement is positional
**`src/components/AboutMe.vue:444-469`**

Cards are positioned with `.grid-item:nth-child(1..6)`, so reordering children in the
template silently moves cards to the wrong cells. The class names already exist
(`.location-card`, `.description-card`, …): use `grid-template-areas` or move the
placement rules onto those classes.

### R.7 The home hero lives inside `MainPage.vue`
**`src/components/MainPage.vue`** (541 lines)

Every other section is its own component. Extract `HomeHero.vue` (markup, the typewriter
timers, and the `.hero-*` / `.introduction-text` / `.text-animation` styles) so `MainPage`
only owns `activeSection` and the layout. Related: the typewriter timers (1000 / 3000 ms)
have to stay in sync by hand with the `typing 2s` keyframe in `animate.scss`.

### R.8 `KeepCalm.vue`'s matrix effect is seven copies of one variable
**`src/components/KeepCalm.vue:43-49`, `:76-84`**

Seven `randomText1..7` refs, each seeded with a hand-typed ~250-character literal, plus
an `updateRandomTexts()` that names all seven. Use
`const rows = ref(Array.from({ length: 7 }, () => randomSeed(250)))`, one
`rows.value = rows.value.map(matrixEffect)`, and index into `rows` in the template.

### R.9 Contact details are hardcoded in several places
`jhomwan238@gmail.com` appears three times (`Contact.vue:105`, `:107`, `AboutMe.vue:347`)
and the social URLs in `AboutMe.vue:254-260`, `Contact.vue:146-152` and `Projects.vue:18`.
Move them to a single `src/data/profile.ts`.

### R.10 `NavBar.vue` breaks the props convention
**`src/components/NavBar.vue:7-11`**

It uses `defineProps({ activeSection: String })` plus a passthrough `computed`, where every
other component uses `defineProps<{ activeSection: string }>()`. That is what forces the
`?.includes(...)` optional chain.

## Housekeeping

- **`.env` is tracked in git.** It only holds the Web3Forms access key, which is public by
  design, so nothing has leaked. Add `.env` to `.gitignore` before anything secret goes
  in it.
- **`CLAUDE.md` Deployment section is out of date.** `vite.config.ts` now sets
  `base: '/'` (not `https://devjhom.site/`), so `npm run preview` loads from disk, and
  `dist/` is no longer tracked.
- **`input-group-append`** (`Contact.vue:106`) is a Bootstrap 4 class that styles nothing
  in Bootstrap 5.
- **No canonical URL** in `index.html` (description, Open Graph and favicon are done).
- **12 `target="_blank"` links, none with `rel="noopener noreferrer"`.**
- **Icon-only social links have no accessible name** (`AboutMe.vue:254-260`,
  `Contact.vue:146-152`) — add `aria-label="GitHub"` etc.

## Suggested order

1. **Quick wins:** the Housekeeping list, P.1, the hover-scale removal in D.2, B.1–B.3.
2. **`TechStack.vue`:** R.1 + R.2 together, then D.3.
3. **Decisions first:** D.6 (brand colour), then C.1 + D.1 together — redesign the
   Projects section when the second project is ready.
4. **Mobile & motion:** D.4, D.7.
5. **Extractions:** R.3 and R.5 have the best ratio; then R.4, R.6–R.10.
6. **Bundle size:** P.3.
