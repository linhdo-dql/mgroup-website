/**
 * Development-only Design System showcase and token inspector (`/design-system`).
 *
 * Displays all generated tokens from `design/figma-tokens.json` and `design/tokens.config.ts`,
 * layout primitives, UI components, and the interactive 4/8/12-column `GridOverlay`.
 * Automatically returns 404 in production builds (`NODE_ENV === 'production'`).
 */
import { notFound } from 'next/navigation'

import { GridOverlay } from '@/components/common/grid-overlay'
import { PageGrid } from '@/components/layout/page-grid'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { Button, ButtonLink } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  COLOR_TOKENS,
  DESIGN_META,
  GRID_TOKENS,
  RADIUS_TOKENS,
  TYPOGRAPHY_MOBILE_CONFIG,
  TYPOGRAPHY_TOKENS,
} from '@/lib/design-tokens'

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return (
    <main id="main-content">
      <Section tone="subtle">
        <SectionHeading
          eyebrow="DEV ONLY · DESIGN SYSTEM & TOKEN INSPECTOR"
          as="h1"
          title="M.Group Design System & Responsive Primitives"
          description={`Source: ${DESIGN_META.source} · Desktop Frame D = ${DESIGN_META.desktopFrameWidth}px · Content C = ${DESIGN_META.contentWidth}px · Font = ${DESIGN_META.fontFamily}`}
          actions={<GridOverlay />}
        />
      </Section>

      {/* 1. Responsive Grid Matrix */}
      <Section>
        <SectionHeading
          eyebrow="1. GRID & FLUID LAYOUT"
          title="Responsive Breakpoints & Grid Spec"
          description="Mobile-first 4 / 8 / 12-column grid with piecewise fluid page margins and gutters."
        />
        <div className="overflow-x-auto rounded-12 border border-border-default bg-surface-default">
          <table className="w-full min-w-[35rem] border-collapse text-body-sm">
            <thead>
              <tr className="bg-surface-muted text-text-primary text-left">
                <th className="py-3 px-4 border-b border-border-subtle">Tier</th>
                <th className="py-3 px-4 border-b border-border-subtle">Frame Width</th>
                <th className="py-3 px-4 border-b border-border-subtle">Columns</th>
                <th className="py-3 px-4 border-b border-border-subtle">Gutter</th>
                <th className="py-3 px-4 border-b border-border-subtle">Page Margin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b border-border-subtle font-semibold">Mobile</td>
                <td className="py-3 px-4 border-b border-border-subtle">
                  {GRID_TOKENS.mobile.width}px
                </td>
                <td className="py-3 px-4 border-b border-border-subtle">
                  {GRID_TOKENS.mobile.columns}
                </td>
                <td className="py-3 px-4 border-b border-border-subtle">
                  {GRID_TOKENS.mobile.gutterPx}px
                </td>
                <td className="py-3 px-4 border-b border-border-subtle">
                  {GRID_TOKENS.mobile.marginPx}px
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-border-subtle font-semibold">
                  Tablet (md)
                </td>
                <td className="py-3 px-4 border-b border-border-subtle">
                  {GRID_TOKENS.tablet.width}px
                </td>
                <td className="py-3 px-4 border-b border-border-subtle">
                  {GRID_TOKENS.tablet.columns}
                </td>
                <td className="py-3 px-4 border-b border-border-subtle">
                  {GRID_TOKENS.tablet.gutterPx}px
                </td>
                <td className="py-3 px-4 border-b border-border-subtle">
                  {GRID_TOKENS.tablet.marginPx}px
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Desktop (lg / D)</td>
                <td className="py-3 px-4">
                  {GRID_TOKENS.desktop.width}px (content {GRID_TOKENS.desktop.contentWidth}px)
                </td>
                <td className="py-3 px-4">{GRID_TOKENS.desktop.columns}</td>
                <td className="py-3 px-4">{GRID_TOKENS.desktop.gutterPx}px</td>
                <td className="py-3 px-4">{GRID_TOKENS.desktop.marginPx}px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 2. Semantic Color Tokens */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="2. COLOR TOKENS"
          title="Semantic Alias Palette (Light Mode)"
          description="Components bind exclusively to semantic aliases (`bg-surface-*`, `text-text-*`, `border-border-*`)."
        />
        <PageGrid>
          {Object.entries(COLOR_TOKENS.alias.light).map(([name, hex]) => (
            <div
              key={name}
              className="col-span-2 md:col-span-2 lg:col-span-3 flex flex-col gap-2 rounded-12 border border-border-default bg-surface-default p-4"
            >
              <div
                className="h-12 w-full rounded-8 border border-border-subtle"
                style={{ backgroundColor: hex }}
              />
              <strong className="text-body-sm font-semibold text-text-primary">{name}</strong>
              <code className="text-caption text-text-muted">{hex}</code>
            </div>
          ))}
        </PageGrid>
      </Section>

      {/* 3. Typography Scale */}
      <Section>
        <SectionHeading
          eyebrow="3. TYPOGRAPHY SCALE"
          title="Fluid & Fixed Text Styles"
          description="Headings and lead body copy scale smoothly via generated clamp(rem + vw); controls and small labels stay fixed in rem."
        />
        <div className="flex flex-col gap-6">
          {Object.entries(TYPOGRAPHY_TOKENS).map(([styleName, spec]) => {
            const mobileSpec =
              TYPOGRAPHY_MOBILE_CONFIG[styleName as keyof typeof TYPOGRAPHY_MOBILE_CONFIG]
            return (
              <div
                key={styleName}
                className="flex flex-col gap-2 rounded-12 border border-border-subtle bg-surface-subtle p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2">
                  <code className="text-caption font-semibold text-text-accent">
                    text-{styleName}
                  </code>
                  <span className="text-caption text-text-muted">
                    {mobileSpec?.fluid
                      ? `Fluid: ${mobileSpec.mobileSizePx}px (mobile) → ${spec.desktopSizePx}px (desktop)`
                      : `Fixed: ${spec.desktopSizePx}px`}{' '}
                    · line-height {spec.lineHeightRatio} · weight {spec.fontWeight}
                  </span>
                </div>
                <p className={`text-${styleName} text-text-primary m-0`}>
                  Nền tảng AI Vision Make in Vietnam, chạy ngay trong hạ tầng của đơn vị
                </p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* 4. UI Primitives & Radius */}
      <Section tone="subtle">
        <SectionHeading
          eyebrow="4. UI PRIMITIVES"
          title="Buttons, Status Badges & Radii"
          description="Core interactive elements enforcing >= 46px touch height and no-wrap labels."
        />
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary Action Button</Button>
          <Button variant="ghost">Secondary Ghost Button</Button>
          <ButtonLink href="/" variant="ghost">
            Back to Home (VI)
          </ButtonLink>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <StatusBadge variant="ready">Sẵn có (Ready to use)</StatusBadge>
          <StatusBadge variant="tuned">Hiệu chỉnh theo địa bàn (Tuned to local data)</StatusBadge>
          <StatusBadge variant="neutral">On-premise RTSP/ONVIF</StatusBadge>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          {Object.entries(RADIUS_TOKENS).map(([key, px]) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center gap-1 w-28 h-20 border border-border-strong bg-surface-default text-caption"
              style={{ borderRadius: px >= 9999 ? '9999px' : `${px / 16}rem` }}
            >
              <strong className="text-text-primary">rounded-{key}</strong>
              <span className="text-text-muted">{px}px</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
