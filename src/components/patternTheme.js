/**
 * Shared ink colours for every PatternWaves surface on the site, so the hero
 * and the page backdrop can never drift apart.
 */
export const PATTERN_INKS = {
  indigo: { dark: '#a5b4fc', light: '#4f46e5' },
  teal: { dark: '#5eead4', light: '#0f766e' },
  clay: { dark: '#fbbf24', light: '#b45309' },
};

/** Resolves the pattern ink for the current theme + accent. */
export function getPatternInk(appearance) {
  const palette = PATTERN_INKS[appearance?.accent] ?? PATTERN_INKS.indigo;
  return (appearance?.theme ?? 'light') === 'dark' ? palette.dark : palette.light;
}
