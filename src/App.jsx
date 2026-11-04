import { useEffect } from 'react';
import useAppearance from './hooks/useAppearance.js';
import useHashRoute from './hooks/useHashRoute.js';
import { caseStudies } from './data/caseStudies.js';
import Background from './components/Background.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Activity from './components/Activity.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CaseStudy from './components/CaseStudy.jsx';

export default function App() {
  const appearance = useAppearance();
  const route = useHashRoute();
  const study =
    route.view === 'caseStudy' ? caseStudies.find((item) => item.id === route.id) : null;

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
      {/* The case study view renders its own skip link: a plain #main anchor
          would be read as a hash route and navigate back to the home page. */}
      {study ? null : (
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
      )}
      <Background appearance={appearance} />
      {study ? (
        <CaseStudy study={study} />
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
    </>
  );
}
