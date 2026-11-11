/**
 * Unified HTTP API client with Zod contract validation and structured error classification.
 *
 * Implements the API contract rules from `/figma-web-build`:
 * - Enforces request timeout via `AbortController`.
 * - Detects non-JSON HTML fallback responses (`not_json`).
 * - Parses standard error envelopes (`400`, `422` field validation errors, `429`, `5xx`).
 * - Validates every 2xx response against its Zod schema (`contract` error on mismatch).
 */
import type { z } from 'zod'

import { env } from '@/config/env'

export type ApiErrorKind = 'network' | 'timeout' | 'http' | 'contract' | 'not_json'

export interface ApiErrorEnvelope {
  error: {
    code: string
    message: string
    fields?: Record<string, string>
  }
}

/**
 * Structured error thrown by `apiRequest` for any network, protocol, or schema failure.
 */
export class ApiError extends Error {
  public readonly kind: ApiErrorKind
  public readonly status?: number
  public readonly code?: string
  public readonly fields?: Record<string, string>

  constructor(params: {
    kind: ApiErrorKind
    message: string
    status?: number
    code?: string
    fields?: Record<string, string>
  }) {
    super(params.message)
    this.name = 'ApiError'
    this.kind = params.kind
    this.status = params.status
    this.code = params.code
    this.fields = params.fields
  }
}

export interface ApiRequestOptions<TResponse> {
  /** Endpoint path relative to `NEXT_PUBLIC_API_BASE_URL` (e.g. `/contact`). */
  path: string
  /** HTTP method. */
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  /** Optional JSON-serializable body payload. */
  body?: unknown
  /** Zod schema used to validate the 2xx response payload. */
  responseSchema: z.ZodType<TResponse>
  /** Optional custom timeout in milliseconds. */
  timeoutMs?: number
}

/**
 * Appends active `?mock_delay` and `?mock_error` browser query parameters to the API URL
 * when mock mode is enabled, allowing E2E and manual testing of loading and error states.
 *
 * @param baseUrl - Target endpoint URL string.
 * @returns URL string with mock parameters appended if applicable.
 */
function appendMockParamsIfEnabled(baseUrl: string): string {
  if (!env.NEXT_PUBLIC_ENABLE_MOCKS || typeof window === 'undefined') {
    return baseUrl
  }
  const pageParams = new URLSearchParams(window.location.search)
  const mockDelay = pageParams.get('mock_delay')
  const mockError = pageParams.get('mock_error')

  if (!mockDelay && !mockError) return baseUrl

  const separator = baseUrl.includes('?') ? '&' : '?'
  const extra = new URLSearchParams()
  if (mockDelay) extra.set('mock_delay', mockDelay)
  if (mockError) extra.set('mock_error', mockError)
  return `${baseUrl}${separator}${extra.toString()}`
}

/**
 * Executes a typed HTTP request and validates the response against `responseSchema`.
 *
 * @param options - Request configuration and Zod response schema.
 * @returns Validated response data of type `TResponse`.
 */
export async function apiRequest<TResponse>({
  path,
  method = 'GET',
  body,
  responseSchema,
  timeoutMs = env.NEXT_PUBLIC_API_TIMEOUT_MS,
}: ApiRequestOptions<TResponse>): Promise<TResponse> {
  const base = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/+$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = appendMockParamsIfEnabled(`${base}${normalizedPath}`)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  let response: Response
  try {
    response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })
  } catch (error) {
    clearTimeout(timer)
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError({
        kind: 'timeout',
        message: 'Request timed out. Please check your connection and try again.',
      })
    }
    throw new ApiError({
      kind: 'network',
      message: 'Network error occurred while communicating with the server.',
    })
  } finally {
    clearTimeout(timer)
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new ApiError({
      kind: 'not_json',
      status: response.status,
      message: `Expected JSON response from ${normalizedPath}, but received ${contentType || 'unknown content-type'}.`,
    })
  }

  const rawData: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const envelope = rawData as Partial<ApiErrorEnvelope> | null
    const errObj = envelope?.error
    throw new ApiError({
      kind: 'http',
      status: response.status,
      code: errObj?.code ?? `HTTP_${response.status}`,
      message: errObj?.message ?? `Request failed with status ${response.status}.`,
      fields: errObj?.fields,
    })
  }

  const parsed = responseSchema.safeParse(rawData)
  if (!parsed.success) {
    throw new ApiError({
      kind: 'contract',
      status: response.status,
      message: `Response from ${normalizedPath} violated the expected schema contract.`,
    })
  }

  return parsed.data
}
