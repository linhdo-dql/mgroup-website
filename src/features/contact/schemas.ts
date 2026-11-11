/**
 * Zod schemas and TypeScript types for the Contact / Consultation Inquiry feature (Page 9 Block 3).
 *
 * Serves as the single source of truth for both client-side form validation
 * and server-side API route validation.
 */
import { z } from 'zod'

import type { Locale } from '@/i18n/routes'

export const INTEREST_TOPICS = ['communes-wards', 'airports', 'banks', 'ocr', 'other'] as const

export type InterestTopic = (typeof INTEREST_TOPICS)[number]

export const INTEREST_TOPIC_LABELS: Record<Locale, Record<InterestTopic, string>> = {
  vi: {
    'communes-wards': 'Xã/Phường',
    airports: 'Sân bay',
    banks: 'Ngân hàng',
    ocr: 'OCR – Số hóa tài liệu',
    other: 'Khác',
  },
  en: {
    'communes-wards': 'Communes & Wards',
    airports: 'Airports',
    banks: 'Banking',
    ocr: 'OCR – Document digitisation',
    other: 'Other',
  },
}

/**
 * Creates a localized Zod validation schema for the Contact inquiry form.
 *
 * @param locale - Active locale (`vi` or `en`) for validation messages.
 * @returns Zod object schema for contact form submission.
 */
export function createContactRequestSchema(locale: Locale = 'vi') {
  const isVi = locale === 'vi'
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, isVi ? 'Vui lòng nhập họ và tên.' : 'Please enter your full name.')
      .max(120),
    organisation: z
      .string()
      .trim()
      .min(2, isVi ? 'Vui lòng nhập tên cơ quan / đơn vị.' : 'Please enter your organisation.')
      .max(200),
    position: z.string().trim().max(120).optional().or(z.literal('')),
    phone: z
      .string()
      .trim()
      .regex(
        /^[0-9+\-\s()]{8,20}$/,
        isVi ? 'Số điện thoại không hợp lệ.' : 'Please enter a valid phone number.',
      ),
    email: z
      .string()
      .trim()
      .email(isVi ? 'Địa chỉ email không hợp lệ.' : 'Please enter a valid email address.')
      .max(160),
    topic: z.enum(INTEREST_TOPICS, {
      errorMap: () => ({
        message: isVi ? 'Vui lòng chọn lĩnh vực quan tâm.' : 'Please select an area of interest.',
      }),
    }),
    message: z.string().trim().max(2000).optional().or(z.literal('')),
    consent: z.literal(true, {
      errorMap: () => ({
        message: isVi
          ? 'Vui lòng đồng ý để M.Group liên hệ tư vấn.'
          : 'Please agree to let M.Group contact you regarding your enquiry.',
      }),
    }),
    /** Hidden honeypot field to trap automated spam bots. */
    website: z.string().max(200).optional().or(z.literal('')),
  })
}

export const contactRequestSchema = createContactRequestSchema('vi')

export type ContactRequestPayload = z.infer<typeof contactRequestSchema>

export const contactResponseSchema = z.object({
  id: z.string(),
  receivedAt: z.string().datetime(),
  status: z.literal('received'),
})

export type ContactResponsePayload = z.infer<typeof contactResponseSchema>
