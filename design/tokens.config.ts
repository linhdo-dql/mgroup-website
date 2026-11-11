/**
 * Code-owned design token configuration.
 *
 * Defines mobile typography counterparts for fluid clamp() calculation,
 * layout rhythm spacing (section padding, header height), and motion tokens.
 * Modify this file when adjusting responsive scaling curves or semantic mappings,
 * then run `npm run tokens` to regenerate CSS and TypeScript token artifacts.
 */

export interface FluidStyleConfig {
  /** Whether this text style scales fluidly via clamp() or stays fixed in rem. */
  fluid: boolean
  /** Mobile font size in px (at grid.mobile.width). Required when fluid is true. */
  mobileSizePx: number
}

export interface TokensCodeConfig {
  /** Typography mobile sizes for fluid scaling (ratio max/min kept <= 2.5 per WCAG 1.4.4). */
  typographyMobile: Record<string, FluidStyleConfig>
  /** Layout rhythm tokens in px at mobile, tablet, and desktop viewports. */
  layout: {
    sectionPaddingTop: { mobilePx: number; desktopPx: number }
    sectionPaddingBottom: { mobilePx: number; desktopPx: number }
    sectionGap: { mobilePx: number; desktopPx: number }
    headerHeightPx: number
  }
  /** Standardized motion durations and easing curves. */
  motion: {
    durationFast: string
    durationBase: string
    durationSlow: string
    easeStandard: string
    easeOut: string
    easeIn: string
  }
}

export const tokensConfig: TokensCodeConfig = {
  typographyMobile: {
    h1: { fluid: true, mobileSizePx: 30 },
    h2: { fluid: true, mobileSizePx: 24 },
    h3: { fluid: true, mobileSizePx: 18 },
    h4: { fluid: false, mobileSizePx: 17 },
    'body-lg': { fluid: true, mobileSizePx: 16 },
    'body-md': { fluid: false, mobileSizePx: 16 },
    'body-sm': { fluid: false, mobileSizePx: 15 },
    caption: { fluid: false, mobileSizePx: 13 },
    overline: { fluid: false, mobileSizePx: 12 },
  },
  layout: {
    sectionPaddingTop: { mobilePx: 40, desktopPx: 64 },
    sectionPaddingBottom: { mobilePx: 40, desktopPx: 64 },
    sectionGap: { mobilePx: 20, desktopPx: 28 },
    headerHeightPx: 68,
  },
  motion: {
    durationFast: '150ms',
    durationBase: '250ms',
    durationSlow: '400ms',
    easeStandard: 'cubic-bezier(0.2, 0, 0, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
}
