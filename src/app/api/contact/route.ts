/**
 * Serverless API Route Handler for `POST /api/contact`.
 *
 * Implements the `/figma-web-build` API contract without requiring a standalone backend server:
 * - Supports `?mock_delay=<ms>` and `?mock_error=contact|all` when mock mode is enabled.
 * - Validates incoming payloads against `contactRequestSchema`.
 * - Returns `422` with standard error envelope (`VALIDATION_FAILED`) on invalid fields.
 * - Silently accepts honeypot-triggered bot requests (`201`) without forwarding.
 * - Forwards legitimate inquiries to `CONTACT_WEBHOOK_URL` when configured.
 */
import { type NextRequest, NextResponse } from 'next/server'

import { env } from '@/config/env'
import { contactRequestSchema } from '@/features/contact/schemas'

/**
 * Handles `POST /api/contact` consultation requests.
 *
 * @param request - Incoming Next.js request object.
 * @returns JSON response with status `201`, `400`, `422`, or `500`.
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // Support simulated latency and error branches in mock/dev environments
  if (env.NEXT_PUBLIC_ENABLE_MOCKS) {
    const delayParam = Number(searchParams.get('mock_delay') ?? '180')
    if (Number.isFinite(delayParam) && delayParam > 0) {
      await new Promise((resolve) => setTimeout(resolve, Math.min(delayParam, 10000)))
    }

    const mockError = searchParams.get('mock_error')
    if (mockError === 'all' || mockError === 'contact') {
      return NextResponse.json(
        {
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Simulated server error for testing error recovery.',
          },
        },
        { status: 500 },
      )
    }
  }

  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json(
      {
        error: {
          code: 'INVALID_JSON',
          message: 'Request body must be valid JSON.',
        },
      },
      { status: 400 },
    )
  }

  const parsed = contactRequestSchema.safeParse(rawBody)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    const flattened = parsed.error.flatten().fieldErrors
    for (const [key, messages] of Object.entries(flattened)) {
      if (messages && messages.length > 0 && messages[0]) {
        fieldErrors[key] = messages[0]
      }
    }

    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Submitted form data failed validation.',
          fields: fieldErrors,
        },
      },
      { status: 422 },
    )
  }

  const data = parsed.data
  const responsePayload = {
    id: `inq_${Date.now().toString(36)}`,
    receivedAt: new Date().toISOString(),
    status: 'received' as const,
  }

  // Honeypot triggered: return 201 as normal to fool bots, but discard the record
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json(responsePayload, { status: 201 })
  }

  // Optional webhook forwarding (Google Sheets Apps Script / Slack / Telegram / CRM)
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: responsePayload.id,
          receivedAt: responsePayload.receivedAt,
          fullName: data.fullName,
          organisation: data.organisation,
          position: data.position || null,
          phone: data.phone,
          email: data.email,
          topic: data.topic,
          message: data.message || null,
        }),
      })
    } catch {
      return NextResponse.json(
        {
          error: {
            code: 'UPSTREAM_DELIVERY_FAILED',
            message: 'Unable to deliver inquiry to notification webhook.',
          },
        },
        { status: 502 },
      )
    }
  }

  return NextResponse.json(responsePayload, { status: 201 })
}
