# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # node_modules is not checked in — run this first
npm run dev          # Vite dev server
npm run build        # vue-tsc -b (type-check) && vite build  -> dist/
npm run preview      # serve dist/  (see caveat under "Deployment")
npm run deploy       # gh-pages -d dist  -> pushes dist/ to origin/gh-pages
```

There is no test runner and no ESLint/Prettier config. `npm run build` is the only
verification gate, and it is a real gate: `tsconfig.app.json` sets `noUnusedLocals` and
`noUnusedParameters`, so an unused import or variable fails the build. `vue-tsc -b` is
incremental (`node_modules/.tmp/tsconfig.app.tsbuildinfo`); delete that file if type
errors look stale.

## Architecture

A single-page personal portfolio. Vue 3 `<script setup>` + TypeScript + Vite + SCSS,
with Bootstrap 5 and Swiper. No router, no store, no backend — everything is one
scrolling document.

`main.ts` → `App.vue` → `layout/DefaultLayout.vue` → `Loading.vue` (1s splash overlay)
+ `MainPage.vue` (the entire site).

### `activeSection` is the app's only shared state

`MainPage.vue` owns a `sections` array of DOM ids and an `IntersectionObserver`
(threshold 0.5) that writes the id of the section in view into `activeSection`. That
ref is passed as a prop to `NavBar`, `AboutMe`, `KeepCalm`, `TechStack`, and
`Projects`; each child uses it to decide whether it is on screen and should animate in.
Nothing else coordinates the page.

Adding a section means touching three places: the `sections` array in `MainPage.vue`,
a `<div id="..."><section>…</section></div>` wrapper in its template, and an `<li>` in
`NavBar.vue`.

`KeepCalm.vue` is the exception to the one-id-per-section rule: it is a 300vh parallax
block whose three internal ids (`keep-calm-1/2/3`) are what `MainPage` registers, and
it watches `activeSection` to trigger its typewriter and background-colour swap. That
is why `NavBar` highlights "About Me" for any id containing `keep-calm`.

### Desktop-vs-mobile rendering convention

`helpers/helpers.ts` exports `useIsMobile()`, a `matchMedia("(max-width: 768px)")`
composable. Section components follow this pattern, and new ones must too:

```vue
<Transition :name="isDesktop ? 'fade' : ''">
  <div v-if="activeSection == 'projects' || isMobile"> … </div>
</Transition>
```

Content is gated on `activeSection` so it animates in on scroll, but the `|| isMobile`
escape hatch is mandatory — without it the content never renders on phones (where the
observer/transition behaviour is unreliable and `NavBar` is `display: none`).

### SCSS: globals are auto-injected, never imported

`vite.config.ts` uses `css.preprocessorOptions.scss.additionalData` to prepend
`colors.scss`, `layers.scss`, `animate.scss`, and `backgrounds.scss` to **every** SCSS
block in the project. So `$black`, `$blue`, `$radius-md`, `$transition-fast`,
`$top-layer`, the `.animate-on-hover` / `slide-fade-*` / `fade` transition classes and
the shared `@keyframes` are available in any `<style scoped lang="scss">` with no
`@import`. Adding an `@import` for them duplicates the definitions — don't.

- `scss/colors.scss` — palette, border radii, transition speeds.
- `scss/layers.scss` — the z-index scale (`$bottom/middle/top/loading-layer`). Use these
  rather than raw numbers; the spotlight overlays depend on the ordering.
- `scss/animate.scss` — shared keyframes and Vue `<Transition>` class pairs.
- `scss/main.scss` — the only global stylesheet (imported from `main.ts` after
  Bootstrap): resets, `text-vs-*` VS Code-palette helpers, responsive `clamp()` heading
  sizes, scrollbar styling, and Swiper overrides. Everything else is `scoped`.

Bootstrap's CSS and JS are imported globally in `main.ts`, and Bootstrap utility classes
(`d-flex`, `ms-1`, `mt-3`, `nav-pills`, `form-control`, …) are used freely in templates.

### Path aliases (the two sets disagree)

`vite.config.ts` defines `@`, `@components`, `@scss`, `@helpers`; `tsconfig.app.json`
defines `@/*`, `@components/*`, `@assets/*`, `@scss/*`, `@helpers/*`. Two traps:

- `@assets/*` exists only in tsconfig — it type-checks but Vite cannot resolve it.
  Import icons as `@/assets/Icons/Foo.vue`, which is what all existing code does.
- The tsconfig `@helpers/*` target is `["/src/helpers/*"]` (leading slash, wrong).
  Import the composable as `@/helpers/helpers`.

`@components/*` is the one alias that works both ways and is used for section imports.

### Icons and static assets

`src/assets/Icons/*.vue` are hand-inlined SVGs wrapped as components with `width` /
`height` Number props (some also take a `color` String) — that is the pattern for new
ones. Images, SVG backgrounds and the résumé PDF live in `public/` and are referenced by
absolute root path (`src="/letter-j.png"`, `background: url('/world.svg')`).

## Gotchas

- **Spotlight offset.** `MainPage.vue` and `Contact.vue` each paint a radial-gradient
  "spotlight" that follows the mouse. `Contact.vue` hardcodes
  `scrolledViewHeight = 700` to compensate for how far down the page it sits; changing
  the number or height of sections above it means retuning that constant.
- **`AboutMe.vue` grid placement is positional.** Cards are placed with
  `.grid-item:nth-child(1..6)`, not named grid areas, so reordering the children in the
  template silently moves cards to the wrong cells. The card ↔ index mapping is
  documented in a comment at the bottom of that file's `<style>` block.
- **Every effect registers a raw `window` listener** (`mousemove` spotlights, `scroll`
  text reveal) plus `setInterval`/`setTimeout` timers. All of them are torn down in
  `onUnmounted` — keep that up when adding effects.
- `TechStack.vue` reaches into the DOM with `querySelectorAll` to toggle a `.my-hover`
  class on the timeline `<li>`s; it depends on those three list items existing in order.

## Deployment

`vite.config.ts` sets `base: 'https://devjhom.site/'`, so built HTML references assets by
absolute production URL. Consequence: `npm run preview` (and the committed
`dist/index.html`) loads JS/CSS from the live site, not from disk — use `npm run dev` for
local work. Deploy is `npm run build && npm run deploy`, which publishes `dist/` to the
`gh-pages` branch. `dist/` is listed in `.gitignore`, but its static assets are tracked
in git from earlier "new build" commits.
