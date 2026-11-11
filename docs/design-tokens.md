# Design Tokens Specification

## 1. Pipeline Overview

The design token system follows a strict one-way pipeline so components never use arbitrary values (`text-[17px]`, `bg-[#18181B]`) or manual `clamp()` strings:

| File | Owner | Responsibility |
| :--- | :--- | :--- |
| `design/figma-tokens.json` | Design / Handover | Raw primitive colors, mode-scoped semantic aliases, desktop typography specs, grid dimensions, radii, and elevation shadows. |
| `design/tokens.config.ts` | Engineering | Fluid mobile font size counterparts, section vertical rhythm, and motion duration/easing tokens. |
| `scripts/tokens.ts` | Engineering | Generates `src/styles/tokens.css` and `src/lib/design-tokens.ts`; verifies zero drift via `--check`. |
| `src/styles/theme.css` | Engineering | Maps semantic aliases, defines `border-hairline`, and enforces `prefers-reduced-motion`. |

Run `npm run tokens` after updating `design/figma-tokens.json` or `design/tokens.config.ts`.

---

## 2. Color Palette

### Primitive Tokens (`colors.primitive`)
* `neutral-0`: `#FFFFFF`
* `neutral-50`: `#FAFAFA`
* `neutral-100`: `#F4F4F5`
* `neutral-200`: `#E4E4E7`
* `neutral-300`: `#D4D4D8`
* `neutral-400`: `#A1A1AA`
* `neutral-500`: `#71717A`
* `neutral-600`: `#52525B`
* `neutral-700`: `#3F3F46`
* `neutral-800`: `#27272A`
* `neutral-900`: `#18181B`
* `brand-primary`: `#18181B`
* `brand-accent`: `#1D4ED8`

### Semantic Aliases (`colors.alias.light` / `.dark`)
Components reference semantic aliases exclusively:
* **Text:** `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-text-subtle`, `text-text-inverse`, `text-text-accent`
* **Surface:** `bg-surface-default`, `bg-surface-subtle`, `bg-surface-muted`, `bg-surface-elevated`, `bg-surface-dark`
* **Border:** `border-border-subtle`, `border-border-default`, `border-border-strong`, `border-border-accent`
* **Actions & Status:** `bg-action-primary`, `bg-action-primary-hover`, `bg-status-ready-bg`, `text-status-ready-text`, `bg-status-tuned-bg`, `text-status-tuned-text`, `text-status-danger`

---

## 3. Typography Scale

Font family: **Inter Variable** (`@fontsource-variable/inter`), self-hosted with a metric-adjusted `Inter Fallback` (`size-adjust: 107%`, `ascent-override: 90%`, `descent-override: 22%`).

| Utility Class | Scaling Mode | Mobile (390px) | Desktop (1280px) | Line Height | Letter Spacing | Weight |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `text-h1` | Fluid `clamp()` | `30px` (`1.875rem`) | `48px` (`3rem`) | `1.15` | `-0.02em` | `700` |
| `text-h2` | Fluid `clamp()` | `24px` (`1.5rem`) | `34px` (`2.125rem`) | `1.2` | `-0.01em` | `700` |
| `text-h3` | Fluid `clamp()` | `18px` (`1.125rem`) | `20px` (`1.25rem`) | `1.35` | `-0.005em` | `600` |
| `text-h4` | Fixed `rem` | `17px` (`1.0625rem`) | `17px` (`1.0625rem`) | `1.35` | `0` | `600` |
| `text-body-lg` | Fluid `clamp()` | `16px` (`1rem`) | `18px` (`1.125rem`) | `1.6` | `0` | `400` |
| `text-body-md` | Fixed `rem` | `16px` (`1rem`) | `16px` (`1rem`) | `1.6` | `0` | `400` |
| `text-body-sm` | Fixed `rem` | `15px` (`0.9375rem`) | `15px` (`0.9375rem`) | `1.55` | `0` | `400` |
| `text-caption` | Fixed `rem` | `13px` (`0.8125rem`) | `13px` (`0.8125rem`) | `1.5` | `0` | `400` |
| `text-overline` | Fixed `rem` | `12px` (`0.75rem`) | `12px` (`0.75rem`) | `1.4` | `0.06em` | `600` |
