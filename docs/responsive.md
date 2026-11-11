# Responsive System & Layout Primitives

## 1. Core Unit Philosophy

* **Fixed (`px` / `rem`) for interactive and reading controls:**
  * `px`: 1px borders, `0.5px` hairline (`border-hairline`), 2px focus ring.
  * `rem`: control heights (`min-h-[2.875rem]`), border radii, button padding, `body-md`, `body-sm`, `caption`, and `overline`.
* **Fluid (`clamp(rem + vw)`) for page spatial rhythm and display headings:**
  * Generated automatically by `scripts/tokens.ts` with `rem` bounds so browser zoom (WCAG 1.4.4) works at 200%.

---

## 2. Breakpoints & Grid Matrix

Breakpoints are mobile-first and declared in `rem`:
* `sm`: `40rem` (`640px`)
* `md`: `48rem` (`768px`)
* `lg`: `64rem` (`1024px`)
* `xl`: `80rem` (`1280px` = Desktop frame `D`)
* `2xl`: `96rem` (`1536px`)

### Grid Table (`design/figma-tokens.json`)

| Viewport Tier | Frame Width | Columns | Gutter | Page Margin | Inner Content |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mobile** | `390px` | `4` | `16px` | `16px` | `358px` |
| **Tablet (`md`)** | `768px` | `8` | `20px` | `28px` | `712px` |
| **Desktop (`D`)** | `1280px` | `12` | `24px` | `40px` | `1200px` (`C`) |

`--page-margin` and `--grid-gutter` interpolate piecewise across `390px -> 768px` and `768px -> 1280px`.

---

## 3. Layout Primitives (`src/components/layout/`)

| Component | Core Classes | Purpose |
| :--- | :--- | :--- |
| `Container` | `mx-auto w-full max-w-site px-page` | Constrains outer frame to `1280px` (`D`) with `40px` margin so inner width equals `1200px` (`C`). |
| `Section` | `pt-section-top pb-section-bottom` | Enforces vertical section spacing and surface tones (`default`, `subtle`, `muted`, `dark`). |
| `SectionHeading` | `text-balance lg:whitespace-pre-line` | Renders eyebrow, heading, and description while respecting desktop `\n` line breaks at `>= lg`. |
| `PageGrid` | `grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-gutter` | 4 / 8 / 12-column responsive layout grid. |
| `SiteHeader` | `sticky top-0 z-40 min-h-header` | Global header with desktop dropdowns, mobile drawer, and `VI | EN` counterpart route switcher. |
| `SiteFooter` | `bg-surface-subtle` | Global 3-column footer with legal registration and VNU-TIP badge. |
