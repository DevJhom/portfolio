# Refactoring Report

Scan of `src/` (3,093 lines across 26 files) on branch `improvements`, commit `8bc8e27`.
`npm run build` currently **passes** — every item below is a maintainability, correctness,
or performance concern, not a broken build.

Findings are ordered by *value ÷ risk*. Nothing here changes what the site looks like;
these are all behaviour-preserving cleanups unless explicitly noted.

---

## Priority 1 — Do these first (high value, low risk)

### 1.1 `TechStack.vue` drives the DOM by hand instead of by state
**`src/components/TechStack.vue:97-142`**

`triggerHover()` reaches into the DOM with `querySelectorAll` and toggles a `.my-hover`
class on three `<li>` elements by index:

```ts
const listItems = document.querySelectorAll('.history-tl-container ul.tl li');
const firstItem = listItems[0];
// ...
firstItem.classList.add('my-hover');
secondItem.classList.remove('my-hover');
thirdItem.classList.remove('my-hover');
```

This is a 45-line if/else chain that does what one reactive ref does. It is also
**unguarded** — `listItems[0]` is `undefined` if the section hasn't rendered yet
(the whole block is behind `v-if="activeSection == 'tech-stack'"`), so any call
before mount throws.

**Fix:** replace the whole function with a single `activeExp` ref and bind it:

```vue
<li class="tl-item" :class="{ 'my-hover': activeExp === exp.id }" ...>
```

That deletes `triggerHover` entirely (~45 lines) and removes the last DOM query in the file.

---

### 1.2 `TechStack.vue`'s tech grid is 13 copies of the same thing
**`src/components/TechStack.vue:220-330` (template) and `:383-620` (styles)**

Thirteen technologies are each hand-written three times:

| Where | What is repeated | Cost |
|---|---|---|
| `isHover` / `hasUsed` reactive objects (`:20-63`) | 12 keys, twice | 26 lines |
| Template `<div class="tech-stack-grid-item grid-N" :class="{...}">` + inline SVG | 13 near-identical blocks | ~110 lines |
| `.grid-2` … `.grid-14` placement rules (`:383-450`) | 13 blocks differing only in `grid-column-start` / `grid-row-start` | ~85 lines |
| `.grid-N:hover, .used-X { color: $c; border: 2px solid $c; }` (`:553-620`) | 13 blocks differing only in the colour | ~70 lines |

**Fix:** one data array, one `v-for`, one CSS rule.

```ts
const TECHS = [
  { key: 'vue',   label: 'Vue',   color: 'var(--vue-green)' },
  { key: 'react', label: 'React', color: 'var(--react-blue)' },
  // …
] as const;
```

```vue
<div v-for="t in TECHS" :key="t.key"
     class="tech-stack-grid-item"
     :style="{ '--tech-color': t.color }"
     :class="{ used: hasUsed[t.key], dimmed: hoverOnExp.hoverStart && !hasUsed[t.key] }"
     @mouseenter="isHover[t.key] = true" @mouseleave="isHover[t.key] = false">
  <span v-if="isHover[t.key]">{{ t.label }}</span>
  <component v-else :is="t.icon" />
</div>
```

```scss
.tech-stack-grid-item:hover,
.tech-stack-grid-item.used { color: var(--tech-color); border: 2px solid var(--tech-color); }
```

Grid placement becomes `grid-auto-flow` or an `@each` loop instead of 13 hand-tuned blocks.
Expected: **681 lines → roughly 300.** The 13 inline SVGs move into `src/assets/Icons/`,
matching the existing convention there.

Note: Google Cloud (`:608-615`) genuinely differs — it uses a gradient border — so keep
that one as an override rather than forcing it into the shared rule.

---

### 1.3 The `hasUsed` / `hoverOnExp` key typos that currently work by accident
**`src/components/TechStack.vue:43-63`**

```ts
const hoverOnExp = reactive({ hoverStart: false, internship: false, omnistar: false,
                              hoverClicknext: false });   // ← declared
// but the code only ever writes and reads:
hoverOnExp.clicknext = value;                             // ← undeclared
```

Same shape in `hasUsed`: `scss` is written at `:71`, `:91` and read in the template, but
it is **not** one of the 12 declared keys. Both work only because `reactive()` proxies
allow adding keys at runtime and `undefined` is falsy — so `hoverClicknext` is dead and
`clicknext`/`scss` are undeclared. Fix the declarations when doing 1.2; the index-signature
type (`{ [key: string]: boolean }`) is what hides these, so tighten it to a union of
the real keys.

---

### 1.4 Dead code and unused dependencies

Cheap deletions, all verified unused:

| Item | Location | Note |
|---|---|---|
| `import 'bootstrap'` (the JS bundle) | `src/main.ts:3` | **Zero** Bootstrap JS components used — no `data-bs-*` attributes, no programmatic API calls anywhere in `src/`. Only CSS utilities are used. Dropping this line removes ~80 kB from the 317 kB JS chunk. |
| `lodash.debounce` + `@types/lodash.debounce` | `package.json:14,19` | Only reference is the commented-out import at `TechStack.vue:4`. |
| Commented-out `handleScroll` block | `TechStack.vue:143-181` | 39 lines of dead scroll-driven hover logic, superseded by the `.hover-area-*` divs. |
| `src/assets/Icons/RightArrow.vue` | — | Imported by nothing. |
| `input-group-append` | `Contact.vue:52` | Bootstrap **4** class; removed in Bootstrap 5.3.3, so it styles nothing. |
| `.animate-on-scroll` / `.visible` | `scss/animate.scss:10-19` | No template uses either class. |

---

## Priority 2 — Correctness and performance

### 2.1 `#keep-calm` can never fire its IntersectionObserver
**`src/components/MainPage.vue:16` + `:69` + `:382`**

`sections` registers `keep-calm`, the observer uses `threshold: 0.5`, and `#keep-calm` is
`min-height: 300vh`. An element three viewports tall can never have 50% of itself on
screen — the maximum achievable ratio is ~0.33. So `activeSection` is **never** set to
`'keep-calm'`, and that array entry is dead.

It's harmless today (the three inner `keep-calm-1/2/3` ids do the real work, and
`NavBar.vue:24` matches on `includes('keep-calm')` which the inner ids satisfy), but it is
a trap: anyone adding a tall section and wiring it to `activeSection` will hit the same
silent failure. Either drop the `keep-calm` entry or give tall sections a per-section
threshold.

### 2.2 The scroll-reveal paragraph forces ~357 layout reflows per scroll event
**`src/components/KeepCalm.vue:130-155`**

The 357-character paragraph is split into **one `<span>` per character** (`:203-207`), and
an **unthrottled** `scroll` listener calls `getBoundingClientRect()` on every one of them
and then writes `style.color`:

```ts
spanElements.forEach((spanElement) => {
    const rect = spanElement.getBoundingClientRect();   // forced reflow
    // …
    spanElement.style.color = 'white';                  // invalidates layout
});
```

Read-then-write interleaved across 357 nodes on every scroll frame is the classic
layout-thrashing pattern. Three fixes, cheapest first:

1. Add `{ passive: true }` to the listener and wrap the body in `requestAnimationFrame`.
2. Split per **word** instead of per character — ~55 nodes instead of 357, visually
   near-identical for a reveal effect.
3. Better: measure the *container* once and drive the reveal from a single scroll
   progress value bound to a CSS custom property, so the browser does the interpolation.
   That removes the per-node JS entirely.

### 2.3 `downloadResume()` uses a fragile relative path
**`src/components/MainPage.vue:43-48`**

```ts
link.href = "./Resume_Sai_Swan_Wan.pdf";
```

`./` resolves against the *document directory*, so this breaks whenever the site is served
from a path without a trailing slash. Use the build-aware base instead:

```ts
link.href = `${import.meta.env.BASE_URL}Resume_Sai_Swan_Wan.pdf`;
```

The hardcoded `/letter-j.png`, `/world.svg`, `/sourcecodes.png` etc. elsewhere are fine —
those go through Vite's base rewriting. `downloadResume` is the one that bypasses it.

### 2.4 Timers created outside a lifecycle hook, never cleared
**`src/components/Loading.vue:4-6`** and **`src/components/Contact.vue:16-18`**

```ts
// Loading.vue — runs at setup, no onUnmounted
setTimeout(() => { displayLoading.value = false; }, 1000);
```

Every other effect in this codebase is torn down in `onUnmounted` (`MainPage.vue:86-97`,
`KeepCalm.vue:157-161`, `Contact.vue:40-42`) — these two are the exceptions. Low
real-world impact on a single-page site that never unmounts, but they break the project's
own convention and will leak the moment anything conditionally renders these components.

`Contact.vue`'s copy-feedback timer has the same issue and can also stack if the button is
clicked repeatedly; store the id and `clearTimeout` before re-arming.

### 2.5 `KeepCalm.vue` reads colours out of CSS at setup time
**`src/components/KeepCalm.vue:19-21`**

```ts
const cssBlack = getComputedStyle(document.documentElement).getPropertyValue('--color-black').trim();
```

This runs during `setup()` and silently yields `''` if the stylesheet hasn't applied,
which would set `background-color: ''`. It also means the palette lives in *three* places:
`scss/colors.scss`, the `:root` custom properties in `main.scss:2-3`, and this JS.

**Fix:** drop the JS entirely and toggle a class —
`:class="{ 'is-blue': activeSection === 'keep-calm-3' }"` with the colour staying in SCSS
where the rest of the palette lives.

---

## Priority 3 — Structure and duplication

### 3.1 The spotlight effect is written twice
**`src/components/MainPage.vue:33-41`** and **`src/components/Contact.vue:25-34`**

Two near-identical `updateSpotlight` functions, two `mousemove` listeners, two
`document.querySelector` lookups. `Contact.vue` additionally carries a magic constant:

```ts
const scrolledViewHeight = 700; //adjust according to number of sections
```

That comment is an admission of a design problem — the number has to be retuned by hand
whenever a section is added or resized above it.

**Fix:** extract `useSpotlight(elRef, { radius, falloff })` into `src/helpers/`. Pass the
element as a template ref instead of querying by class, and compute the offset from the
element's own `getBoundingClientRect().top` rather than hardcoding 700.

### 3.2 `useIsMobile()` is always immediately re-derived
**`src/helpers/helpers.ts:3-20`**, used in `AboutMe.vue:25`, `TechStack.vue:11`, `Projects.vue:13`

Three components each write the same two lines:

```ts
const isMobile = useIsMobile();
const isDesktop = computed(() => !isMobile.value);
```

Have the composable return `{ isMobile, isDesktop }`. Also consider hoisting the
`matchMedia` object to module scope — right now each of the four consuming components
registers its own listener for the identical query.

### 3.3 Navigation has two sources of truth
**`src/components/MainPage.vue:13-23`** and **`src/components/NavBar.vue:19-38`**

`MainPage` owns a `sections` array with `id` and `label` — and `NavBar` ignores it
entirely, hardcoding five `<li>` elements with duplicated ids and labels. The `label`
field in `sections` is therefore **never read**. Adding a section means editing both, and
`CLAUDE.md` documents this as a required three-place edit.

**Fix:** pass `sections` to `NavBar` and `v-for` over it, with a `showInNav: boolean` flag
so the `keep-calm-1/2/3` observer targets stay out of the nav. That reduces the
add-a-section ritual from three places to one.

### 3.4 `AboutMe.vue` grid placement is positional and fragile
**`src/components/AboutMe.vue:249-297`**

Cards are positioned with `.grid-item:nth-child(1)` … `:nth-child(6)`, with a comment at
`:287-297` mapping index → card name. Reordering children in the template silently moves
cards to the wrong cells, and the hover rules at `:335`/`:342` are written as
`.grid-item:nth-child(1):hover .location-card-top` — coupling a *style* selector to a
*position*.

**Fix:** the class names already exist (`.location-card`, `.description-card`, …). Use
`grid-template-areas` with named areas, or just move the placement rules onto those
classes. The explanatory comment then becomes unnecessary.

### 3.5 The home hero lives inside `MainPage.vue`
**`src/components/MainPage.vue:115-139` + `:264-330`**

Every other section is its own component; the hero is inlined, which is why
`MainPage.vue` is 389 lines and mixes layout orchestration with content. Extract
`HomeHero.vue` (markup, the typewriter timers at `:52-60`, and the `.hero-*` /
`.introduction-text` / `.text-animation` styles). `MainPage` then does one job: own
`activeSection` and lay out sections.

Related: those typewriter timers (`1000` / `3000` ms) have to stay in sync by hand with
the `typing 2s` keyframe in `animate.scss:93`. Worth a shared variable or a CSS-only
implementation.

### 3.6 `KeepCalm.vue`'s matrix effect is seven copies of one variable
**`src/components/KeepCalm.vue:39-45` and `:88-96`**

Seven `randomText1..7` refs, each seeded with a hand-typed 231-character literal
(1,617 characters of noise in source), plus an `updateRandomTexts()` that names all seven
by hand and a template (`:174-186`) that interpolates them in a fixed 13-slot pattern.

**Fix:** `const rows = ref(Array.from({length: 7}, () => randomSeed(231)))`, one
`rows.value = rows.value.map(matrixEffect)`, and `v-for` in the template. That deletes the
1,617 characters of literal and makes the row count a one-line change.

### 3.7 Contact details are hardcoded in several places

`jhomwan238@gmail.com` appears in `Contact.vue:51`, `:53` and `AboutMe.vue:212`. The three
social URLs appear in both `AboutMe.vue:134-141` and `Contact.vue:62-69`. Move them to a
single `src/data/profile.ts` and import — this is a portfolio, these will change.

### 3.8 `NavBar.vue` breaks the file-wide props convention
**`src/components/NavBar.vue:4-8`**

```ts
const props = defineProps({ activeSection: String });        // untyped, optional
const activeSection = computed(() => props.activeSection);   // redundant passthrough
```

Every other component uses `defineProps<{ activeSection: string }>()`. The `computed` adds
nothing over `props.activeSection` and forces the `?.includes(...)` optional chain at
`:24`. There's also a leftover commented assignment at `:11`.

---

## Priority 4 — Build, config, and repo hygiene

### 4.1 `dist/` is gitignored *and* tracked, and is stale

`.gitignore` lists `dist`, yet 10 files under `dist/` are tracked in git (from the older
"new build" commits). Because they're ignored, they never update — `dist/index.html` still
points at:

```html
<script type="module" crossorigin src="https://devjhom.site/assets/index-yWIQPyAo.js"></script>
```

while `vite.config.ts:3` now sets `base: '/portfolio/'`. The committed build and the
current config disagree about where the site is deployed. Run `git rm -r --cached dist`
and let `gh-pages` own that branch.

**Also note:** the project `CLAUDE.md` documents `base: 'https://devjhom.site/'` and warns
that `npm run preview` loads assets from the live site. That is no longer true — the base
is `/portfolio/`, so `npm run preview` works fine now. Update that section.

### 4.2 36 Sass deprecation warnings — `@import` is being removed

`vite.config.ts:106-117` injects four stylesheets via `additionalData` using `@import`.
Every build prints, 36 times (once per SCSS block in the project):

> `DEPRECATION WARNING [import]: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.`

This is a hard deadline, not a style nit — the build breaks on Dart Sass 3.

**Fix:** migrate to the module system. `@use "…" as *` in `additionalData`, and the
variable files need `@forward`. Sass ships an automated migrator
(`sass-migrator module --migrate-deps`). Do this before it becomes urgent; it touches
every `<style scoped lang="scss">` block, so it is best done as its own commit.

### 4.3 Two path aliases are broken
**`tsconfig.app.json:132-138` vs `vite.config.ts:98-105`**

| Alias | tsconfig | vite | Status |
|---|---|---|---|
| `@components/*` | ✅ | ✅ | works |
| `@assets/*` | ✅ | ❌ missing | type-checks, then **fails to resolve at runtime** |
| `@helpers/*` | `["/src/helpers/*"]` — leading slash | ✅ | tsconfig target is wrong |

All existing code sidesteps both by writing `@/assets/Icons/Foo.vue` and
`@/helpers/helpers`. Either fix the two definitions or delete the unused aliases — leaving
them half-working is a trap for the next person.

### 4.4 Bootstrap costs 290 kB of CSS for ~18 utility classes

The full `bootstrap.min.css` is imported at `main.ts:4`, producing a 289.67 kB CSS bundle
(42 kB gzipped). The entire set of Bootstrap classes actually used is:

`nav` · `nav-pills` · `nav-item` · `nav-link` · `form-control` · `input-group` · `btn` ·
`btn-outline-secondary` · `d-flex` · `text-end` · `text-center` · `w-75` · `ms-1` ·
`ms-4` · `mt-2` · `mt-3` · `mt-4` · `container`

Options, in increasing effort: import only the needed Bootstrap SCSS partials; or replace
these ~18 classes with local rules and drop the dependency entirely. Either roughly halves
the CSS payload. Not urgent — but note that `main.scss:125-141` already overrides Swiper
and `NavBar.vue` already restyles `nav-pills` almost completely, so the framework is
earning less than it costs.

### 4.5 `index.html` — wrong favicon MIME type, no metadata
**`index.html:6`**

```html
<link rel="icon" type="image/svg+xml" href="/letter-j.png" />
```

The file is a PNG declared as SVG. Also missing, for a site whose whole purpose is being
found and shared: `<meta name="description">`, Open Graph tags (`og:title`,
`og:description`, `og:image`), and a canonical URL.

### 4.6 Accessibility gaps

- **12 `target="_blank"` links, none with `rel="noopener noreferrer"`.** Modern browsers
  imply `noopener`, but `noreferrer` is still worth adding.
- **Clickable `<div>`s that should be `<button>`s:** `MainPage.vue:111` (download resume),
  `KeepCalm.vue:172-173` (start/stop). Not keyboard-reachable and not announced as controls.
- **Icon-only links have no accessible name:** `AboutMe.vue:134-142` and
  `Contact.vue:62-70` wrap bare SVGs — add `aria-label="GitHub"` etc.
- **`.social-links` is `display: none` under 768 px** (`AboutMe.vue:668-670`), so the
  GitHub/LinkedIn/Facebook links in that card are unreachable on mobile.

---

## Suggested order of work

1. **P1.4** — delete dead code and the unused Bootstrap JS import. Pure subtraction, no risk.
2. **P1.1 + P1.2 + P1.3** — the `TechStack.vue` rewrite. Biggest single win: ~681 → ~300 lines.
3. **P4.1** — untrack `dist/`, fix the `CLAUDE.md` base-URL section.
4. **P2.1 – P2.5** — the correctness and perf fixes; each is small and independent.
5. **P3.1 – P3.8** — extractions. `useSpotlight` (3.1) and the `sections`/`NavBar`
   unification (3.3) have the best ratio.
6. **P4.2** — the Sass `@use` migration, as its own commit, before Dart Sass 3 lands.
7. **P4.4 – P4.6** — bundle size, metadata, accessibility.

## Before you start

There is no test runner and no linter — `npm run build` is the only gate, and it catches
type errors and unused locals but nothing behavioural. Since every item above is meant to
be behaviour-preserving, verify by eye in `npm run dev` at three widths (>1024 px,
768–1024 px, <768 px) and check that each section still animates in on scroll. The
`|| isMobile` escape hatch documented in `CLAUDE.md` is the thing most likely to break
silently during the `TechStack` rewrite.
