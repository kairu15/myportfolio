import { useEffect, useState } from 'react';

const CASE_STUDY_PATTERN = /^#\/case-studies\/([\w-]+)$/;
const RESUME_PATTERN = /^#\/resume\/?$/;

export function readRoute(hash) {
  if (RESUME_PATTERN.exec(hash)) return { view: 'resume', id: null };
  const match = CASE_STUDY_PATTERN.exec(hash);
  return match ? { view: 'caseStudy', id: match[1] } : { view: 'home', id: null };
}

/**
 * The portfolio is a single page, but case studies need their own addressable
 * views. A hash route keeps that possible without a router dependency and
 * without breaking the plain `#section` links used by the navigation rail.
 */
export default function useHashRoute() {
  const [route, setRoute] = useState(() =>
    typeof window === 'undefined' ? { view: 'home', id: null } : readRoute(window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}
