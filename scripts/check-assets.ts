/**
 * Static asset audit script.
 *
 * Fails when source code references images or fonts via remote URLs instead of
 * local assets stored in the repository (`src/assets` or `public/`).
 *
 * Usage: `npm run check:assets`
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

const ROOTS = ['src']
const SCANNED = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.json', '.mdx'])

/** Substrings that make a line exempt. Keep this list short and document every entry. */
const ALLOW: string[] = []

const RULES: { name: string; pattern: RegExp }[] = [
  {
    name: 'Figma asset URL (short-lived)',
    pattern: /figma\.com\/api\/|figma-alpha-api|s3[.-][^/\s'"]*figma/i,
  },
  {
    name: 'remote image URL',
    pattern: /https?:\/\/[^\s'"`)]+\.(?:png|jpe?g|gif|webp|avif|svg|ico|bmp)(?:\?[^\s'"`)]*)?/i,
  },
  {
    name: 'remote font URL',
    pattern: /https?:\/\/[^\s'"`)]+\.(?:woff2?|ttf|otf|eot)(?:\?[^\s'"`)]*)?/i,
  },
  {
    name: 'remote <img>/<source> src',
    pattern: /<(?:img|source)\b[^>]*\b(?:src|srcset|srcSet)=["'{`]*https?:/i,
  },
  { name: 'remote CSS url()', pattern: /url\(\s*["']?https?:/i },
  {
    name: 'remote font/stylesheet link',
    pattern: /fonts\.(?:googleapis|gstatic)\.com|use\.typekit\.net/i,
  },
]

function* walk(path: string): Generator<string> {
  if (!existsSync(path)) return
  if (statSync(path).isFile()) {
    yield path
    return
  }
  for (const entry of readdirSync(path)) {
    yield* walk(join(path, entry))
  }
}

const findings: string[] = []
for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (!SCANNED.has(extname(file))) continue
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, index) => {
        if (ALLOW.some((allowed) => line.includes(allowed))) return
        for (const rule of RULES) {
          if (rule.pattern.test(line)) {
            findings.push(`${file}:${index + 1}  ${rule.name}\n    ${line.trim().slice(0, 160)}`)
          }
        }
      })
  }
}

if (findings.length > 0) {
  console.error(
    `✗ ${findings.length} remote asset reference(s) found — download assets into the repository instead:\n`,
  )
  console.error(findings.join('\n'))
  process.exit(1)
}

console.log('✓ No remote image or font URLs found in src/')
