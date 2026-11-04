import { useEffect } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { profile } from '../data/profile.js';
import { resume } from '../data/resume.js';
import Footer from './Footer.jsx';
import styles from './Resume.module.css';

/**
 * The résumé sheet — a paper-like preview of the printed document. Its markup
 * mirrors the template in scripts/generate-resume.mjs, and both render from
 * src/data/resume.js, so the page, the preview and the PDF stay in step.
 */
function Sheet() {
  return (
    <article className={styles.sheet} aria-label={`${resume.name} — résumé`}>
      <header className={styles.sheetHeader}>
        <h2 className={styles.sheetName}>{resume.name}</h2>
        <p className={styles.sheetRole}>{resume.role}</p>
        <p className={styles.sheetContact}>
          <span>{resume.location}</span>
          <span aria-hidden="true"> · </span>
          <a href={`mailto:${resume.email}`}>{resume.email}</a>
          <span aria-hidden="true"> · </span>
          <a href={resume.github.url} target="_blank" rel="noopener noreferrer">
            {resume.github.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </header>

      <section className={styles.sheetSection} aria-label="Professional summary">
        <h3 className={styles.sheetHeading}>Professional summary</h3>
        <p className={styles.sheetText}>{resume.summary}</p>
      </section>

      <section className={styles.sheetSection} aria-label="Education">
        <h3 className={styles.sheetHeading}>Education</h3>
        <div className={styles.sheetEntry}>
          <div className={styles.sheetEntryHead}>
            <h4 className={styles.sheetEntryTitle}>{resume.education.degree}</h4>
            <span className={styles.sheetEntryPeriod}>{resume.education.period}</span>
          </div>
          <p className={styles.sheetEntryOrg}>{resume.education.school}</p>
          <p className={styles.sheetText}>{resume.education.detail}</p>
        </div>
      </section>

      <section className={styles.sheetSection} aria-label="Technical skills">
        <h3 className={styles.sheetHeading}>Technical skills</h3>
        <dl className={styles.sheetSkills}>
          {resume.skills.map((group) => (
            <div key={group.label} className={styles.sheetSkillRow}>
              <dt className={group.note ? styles.sheetSkillLabelNote : styles.sheetSkillLabel}>
                {group.label}
              </dt>
              <dd className={styles.sheetSkillItems}>{group.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.sheetSection} aria-label="Experience and projects">
        <h3 className={styles.sheetHeading}>Experience and projects</h3>

        <div className={styles.sheetEntry}>
          <div className={styles.sheetEntryHead}>
            <h4 className={styles.sheetEntryTitle}>{resume.experience.title}</h4>
            <span className={styles.sheetEntryPeriod}>
              {resume.experience.period} · {resume.experience.mode}
            </span>
          </div>
          <p className={styles.sheetEntryOrg}>{resume.experience.org}</p>
          <p className={styles.sheetText}>{resume.experience.summary}</p>
          <p className={styles.sheetEntryMeta}>{resume.experience.stack.join(' · ')}</p>
        </div>

        {resume.projects.map((project) => (
          <div key={project.name} className={styles.sheetEntry}>
            <div className={styles.sheetEntryHead}>
              <h4 className={styles.sheetEntryTitle}>{project.name}</h4>
              <span className={styles.sheetEntryPeriod}>{project.status}</span>
            </div>
            <p className={styles.sheetEntryMeta}>{project.meta}</p>
            <p className={styles.sheetText}>{project.description}</p>
          </div>
        ))}
      </section>
    </article>
  );
}

export default function Resume() {
  useEffect(() => {
    // Like the case study page: the nav rail belongs to the single-page view.
    document.documentElement.dataset.rail = 'closed';
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = `Résumé — ${profile.name}`;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          // Focus without touching the hash: #main would parse as a route.
          event.preventDefault();
          const main = document.getElementById('main');
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Skip to main content
      </a>

      <header className={styles.bar}>
        <div className={`container ${styles.barInner}`}>
          <a className={styles.back} href="#home">
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
            Back to portfolio
          </a>
          <span className={styles.barMeta}>{profile.name} · Résumé</span>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <article className={`container ${styles.article}`}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>Résumé</p>
            <h1 className={styles.title}>Experience at a glance.</h1>
            <p className={styles.lede}>
              The same content recruiters will read, formatted for applications. Download the PDF
              for emails, portals and printing.
            </p>
            <div className={styles.actions}>
              <a
                className="btn btn-primary"
                href={profile.resumeUrl}
                download="Kylle-Ian-D-Acibron-Resume.pdf"
              >
                <Download size={17} strokeWidth={2} aria-hidden="true" />
                Download PDF
              </a>
            </div>
          </header>

          <div className={styles.sheetWrap}>
            <Sheet />
            <p className={styles.previewNote}>
              This preview matches the PDF exactly — both are generated from the same source, with
              every claim backed by the repositories on the Projects page.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
