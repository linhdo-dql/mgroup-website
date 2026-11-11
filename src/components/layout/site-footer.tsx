/**
 * Global 3-column footer (`SiteFooter`) implementing Part C2 of the M.Group specification.
 *
 * Displays legal business registration details (`CÔNG TY CỔ PHẦN M.GROUP`),
 * VNU-TIP incubation positioning badge, quick navigation links, and headquarters contact info.
 */
import Link from 'next/link'

import { SITE_CHROME_CONTENT, getPageHref } from '@/content/navigation'
import type { Locale } from '@/i18n/routes'

import { Container } from './container'

export interface SiteFooterProps {
  /** Active locale for the current route (`vi` or `en`). */
  locale: Locale
}

/**
 * Renders the global site footer.
 *
 * @param props - SiteFooter properties.
 * @returns Rendered footer element.
 */
export function SiteFooter({ locale }: SiteFooterProps) {
  const { footer } = SITE_CHROME_CONTENT[locale]

  return (
    <footer className="bg-surface-subtle text-text-secondary border-t border-border-subtle">
      <Container className="flex flex-col gap-6 pt-10 pb-7">
        <div className="flex flex-wrap gap-y-7 gap-x-12">
          {/* Column 1: Company Legal Info & VNU-TIP Positioning */}
          <div className="flex-[2_1_23.75rem] min-w-0 flex flex-col gap-2.5 text-[0.875rem]">
            <strong className="text-caption uppercase tracking-[0.1em] text-text-primary">
              {footer.legalName}
            </strong>
            <p className="m-0 text-[0.875rem] text-text-secondary">{footer.positioning}</p>
            <p className="m-0 text-caption text-text-muted">{footer.registrationInfo}</p>
            <div className="self-start inline-flex items-center gap-2.5 mt-1 px-3.5 py-2.5 rounded-8 border border-dashed border-border-strong text-caption text-text-muted">
              <span>[Logo VNU-TIP]</span>
              <strong className="text-text-primary font-semibold">{footer.vnuBadge}</strong>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex-[1_1_15rem] min-w-0 flex flex-col gap-1.5 text-[0.875rem]">
            <strong className="text-caption uppercase tracking-[0.1em] text-text-primary mb-1">
              {footer.quickLinksTitle}
            </strong>
            {footer.quickLinks.map((link) => (
              <Link
                key={link.pageId}
                href={getPageHref(link.pageId, locale)}
                className="inline-flex items-center min-h-[2.25rem] text-text-secondary hover:text-text-primary no-underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Contact Details */}
          <div className="flex-[1_1_15rem] min-w-0 flex flex-col gap-2 text-[0.875rem]">
            <strong className="text-caption uppercase tracking-[0.1em] text-text-primary mb-1">
              {footer.contactTitle}
            </strong>
            <p className="m-0 text-[0.875rem] text-text-secondary">
              <strong className="text-text-primary">{footer.addressLabel}:</strong>{' '}
              {footer.addressValue}
            </p>
            <p className="m-0 text-[0.875rem] text-text-secondary">
              <strong className="text-text-primary">{footer.phoneLabel}:</strong>{' '}
              <a
                href="tel:+84989516685"
                className="text-text-secondary hover:text-text-primary no-underline"
              >
                {footer.phoneValue}
              </a>
            </p>
            <p className="m-0 text-[0.875rem] text-text-secondary break-words">
              <strong className="text-text-primary">{footer.emailLabel}:</strong>{' '}
              {footer.emailValue}
            </p>
          </div>
        </div>

        <div className="border-t border-border-subtle pt-3.5 text-caption text-text-muted">
          {footer.copyright}
        </div>
      </Container>
    </footer>
  )
}
