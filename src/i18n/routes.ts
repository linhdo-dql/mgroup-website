/**
 * Bilingual route registry and SEO metadata helpers for the 10 M.Group pages.
 *
 * Maps every canonical `PageId` to its exact Vietnamese and English URL paths
 * as specified in Part B of the M.Group handover documentation.
 */
import type { Metadata } from 'next'

import { env } from '@/config/env'

export type Locale = 'vi' | 'en'

export type PageId =
  | 'home'
  | 'about'
  | 'platform'
  | 'ocr'
  | 'solution-communes-wards'
  | 'solution-airports'
  | 'solution-banks'
  | 'team'
  | 'contact'
  | 'solution-other'

export interface PageRouteDefinition {
  id: PageId
  paths: Record<Locale, string>
  labels: Record<Locale, string>
  seoTitle: Record<Locale, string>
  seoDescription: Record<Locale, string>
}

export const PAGE_ROUTES: Record<PageId, PageRouteDefinition> = {
  home: {
    id: 'home',
    paths: { vi: '/', en: '/en' },
    labels: { vi: 'Trang chủ', en: 'Home' },
    seoTitle: {
      vi: 'M.Group – Nền tảng AI Vision Make in Vietnam, chạy tại chỗ',
      en: 'M.Group – Make in Vietnam AI Vision platform, on-premise',
    },
    seoDescription: {
      vi: 'M.Group, start-up được ươm tạo của VNU-TIP (ĐHQGHN), thương mại hóa và phát triển COGI AI Vision: phân tích hình ảnh camera và tài liệu bằng AI, chạy hoàn toàn trong hạ tầng của đơn vị.',
      en: 'M.Group, a start-up incubated by VNU-TIP, commercialises and develops COGI AI Vision: AI analysis of camera video and documents that runs entirely inside your own infrastructure.',
    },
  },
  about: {
    id: 'about',
    paths: { vi: '/ve-chung-toi', en: '/en/about' },
    labels: { vi: 'Về chúng tôi', en: 'About us' },
    seoTitle: {
      vi: 'Về M.Group – Start-up AI Vision được ươm tạo tại VNU-TIP',
      en: 'About M.Group – AI Vision start-up incubated at VNU-TIP',
    },
    seoDescription: {
      vi: 'CÔNG TY CỔ PHẦN M.GROUP là start-up được ươm tạo của Công viên Công nghệ cao và Đổi mới sáng tạo, Đại học Quốc gia Hà Nội (VNU-TIP).',
      en: 'M.GROUP JOINT STOCK COMPANY is a start-up incubated by VNU Technology and Innovation Park (VNU-TIP) to commercialise the COGI AI Vision platform.',
    },
  },
  platform: {
    id: 'platform',
    paths: { vi: '/nen-tang', en: '/en/platform' },
    labels: { vi: 'Nền tảng COGI AI Vision', en: 'COGI AI Vision Platform' },
    seoTitle: {
      vi: 'COGI AI Vision – Nền tảng phân tích video bằng AI chạy tại chỗ',
      en: 'COGI AI Vision – On-premise AI video analytics platform',
    },
    seoDescription: {
      vi: 'Nhận dạng khuôn mặt, phát hiện vật thể, giám sát vùng, hành vi và mật độ đám đông trên camera IP sẵn có, xử lý hoàn toàn tại chỗ.',
      en: 'Facial recognition, object detection, zone monitoring, behaviour and crowd analytics on existing IP cameras, processed entirely on-premise.',
    },
  },
  ocr: {
    id: 'ocr',
    paths: { vi: '/cogi-ocr', en: '/en/cogi-ocr' },
    labels: { vi: 'COGI AI Vision OCR', en: 'COGI AI Vision OCR' },
    seoTitle: {
      vi: 'COGI AI Vision OCR – Số hóa và bóc tách tài liệu tiếng Việt tại chỗ',
      en: 'COGI AI Vision OCR – On-premise Vietnamese document extraction',
    },
    seoDescription: {
      vi: 'Chuyển tài liệu scan thành văn bản và trích xuất trường thông tin có cấu trúc. Tối ưu cho tiếng Việt, bảng biểu và chữ viết tay.',
      en: 'Convert scanned documents into structured fields. Optimised for Vietnamese printed text, complex tables, and handwriting.',
    },
  },
  'solution-communes-wards': {
    id: 'solution-communes-wards',
    paths: { vi: '/giai-phap/xa-phuong', en: '/en/solutions/communes-wards' },
    labels: { vi: 'Giải pháp Xã/Phường', en: 'Communes & Wards' },
    seoTitle: {
      vi: 'Giải pháp AI Vision cho Xã/Phường – Giám sát trật tự đô thị & an ninh',
      en: 'AI Vision for Communes & Wards – Urban order and security monitoring',
    },
    seoDescription: {
      vi: 'Phát hiện lấn chiếm vỉa hè, đỗ xe trái phép, đổ rác sai quy định, tụ tập đông người trên hệ thống camera cấp xã/phường.',
      en: 'Detect pavement encroachment, illegal parking, unlawful dumping, and crowd gathering using existing local cameras.',
    },
  },
  'solution-airports': {
    id: 'solution-airports',
    paths: { vi: '/giai-phap/san-bay', en: '/en/solutions/airports' },
    labels: { vi: 'Giải pháp Sân bay', en: 'Airports' },
    seoTitle: {
      vi: 'Giải pháp AI Vision cho Sân bay – Giám sát mật độ & luồng hành khách',
      en: 'AI Vision for Airports – Passenger flow and queue monitoring',
    },
    seoDescription: {
      vi: 'Đo mật độ hành khách, cảnh báo quá tải tại quầy thủ tục, soi chiếu an ninh và cửa khởi hành. Theo dõi ẩn danh, chạy tại chỗ.',
      en: 'Measure passenger density and queue times at check-in, security screening, and boarding gates anonymously on-premise.',
    },
  },
  'solution-banks': {
    id: 'solution-banks',
    paths: { vi: '/giai-phap/ngan-hang', en: '/en/solutions/banks' },
    labels: { vi: 'Giải pháp Ngân hàng', en: 'Banking' },
    seoTitle: {
      vi: 'Giải pháp AI Vision cho Ngân hàng – Giám sát quầy giao dịch & kho quỹ',
      en: 'AI Vision for Banking – Branch counter and vault monitoring',
    },
    seoDescription: {
      vi: 'Đo thời gian chờ và phục vụ tại quầy, kiểm soát quy trình mở/đóng kho quỹ, cảnh báo xâm nhập khu vực hạn chế.',
      en: 'Monitor counter waiting times, verify dual-custody vault procedures, and alert on restricted area access.',
    },
  },
  team: {
    id: 'team',
    paths: { vi: '/doi-ngu', en: '/en/team' },
    labels: { vi: 'Đội ngũ', en: 'Our team' },
    seoTitle: {
      vi: 'Đội ngũ nghiên cứu & phát triển – M.Group',
      en: 'Research & Development Team – M.Group',
    },
    seoDescription: {
      vi: 'Nhóm nghiên cứu thị giác máy tính và xử lý tài liệu do TS. Bùi Quang Anh dẫn dắt tại VNU-TIP.',
      en: 'Computer vision and document analysis research team led by Dr. Bui Quang Anh at VNU-TIP.',
    },
  },
  contact: {
    id: 'contact',
    paths: { vi: '/lien-he', en: '/en/contact' },
    labels: { vi: 'Liên hệ', en: 'Contact' },
    seoTitle: {
      vi: 'Liên hệ tư vấn & khảo sát – M.Group',
      en: 'Contact & Consultation – M.Group',
    },
    seoDescription: {
      vi: 'Liên hệ M.Group để trao đổi bài toán giám sát camera hoặc số hóa tài liệu và hẹn lịch khảo sát trực tiếp.',
      en: 'Contact M.Group to discuss your camera analytics or document OCR requirements and schedule an on-site survey.',
    },
  },
  'solution-other': {
    id: 'solution-other',
    paths: { vi: '/giai-phap/khac', en: '/en/solutions/other' },
    labels: { vi: 'Giải pháp khác', en: 'Custom solutions' },
    seoTitle: {
      vi: 'Giải pháp AI Vision tùy biến theo bài toán riêng – M.Group',
      en: 'Custom AI Vision Solutions – M.Group',
    },
    seoDescription: {
      vi: 'Xây dựng giải pháp thị giác máy tính theo bài toán và quy trình nghiệp vụ riêng của từng đơn vị trên nền tảng COGI AI Vision.',
      en: 'Tailored computer vision solutions built around your organisation’s specific operating procedures on the COGI AI Vision platform.',
    },
  },
}

/** Ordered list of all 10 page IDs. */
export const ALL_PAGE_IDS = Object.keys(PAGE_ROUTES) as PageId[]

/** Every public route across both VI and EN locales. */
export const ALL_PUBLIC_PATHS: string[] = ALL_PAGE_IDS.flatMap((id) => [
  PAGE_ROUTES[id].paths.vi,
  PAGE_ROUTES[id].paths.en,
])

/**
 * Resolves the `PageId` and `Locale` for a given URL pathname.
 *
 * @param pathname - Current pathname (e.g. `/ve-chung-toi` or `/en/about`).
 * @returns Matching `{ pageId, locale }` or `null` if not a registered page.
 */
export function resolvePageFromPath(pathname: string): { pageId: PageId; locale: Locale } | null {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  for (const def of Object.values(PAGE_ROUTES)) {
    if (def.paths.vi === normalized) return { pageId: def.id, locale: 'vi' }
    if (def.paths.en === normalized) return { pageId: def.id, locale: 'en' }
  }
  return null
}

/**
 * Returns the counterpart URL in the target locale for any current pathname.
 * Falls back to the target locale home page if the path is unknown.
 *
 * @param pathname - Current URL pathname.
 * @param targetLocale - Desired locale (`vi` or `en`).
 * @returns Localized counterpart path.
 */
export function getLocalizedCounterpartPath(pathname: string, targetLocale: Locale): string {
  const match = resolvePageFromPath(pathname)
  if (!match) {
    return PAGE_ROUTES.home.paths[targetLocale]
  }
  return PAGE_ROUTES[match.pageId].paths[targetLocale]
}

/**
 * Generates Next.js `Metadata` including canonical URL, `hreflang` alternates (`vi` and `en`),
 * and Open Graph tags for a given page and locale.
 *
 * @param pageId - Canonical page identifier.
 * @param locale - Active page locale (`vi` or `en`).
 * @returns Complete Next.js `Metadata` object.
 */
export function buildPageMetadata(pageId: PageId, locale: Locale): Metadata {
  const def = PAGE_ROUTES[pageId]
  const baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')
  const currentPath = def.paths[locale]
  const viUrl = `${baseUrl}${def.paths.vi}`
  const enUrl = `${baseUrl}${def.paths.en}`

  return {
    title: def.seoTitle[locale],
    description: def.seoDescription[locale],
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: {
        vi: viUrl,
        en: enUrl,
        'x-default': viUrl,
      },
    },
    openGraph: {
      title: def.seoTitle[locale],
      description: def.seoDescription[locale],
      url: `${baseUrl}${currentPath}`,
      siteName: 'M.Group',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
    },
  }
}
