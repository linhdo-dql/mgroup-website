'use client'

/**
 * Global sticky header (`SiteHeader`) implementing Part C1 of the M.Group specification.
 *
 * Features:
 * - Skip-to-main-content link for keyboard accessibility (WCAG 2.2 AA).
 * - Brand mark with "Member of VNU-TIP" sub-label.
 * - Desktop navigation (`>= lg`) with accessible dropdown menus for "Products" and "Solutions".
 * - Bilingual switcher (`VI` | `EN`) that navigates directly to the exact counterpart page URL.
 * - Full-screen mobile navigation drawer (`< lg`) with collapsible sub-menus and Escape key support.
 */
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { SITE_CHROME_CONTENT, getPageHref } from '@/content/navigation'
import { type Locale, getLocalizedCounterpartPath } from '@/i18n/routes'
import { cn } from '@/lib/cn'

import { ButtonLink } from '../ui/button'
import { Container } from './container'

export interface SiteHeaderProps {
  /** Active locale for the current route (`vi` or `en`). */
  locale: Locale
}

/**
 * Renders the global sticky navigation header.
 *
 * @param props - SiteHeader properties.
 * @returns Rendered header element.
 */
export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname() || '/'
  const content = SITE_CHROME_CONTENT[locale]

  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)

  const viPath = getLocalizedCounterpartPath(pathname, 'vi')
  const enPath = getLocalizedCounterpartPath(pathname, 'en')

  // Close menus on route change
  useEffect(() => {
    setOpenDropdownIndex(null)
    setMobileMenuOpen(false)
  }, [pathname])

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDropdownIndex(null)
        setMobileMenuOpen(false)
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdownIndex(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-8 focus:bg-action-primary focus:text-text-inverse focus:font-semibold"
      >
        {content.skipToMainLabel}
      </a>

      <header className="sticky top-0 z-40 min-h-header border-b border-border-subtle bg-surface-default/95 backdrop-blur-sm">
        <Container className="flex items-center justify-between gap-4 py-2.5">
          {/* Brand Logo + VNU-TIP Positioning */}
          <Link
            href={getPageHref('home', locale)}
            className="flex flex-col justify-center gap-0.5 min-h-[2.75rem] no-underline text-text-primary hover:opacity-85"
          >
            <strong className="text-[1.125rem] font-bold tracking-[0.04em] leading-tight">
              {content.brandName}
            </strong>
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-muted leading-tight">
              {content.brandTagline}
            </span>
          </Link>

          {/* Desktop Navigation (>= lg) */}
          <nav
            ref={navRef}
            aria-label={locale === 'vi' ? 'Điều hướng chính' : 'Main navigation'}
            className="hidden lg:flex items-center gap-1"
          >
            {content.navItems.map((item, idx) => {
              if (item.children) {
                const isGroupActive = item.children.some(
                  (child) => getPageHref(child.pageId, locale) === pathname,
                )
                const isOpen = openDropdownIndex === idx

                return (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdownIndex(isOpen ? null : idx)}
                      className={cn(
                        'inline-flex items-center gap-1.5 min-h-[2.75rem] px-3 text-body-sm font-medium text-text-secondary hover:text-text-primary cursor-pointer bg-transparent border-0 whitespace-nowrap',
                        isGroupActive &&
                          'font-bold text-text-primary shadow-[inset_0_-2px_0_var(--alias-text-primary)]',
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-[var(--duration-fast)]',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen ? (
                      <div
                        role="menu"
                        className="absolute left-0 top-full mt-1 w-72 rounded-12 border border-border-default bg-surface-elevated p-2 shadow-medium z-50"
                      >
                        {item.children.map((child) => {
                          const childHref = getPageHref(child.pageId, locale)
                          const isChildActive = childHref === pathname
                          return (
                            <Link
                              key={child.pageId}
                              href={childHref}
                              role="menuitem"
                              aria-current={isChildActive ? 'page' : undefined}
                              className={cn(
                                'flex flex-col gap-0.5 rounded-8 px-3 py-2.5 no-underline transition-colors duration-[var(--duration-fast)] hover:bg-surface-subtle',
                                isChildActive && 'bg-surface-muted font-semibold',
                              )}
                            >
                              <span className="text-body-sm font-semibold text-text-primary">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="text-caption text-text-muted">
                                  {child.description}
                                </span>
                              ) : null}
                            </Link>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                )
              }

              const href = item.pageId ? getPageHref(item.pageId, locale) : '#'
              const isActive = href === pathname

              return (
                <Link
                  key={item.label}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'inline-flex items-center min-h-[2.75rem] px-3 text-body-sm font-medium text-text-secondary hover:text-text-primary no-underline whitespace-nowrap',
                    isActive &&
                      'font-bold text-text-primary shadow-[inset_0_-2px_0_var(--alias-text-primary)]',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Language Switcher & Primary CTA */}
          <div className="flex items-center gap-3">
            <div
              role="group"
              aria-label={content.languageLabel}
              className="inline-flex rounded-8 border border-border-default overflow-hidden"
            >
              <Link
                href={viPath}
                aria-current={locale === 'vi' ? 'true' : undefined}
                className={cn(
                  'inline-flex items-center justify-center min-w-[2.75rem] min-h-[2.625rem] text-[0.875rem] font-semibold no-underline transition-colors',
                  locale === 'vi'
                    ? 'bg-action-primary text-text-inverse'
                    : 'bg-surface-default text-text-secondary hover:bg-surface-subtle',
                )}
              >
                VI
              </Link>
              <Link
                href={enPath}
                aria-current={locale === 'en' ? 'true' : undefined}
                className={cn(
                  'inline-flex items-center justify-center min-w-[2.75rem] min-h-[2.625rem] text-[0.875rem] font-semibold no-underline border-l border-border-default transition-colors',
                  locale === 'en'
                    ? 'bg-action-primary text-text-inverse'
                    : 'bg-surface-default text-text-secondary hover:bg-surface-subtle',
                )}
              >
                EN
              </Link>
            </div>

            <ButtonLink href={getPageHref('contact', locale)} className="hidden sm:inline-flex">
              {content.ctaLabel}
            </ButtonLink>

            {/* Mobile Menu Trigger (< lg) */}
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? content.closeMenuLabel : content.openMenuLabel}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex lg:hidden items-center justify-center min-w-[2.75rem] min-h-[2.75rem] rounded-8 border border-border-default bg-surface-default text-text-primary cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </Container>

        {/* Full-screen Mobile Navigation Drawer (< lg) */}
        {mobileMenuOpen ? (
          <div className="lg:hidden fixed inset-x-0 top-header bottom-0 z-50 bg-surface-default border-t border-border-subtle overflow-y-auto">
            <Container className="flex flex-col gap-2 py-6">
              {content.navItems.map((item, idx) => {
                if (item.children) {
                  const isExpanded = mobileExpandedIndex === idx
                  return (
                    <div key={item.label} className="border-b border-border-subtle pb-2">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => setMobileExpandedIndex(isExpanded ? null : idx)}
                        className="flex w-full items-center justify-between min-h-[2.75rem] py-2 text-body-md font-semibold text-text-primary bg-transparent border-0 cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 transition-transform duration-[var(--duration-fast)]',
                            isExpanded && 'rotate-180',
                          )}
                        />
                      </button>
                      {isExpanded ? (
                        <div className="flex flex-col gap-1 pl-4 pb-2">
                          {item.children.map((child) => {
                            const childHref = getPageHref(child.pageId, locale)
                            return (
                              <Link
                                key={child.pageId}
                                href={childHref}
                                className="flex flex-col py-2 no-underline text-text-secondary hover:text-text-primary"
                              >
                                <span className="text-body-sm font-semibold text-text-primary">
                                  {child.label}
                                </span>
                                {child.description ? (
                                  <span className="text-caption text-text-muted">
                                    {child.description}
                                  </span>
                                ) : null}
                              </Link>
                            )
                          })}
                        </div>
                      ) : null}
                    </div>
                  )
                }

                const href = item.pageId ? getPageHref(item.pageId, locale) : '#'
                return (
                  <Link
                    key={item.label}
                    href={href}
                    className="flex items-center min-h-[2.75rem] py-2 border-b border-border-subtle text-body-md font-semibold text-text-primary no-underline"
                  >
                    {item.label}
                  </Link>
                )
              })}

              <div className="pt-4">
                <ButtonLink href={getPageHref('contact', locale)} className="w-full">
                  {content.ctaLabel}
                </ButtonLink>
              </div>
            </Container>
          </div>
        ) : null}
      </header>
    </>
  )
}
