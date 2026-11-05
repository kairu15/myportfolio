import { useCallback, useEffect, useState } from 'react';

const TOUR_KEY = 'tour-status';

// One step per portfolio section, ordered as a story: who I am, then what I
// know, what I've built, where I've worked, where the code lives and how to
// reach me. The selectors are the same section ids the navigation rail links
// to, so every highlight target is guaranteed to exist on the home view.
export const TOUR_STEPS = [
  {
    selector: '#home figure',
    title: 'Hello — this is me',
    body: "I'm Kylle, an aspiring web developer from Bayawan City. This corner of the web keeps everything I build and learn.",
  },
  {
    selector: '#about',
    title: 'A little more about me',
    body: 'Information Technology student at NORSU-BSC, interning as a developer — plus the dogs and cats that keep watch while I build.',
  },
  {
    selector: '#skills',
    title: 'The toolbox',
    body: 'PHP, Laravel, Django, Python, React, JavaScript and MySQL — every skill links straight to the project where I used it.',
  },
  {
    selector: '#projects',
    title: "Things I've built",
    body: 'Featured work with case studies, tech stacks and links to the source repositories. Filter by category while you browse.',
  },
  {
    selector: '#experience',
    title: 'Experience & education',
    body: 'My internship contributing to university web systems, and the degree behind it all — where theory meets practice.',
  },
  {
    selector: '#activity',
    title: 'Public work, straight from GitHub',
    body: 'Repositories and contribution activity, pulled from my GitHub profile. Everything public is linked, so you can read the code yourself.',
  },
  {
    selector: '#contact',
    title: 'Say hello',
    body: "Email, socials and my résumé live here. If something in this portfolio interests you, I'd love to hear about it.",
  },
];

function readStatus() {
  try {
    const value = localStorage.getItem(TOUR_KEY);
    return value === 'completed' || value === 'skipped' ? value : null;
  } catch {
    /* storage blocked (private mode) — treat as a first visit every time */
    return null;
  }
}

function storeStatus(value) {
  try {
    localStorage.setItem(TOUR_KEY, value);
  } catch {
    /* storage blocked — the welcome simply reappears next visit */
  }
}

/**
 * Guided-tour state machine. First-time visitors get a welcome overlay
 (gated to the home view); finishing or dismissing it — and every later
 replay started from the nav rail or the footer — records a status in
 localStorage so the automatic welcome only ever shows once.
 */
export default function useTour(enabled) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'welcome' | 'active'
  const [step, setStep] = useState(0);

  // First visit: greet once the page has painted. The delay also lets the
  // boot loader's terminal finish (see index.html) so the two never overlap.
  useEffect(() => {
    if (!enabled || readStatus()) return undefined;
    const timer = setTimeout(() => setPhase('welcome'), 1400);
    return () => clearTimeout(timer);
  }, [enabled]);

  // Leaving the home view (case study, résumé) cancels any open tour.
  useEffect(() => {
    if (!enabled) setPhase('idle');
  }, [enabled]);

  const start = useCallback(() => {
    setStep(0);
    setPhase('active');
  }, []);

  const next = useCallback(() => {
    setStep((current) => Math.min(current + 1, TOUR_STEPS.length - 1));
  }, []);

  const prev = useCallback(() => {
    setStep((current) => Math.max(current - 1, 0));
  }, []);

  const finish = useCallback(() => {
    storeStatus('completed');
    setPhase('idle');
  }, []);

  const skip = useCallback(() => {
    storeStatus('skipped');
    setPhase('idle');
  }, []);

  const dismissWelcome = useCallback(() => {
    storeStatus('skipped');
    setPhase('idle');
  }, []);

  return { phase, step, total: TOUR_STEPS.length, start, next, prev, finish, skip, dismissWelcome };
}
