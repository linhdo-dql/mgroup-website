/**
 * Unit tests for fluid token calculation, custom `cn` class merging,
 * and bilingual route mapping (`VI` <-> `EN`).
 */
import { describe, expect, it } from 'vitest'

import {
  ALL_PAGE_IDS,
  PAGE_ROUTES,
  getLocalizedCounterpartPath,
  resolvePageFromPath,
} from '@/i18n/routes'
import { cn } from '@/lib/cn'
import { fluid, rem } from '../../../scripts/tokens'

describe('Design Token Fluid Math', () => {
  it('converts px to rem accurately', () => {
    expect(rem(16)).toBe('1rem')
    expect(rem(24)).toBe('1.5rem')
    expect(rem(48)).toBe('3rem')
  })

  it('generates valid clamp() expressions between mobile and desktop viewports', () => {
    const result = fluid(30, 48, 390, 1280)
    expect(result).toContain('clamp(1.875rem,')
    expect(result).toContain('3rem)')
  })

  it('returns fixed rem when minPx equals maxPx', () => {
    expect(fluid(16, 16, 390, 1280)).toBe('1rem')
  })
})

describe('Custom Tailwind Class Merge (cn)', () => {
  it('preserves both custom typography token and semantic text color token', () => {
    const merged = cn('text-h1', 'text-text-primary')
    expect(merged).toContain('text-h1')
    expect(merged).toContain('text-text-primary')
  })

  it('resolves conflicting typography tokens to the last one', () => {
    const merged = cn('text-h1', 'text-h2')
    expect(merged).toBe('text-h2')
  })
})

describe('Bilingual 10-Page Route Mapping', () => {
  it('resolves all 10 pages in both VI and EN accurately', () => {
    expect(ALL_PAGE_IDS).toHaveLength(10)

    for (const pageId of ALL_PAGE_IDS) {
      const def = PAGE_ROUTES[pageId]
      expect(resolvePageFromPath(def.paths.vi)).toEqual({ pageId, locale: 'vi' })
      expect(resolvePageFromPath(def.paths.en)).toEqual({ pageId, locale: 'en' })
    }
  })

  it('maps each Vietnamese route to its exact English counterpart and vice versa', () => {
    expect(getLocalizedCounterpartPath('/ve-chung-toi', 'en')).toBe('/en/about')
    expect(getLocalizedCounterpartPath('/en/about', 'vi')).toBe('/ve-chung-toi')
    expect(getLocalizedCounterpartPath('/giai-phap/xa-phuong', 'en')).toBe(
      '/en/solutions/communes-wards',
    )
    expect(getLocalizedCounterpartPath('/en/solutions/banks', 'vi')).toBe('/giai-phap/ngan-hang')
  })
})
