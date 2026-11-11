# M.Group Website (Next.js App Router)

Production-ready frontend architecture for M.Group (`mgroup.vn`), built with **Next.js 15 (App Router)**, **React 19**, **TypeScript (strict)**, and **Tailwind CSS v4**, following the design token, responsive layout, asset self-hosting, and verification standards of `figma-web-build`.

## Requirements

* Node.js `v24` (pinned in `.nvmrc`)
* npm `v10+`

## Getting Started

```bash
npm install
npm run tokens
npm run dev
```

* Development server: `http://localhost:3000`
* Design System & Grid Overlay Inspector (dev only): `http://localhost:3000/design-system`

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Builds the standalone production bundle. |
| `npm run start` | Starts the production Next.js server. |
| `npm run tokens` | Generates `src/styles/tokens.css` and `src/lib/design-tokens.ts` from `design/`. |
| `npm run tokens:check` | Verifies generated token files match `design/figma-tokens.json` and `design/tokens.config.ts`. |
| `npm run typecheck` | Runs TypeScript compiler check (`tsc --noEmit`). |
| `npm run lint` | Runs ESLint with `--max-warnings=0`. |
| `npm run format` | Formats source files with Prettier. |
| `npm run format:check` | Verifies Prettier formatting. |
| `npm run check:assets` | Audits `src/` to ensure zero remote image or font URLs are used. |
| `npm run test` | Runs Vitest unit and schema contract tests. |
| `npm run verify` | Full quality gate: `tokens:check` + `typecheck` + `lint` + `format:check` + `check:assets` + `test` + `build`. |

## Environment Variables

See `.env.example` for all supported variables:

* `NEXT_PUBLIC_SITE_URL`: Canonical site origin used for SEO metadata, `hreflang`, and `sitemap.xml`.
* `NEXT_PUBLIC_API_BASE_URL`: Base path for API requests (default `/api`).
* `NEXT_PUBLIC_API_TIMEOUT_MS`: Client request timeout in milliseconds (default `15000`).
* `NEXT_PUBLIC_ENABLE_MOCKS`: Enables `?mock_delay` and `?mock_error` simulation on `/api/contact`.
* `CONTACT_WEBHOOK_URL`: Server-only webhook URL (e.g. Google Apps Script / Slack / Telegram) to forward validated contact submissions without modifying frontend code.

## Docker

```bash
docker compose up --build
```

Runs the standalone Next.js server as a non-root user (`node`) on port `8080`.

## Documentation

* [Design Tokens Pipeline](./docs/design-tokens.md)
* [Responsive System & Layout Primitives](./docs/responsive.md)
* [API Contract](./docs/api-contract.md)
