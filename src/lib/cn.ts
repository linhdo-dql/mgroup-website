/**
 * Class name merging utility configured with custom design token groups.
 *
 * Prevents `tailwind-merge` from stripping custom font-size tokens (e.g. `text-h1`)
 * when combined with custom semantic color tokens (e.g. `text-text-primary`).
 */
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

import { RADIUS_TOKENS, TYPOGRAPHY_TOKENS } from './design-tokens'

const customFontSizeClasses = Object.keys(TYPOGRAPHY_TOKENS)
const customRadiusClasses = Object.keys(RADIUS_TOKENS)

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: customFontSizeClasses }],
      rounded: [{ rounded: customRadiusClasses }],
      'border-w': ['border-hairline'],
    },
  },
})

/**
 * Merges conditional class names and resolves Tailwind CSS conflicts safely.
 *
 * @param inputs - Class values, arrays, or conditional objects.
 * @returns Merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
