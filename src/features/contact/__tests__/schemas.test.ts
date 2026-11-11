/**
 * Unit tests for Contact Inquiry Zod schemas.
 */
import { describe, expect, it } from 'vitest'

import { createContactRequestSchema } from '../schemas'

describe('Contact Request Schema', () => {
  const schema = createContactRequestSchema('vi')

  it('accepts a valid consultation request payload', () => {
    const valid = {
      fullName: 'Nguyen Van A',
      organisation: 'UBND Phuong X',
      position: 'Chuyen vien',
      phone: '0989 51 66 85',
      email: 'contact@example.vn',
      topic: 'communes-wards' as const,
      message: 'Can tu van he thong camera giam sat trat tu do thi.',
      consent: true as const,
      website: '',
    }

    const parsed = schema.safeParse(valid)
    expect(parsed.success).toBe(true)
  })

  it('rejects payload when required fields or consent are invalid', () => {
    const invalid = {
      fullName: 'A',
      organisation: '',
      phone: 'abc',
      email: 'not-an-email',
      topic: 'airports',
      consent: false,
    }

    const parsed = schema.safeParse(invalid)
    expect(parsed.success).toBe(false)
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      expect(fieldErrors.fullName).toBeDefined()
      expect(fieldErrors.organisation).toBeDefined()
      expect(fieldErrors.phone).toBeDefined()
      expect(fieldErrors.email).toBeDefined()
      expect(fieldErrors.consent).toBeDefined()
    }
  })
})
