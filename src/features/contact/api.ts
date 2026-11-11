/**
 * Contact feature API service.
 *
 * Communicates with `POST /api/contact` using the unified `apiRequest` client
 * and validates the response against `contactResponseSchema`.
 */
import { apiRequest } from '@/lib/api-client'

import {
  type ContactRequestPayload,
  type ContactResponsePayload,
  contactResponseSchema,
} from './schemas'

/**
 * Submits a consultation inquiry from the Contact page.
 *
 * @param payload - Validated contact form payload.
 * @returns Server acknowledgment containing inquiry ID and timestamp.
 */
export async function submitContactInquiry(
  payload: ContactRequestPayload,
): Promise<ContactResponsePayload> {
  return apiRequest({
    path: '/contact',
    method: 'POST',
    body: payload,
    responseSchema: contactResponseSchema,
  })
}
