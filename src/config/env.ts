/**
 * Validated runtime environment configuration.
 *
 * Parses `NEXT_PUBLIC_*` environment variables with Zod so invalid configuration
 * fails early with a descriptive error message.
 */
import { z } from 'zod'

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_BASE_URL: z.string().min(1).default('/api'),
  NEXT_PUBLIC_API_TIMEOUT_MS: z.coerce.number().int().positive().default(15000),
  NEXT_PUBLIC_ENABLE_MOCKS: z
    .enum(['true', 'false'])
    .default('false')
    .transform((val) => val === 'true'),
})

export type PublicEnv = z.infer<typeof publicEnvSchema>

/**
 * Parses and returns validated public environment configuration.
 *
 * @returns Validated public environment object.
 */
function parsePublicEnv(): PublicEnv {
  const parsed = publicEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_TIMEOUT_MS: process.env.NEXT_PUBLIC_API_TIMEOUT_MS,
    NEXT_PUBLIC_ENABLE_MOCKS: process.env.NEXT_PUBLIC_ENABLE_MOCKS,
  })

  if (!parsed.success) {
    const formatted = JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)
    throw new Error(`Invalid public environment variables:\n${formatted}`)
  }

  return parsed.data
}

export const env: PublicEnv = parsePublicEnv()
