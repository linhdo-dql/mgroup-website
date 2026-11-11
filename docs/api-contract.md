# API Contract Specification

> **Status:** Frontend & Serverless Route Handler Contract (`src/features/contact/schemas.ts` & `src/app/api/contact/route.ts`).

## 1. General Conventions

* **Base URL:** `NEXT_PUBLIC_API_BASE_URL` (defaults to `/api`).
* **Format:** JSON UTF-8 (`Content-Type: application/json`), `camelCase` keys.
* **Timestamps:** ISO 8601 UTC (`YYYY-MM-DDTHH:mm:ss.sssZ`).
* **Client Timeout:** `NEXT_PUBLIC_API_TIMEOUT_MS` (defaults to `15000ms`).

### Error Envelope (HTTP >= 400)

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Submitted form data failed validation.",
    "fields": {
      "email": "Please enter a valid email address."
    }
  }
}
```

---

## 2. Endpoint: `POST /api/contact`

Submits a consultation or site survey inquiry from Page 9 (`/lien-he` or `/en/contact`).

### Request Body (`ContactRequestPayload`)

| Field | Type | Required | Constraints |
| :--- | :--- | :--- | :--- |
| `fullName` | `string` | Yes | Trimmed, `2..120` chars |
| `organisation` | `string` | Yes | Trimmed, `2..200` chars |
| `position` | `string` | No | Trimmed, max `120` chars |
| `phone` | `string` | Yes | Matches `/^[0-9+\-\s()]{8,20}$/` |
| `email` | `string` | Yes | Valid email format, max `160` chars |
| `topic` | `enum` | Yes | `'communes-wards' \| 'airports' \| 'banks' \| 'ocr' \| 'other'` |
| `message` | `string` | No | Trimmed, max `2000` chars |
| `consent` | `boolean` | Yes | Must be `true` |
| `website` | `string` | No | Honeypot anti-bot field. If non-empty, server returns `201` silently without forwarding. |

### Success Response (`201 Created`)

```json
{
  "id": "inq_m8x9k2p",
  "receivedAt": "2026-11-11T10:30:00.000Z",
  "status": "received"
}
```

### Mock & Testing Query Parameters

When `NEXT_PUBLIC_ENABLE_MOCKS=true`:
* `?mock_delay=<ms>`: Delays the API response by `<ms>` milliseconds to inspect loading states.
* `?mock_error=contact` (or `all`): Forces a `500 INTERNAL_ERROR` response to verify error state recovery.
