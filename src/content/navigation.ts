/**
 * Shared navigation, header, and footer localized content (Part C of M.Group specification).
 *
 * Contains user-facing Vietnamese and English strings for global navigation menus,
 * company legal details, VNU-TIP incubation positioning, and footer links.
 */
import { type Locale, PAGE_ROUTES, type PageId } from '@/i18n/routes'

export interface NavItem {
  label: string
  pageId?: PageId
  children?: { label: string; pageId: PageId; description?: string }[]
}

export interface SiteChromeContent {
  brandName: string
  brandTagline: string
  ctaLabel: string
  skipToMainLabel: string
  openMenuLabel: string
  closeMenuLabel: string
  languageLabel: string
  navItems: NavItem[]
  footer: {
    legalName: string
    vnuBadge: string
    positioning: string
    registrationInfo: string
    addressLabel: string
    addressValue: string
    phoneLabel: string
    phoneValue: string
    emailLabel: string
    emailValue: string
    quickLinksTitle: string
    quickLinks: { label: string; pageId: PageId }[]
    contactTitle: string
    copyright: string
  }
}

export const SITE_CHROME_CONTENT: Record<Locale, SiteChromeContent> = {
  vi: {
    brandName: 'M.GROUP',
    brandTagline: 'Member of VNU-TIP',
    ctaLabel: 'Liên hệ tư vấn',
    skipToMainLabel: 'Chuyển tới nội dung chính',
    openMenuLabel: 'Mở menu điều hướng',
    closeMenuLabel: 'Đóng menu điều hướng',
    languageLabel: 'Ngôn ngữ',
    navItems: [
      { label: 'Trang chủ', pageId: 'home' },
      { label: 'Về chúng tôi', pageId: 'about' },
      {
        label: 'Sản phẩm',
        children: [
          {
            label: 'COGI AI Vision',
            pageId: 'platform',
            description: 'Nền tảng phân tích video bằng AI chạy tại chỗ',
          },
          {
            label: 'COGI AI Vision OCR',
            pageId: 'ocr',
            description: 'Số hóa và trích xuất tài liệu tiếng Việt có cấu trúc',
          },
        ],
      },
      {
        label: 'Giải pháp',
        children: [
          {
            label: 'Xã/Phường',
            pageId: 'solution-communes-wards',
            description: 'Giám sát trật tự đô thị, môi trường và an ninh địa bàn',
          },
          {
            label: 'Sân bay',
            pageId: 'solution-airports',
            description: 'Đo mật độ và cảnh báo quá tải luồng hành khách',
          },
          {
            label: 'Ngân hàng',
            pageId: 'solution-banks',
            description: 'Giám sát quầy giao dịch, kho quỹ và khu vực hạn chế',
          },
          {
            label: 'Giải pháp khác',
            pageId: 'solution-other',
            description: 'Tùy biến theo bài toán và quy trình riêng của đơn vị',
          },
        ],
      },
      { label: 'Đội ngũ', pageId: 'team' },
      { label: 'Liên hệ', pageId: 'contact' },
    ],
    footer: {
      legalName: 'CÔNG TY CỔ PHẦN M.GROUP',
      vnuBadge: 'M.Group – Member of VNU-TIP',
      positioning:
        'Start-up được ươm tạo của Công viên Công nghệ cao và Đổi mới sáng tạo, Đại học Quốc gia Hà Nội (VNU-TIP).',
      registrationInfo:
        'Giấy chứng nhận đăng ký doanh nghiệp số 0111688656 do Phòng Đăng ký kinh doanh và Tài chính doanh nghiệp – Sở Tài chính TP. Hà Nội cấp lần đầu ngày 04/11/2026.',
      addressLabel: 'Trụ sở',
      addressValue:
        'P.503, tòa nhà HT1, Công viên Công nghệ cao và Đổi mới sáng tạo, ĐHQGHN, Khu đô thị ĐHQGHN tại Hòa Lạc, xã Hòa Lạc, TP. Hà Nội',
      phoneLabel: 'Điện thoại',
      phoneValue: '0989 51 66 85',
      emailLabel: 'Email',
      emailValue: '(chờ chốt email theo tên miền)',
      quickLinksTitle: 'Liên kết nhanh',
      quickLinks: [
        { label: 'Về chúng tôi', pageId: 'about' },
        { label: 'COGI AI Vision', pageId: 'platform' },
        { label: 'COGI AI Vision OCR', pageId: 'ocr' },
        { label: 'Giải pháp Xã/Phường', pageId: 'solution-communes-wards' },
        { label: 'Đội ngũ', pageId: 'team' },
        { label: 'Liên hệ', pageId: 'contact' },
      ],
      contactTitle: 'Liên hệ',
      copyright: '© 2026 Công ty Cổ phần M.Group.',
    },
  },
  en: {
    brandName: 'M.GROUP',
    brandTagline: 'Member of VNU-TIP',
    ctaLabel: 'Contact us',
    skipToMainLabel: 'Skip to main content',
    openMenuLabel: 'Open navigation menu',
    closeMenuLabel: 'Close navigation menu',
    languageLabel: 'Language',
    navItems: [
      { label: 'Home', pageId: 'home' },
      { label: 'About us', pageId: 'about' },
      {
        label: 'Products',
        children: [
          {
            label: 'COGI AI Vision',
            pageId: 'platform',
            description: 'On-premise AI video analytics platform',
          },
          {
            label: 'COGI AI Vision OCR',
            pageId: 'ocr',
            description: 'Structured Vietnamese document extraction',
          },
        ],
      },
      {
        label: 'Solutions',
        children: [
          {
            label: 'Communes & Wards',
            pageId: 'solution-communes-wards',
            description: 'Urban order, sanitation, and local security monitoring',
          },
          {
            label: 'Airports',
            pageId: 'solution-airports',
            description: 'Anonymous passenger density and queue alerts',
          },
          {
            label: 'Banking',
            pageId: 'solution-banks',
            description: 'Branch counter service time and vault monitoring',
          },
          {
            label: 'Custom solutions',
            pageId: 'solution-other',
            description: 'Built around your organisation’s operating procedures',
          },
        ],
      },
      { label: 'Our team', pageId: 'team' },
      { label: 'Contact', pageId: 'contact' },
    ],
    footer: {
      legalName: 'M.GROUP JOINT STOCK COMPANY',
      vnuBadge: 'M.Group – Member of VNU-TIP',
      positioning:
        'A start-up incubated by VNU Technology and Innovation Park, Vietnam National University, Hanoi (VNU-TIP).',
      registrationInfo:
        'Enterprise Registration Certificate No. 0111688656 issued by the Business Registration and Corporate Finance Division – Hanoi Department of Finance on 04 November 2026.',
      addressLabel: 'Registered office',
      addressValue:
        'Room 503, Building HT1, VNU Technology and Innovation Park, VNU Urban Area at Hoa Lac, Hoa Lac Commune, Hanoi, Vietnam',
      phoneLabel: 'Phone',
      phoneValue: '+84 989 51 66 85',
      emailLabel: 'Email',
      emailValue: '(pending domain confirmation)',
      quickLinksTitle: 'Quick links',
      quickLinks: [
        { label: 'About us', pageId: 'about' },
        { label: 'COGI AI Vision', pageId: 'platform' },
        { label: 'COGI AI Vision OCR', pageId: 'ocr' },
        { label: 'Communes & Wards', pageId: 'solution-communes-wards' },
        { label: 'Our team', pageId: 'team' },
        { label: 'Contact', pageId: 'contact' },
      ],
      contactTitle: 'Contact',
      copyright: '© 2026 M.Group Joint Stock Company.',
    },
  },
}

/**
 * Helper to resolve the href of a `PageId` for a given `Locale`.
 *
 * @param pageId - Target page ID.
 * @param locale - Active locale.
 * @returns Path string.
 */
export function getPageHref(pageId: PageId, locale: Locale): string {
  return PAGE_ROUTES[pageId].paths[locale]
}
