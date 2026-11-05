import { Suspense, lazy, useEffect } from 'react';
import useAppearance from './hooks/useAppearance.js';
import useHashRoute from './hooks/useHashRoute.js';
import { caseStudies } from './data/caseStudies.js';
import ViewBoundary from './components/ViewBoundary.jsx';
import { CaseStudySkeleton, ResumeSkeleton } from './components/ViewSkeletons.jsx';
import Background from './components/Background.jsx';import Nav from './components/Nav.jsx'
;
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Activity from './components/Activity.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';

// The case-study and résumé views are clicked into, not landed on. Splitting
// them out keeps them off the initial bundle and gives their navigation a real
// loading boundary — <Suspense> shows their layout skeleton while the chunk
// streams in, with no artificial delay.
const CaseStudyView = lazy(() => import('./components/CaseStudy.jsx'));
const ResumeView = lazy(() => import('./components/Resume.jsx'));

export default function App() {
  const appearance = useAppearance();
  const route = useHashRoute();
  const study =
    route.view === 'caseStudy' ? caseStudies.find((item) => item.id === route.id) : null;
  const isSubview = Boolean(study) || route.view === 'resume';

  // Coming back from a case study to a section link (#projects) cannot rely on
  // the browser: the section does not exist while the case study is rendered.
  useEffect(() => {
    if (route.view !== 'home') return undefined;
    const id = window.location.hash.replace('#', '');
    if (!id || id.startsWith('/')) return undefined;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [route.view]);

  return (
    <>
      {/* The case study and résumé views render their own skip link: a plain
          #main anchor would be read as a hash route and navigate back to the
          home page. */}
      {isSubview ? null : (
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
      )}
      <Background appearance={appearance} />

      {study ? (
        <ViewBoundary key={`study-${route.id}`}>
          <Suspense fallback={<CaseStudySkeleton />}>
            <CaseStudyView study={study} />
          </Suspense>
        </ViewBoundary>
      ) : route.view === 'resume' ? (
        <ViewBoundary key="resume">
          <Suspense fallback={<ResumeSkeleton />}>
            <ResumeView />
          </Suspense>
        </ViewBoundary>
      ) : (
        <>
          <Nav appearance={appearance} />
          <main id="main">
            <Hero />
            <About />
            <Projects />
            <Activity />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </>
      )}

      {/* Lives outside the view switch: music keeps playing while a case study
          or the résumé page is open, in the corner of every view. */}
      <MusicPlayer />
    </>
  );
}
