import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEYS = {
  theme: 'theme',
  accent: 'accent',
  backdrop: 'backdrop',
};

const ACCENTS = ['indigo', 'teal', 'clay'];
const BACKDROPS = ['waves', 'slats', 'dots', 'plain'];

function store(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage blocked (private mode): keep the choice for this session only */
  }
}

/** Backdrop from the document (set pre-paint in index.html), migrating the old key. */
function readBackdrop() {
  const fromDom = document.documentElement.dataset.backdrop;
  if (BACKDROPS.includes(fromDom)) return fromDom;
  try {
    if (localStorage.getItem('background') === 'dots') return 'dots';
  } catch {
    /* ignore */
  }
  return 'waves';
}

/**
 * Theme, accent colour and page backdrop. Initial values come from the inline
 * script in index.html, which reads localStorage before first paint.
 */
export default function useAppearance() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const [accent, setAccent] = useState(() => document.documentElement.dataset.accent || 'indigo');
  const [backdrop, setBackdrop] = useState(readBackdrop);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    store(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    store(STORAGE_KEYS.accent, accent);
  }, [accent]);

  useEffect(() => {
    document.documentElement.dataset.backdrop = backdrop;
    store(STORAGE_KEYS.backdrop, backdrop);
  }, [backdrop]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const chooseAccent = useCallback((next) => {
    if (ACCENTS.includes(next)) setAccent(next);
  }, []);

  const chooseBackdrop = useCallback((next) => {
    if (BACKDROPS.includes(next)) setBackdrop(next);
  }, []);

  return {
    theme,
    accent,
    backdrop,
    setTheme,
    toggleTheme,
    setAccent: chooseAccent,
    setBackdrop: chooseBackdrop,
    accents: ACCENTS,
    backdrops: BACKDROPS,
  };
}
