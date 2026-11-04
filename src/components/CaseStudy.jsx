import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { caseStudies } from '../data/caseStudies.js';
import { profile } from '../data/profile.js';
import Footer from './Footer.jsx';
import styles from './CaseStudy.module.css';

function Bullets({ items }) {
  return (
    <ul className={styles.bullets}>
      {items.map((item, index) => (
        <li key={index}>
          {typeof item === 'string' ? (
            item
          ) : (
            <>
              <strong>{item.title}</strong> {item.text}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ number, title }) {
  return (
    <h2 className={styles.sectionTitle}>
      <span className={styles.sectionNumber} aria-hidden="true">
        {number}
      </span>
      {title}
    </h2>
  );
}

export default function CaseStudy({ study }) {
  useEffect(() => {
    // The nav rail belongs to the single-page view; drop its offset while the
    // case study page is mounted.
    document.documentElement.dataset.rail = 'closed';
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = `${study.title} — Case study · ${profile.name}`;
    return () => {
      document.title = previousTitle;
    };
  }, [study]);

  const index = caseStudies.findIndex((item) => item.id === study.id);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const galleryNumber = String(study.sections.length + 1).padStart(2, '0');
  const linksNumber = String(study.sections.length + 2).padStart(2, '0');

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
          <a className={styles.back} href="#projects">
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
            All projects
          </a>
          <span className={styles.barMeta}>{profile.name} · Case study</span>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <article className={`container ${styles.article}`}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowNumber} aria-hidden="true">
                {study.number}
              </span>
              Case study · {study.year}
            </p>
            <h1 className={styles.title}>{study.title}</h1>
            <p className={styles.lede}>{study.subtitle}</p>
            <div className={styles.heroMeta}>
              <span className={styles.pill}>{study.status}</span>
              <span className={styles.pill}>{study.year}</span>
            </div>
          </header>

          <div className={styles.layout}>
            <div className={styles.content}>
              {study.sections.map((section, sectionIndex) => (
                <section key={section.id} id={section.id} className={styles.section}>
                  <SectionHeading
                    number={String(sectionIndex + 1).padStart(2, '0')}
                    title={section.title}
                  />

                  {section.paragraphs ? (
                    <div className={styles.prose}>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? <Bullets items={section.bullets} /> : null}

                  {section.groups ? (
                    <dl className={styles.techGroups}>
                      {section.groups.map((group) => (
                        <div key={group.label} className={styles.techGroup}>
                          <dt>{group.label}</dt>
                          <dd>{group.items.join(' · ')}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </section>
              ))}

              <section id="gallery" className={styles.section}>
                <SectionHeading number={galleryNumber} title="Project gallery" />
                {study.gallery.length > 0 ? (
                  <ul className={styles.gallery}>
                    {study.gallery.map((image) => (
                      <li key={image.src}>
                        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.galleryNote}>{study.galleryNote}</p>
                )}
              </section>

              <section id="links" className={styles.section}>
                <SectionHeading number={linksNumber} title="Repository and live demo" />
                <div className={styles.linkRow}>
                  <a
                    className="btn btn-secondary"
                    href={study.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon size={17} />
                    Repository
                    <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  {study.demo ? (
                    <a className="btn btn-primary" href={study.demo} target="_blank" rel="noopener noreferrer">
                      Live demo
                      <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className={styles.noDemo}>
                      No public live demo — the repository is the published artefact.
                    </span>
                  )}
                </div>
              </section>
            </div>

            <aside className={styles.aside} aria-label="Case study summary">
              <div className={styles.asideCard}>
                <h2 className={styles.asideTitle}>At a glance</h2>
                <dl className={styles.facts}>
                  <div>
                    <dt>Year</dt>
                    <dd>{study.year}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{study.status}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>{study.role}</dd>
                  </div>
                </dl>
                <a
                  className={styles.asideLink}
                  href={study.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={16} />
                  View repository
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </aside>
          </div>

          <nav className={styles.pager} aria-label="Case studies">
            <a className={styles.pagerBack} href="#projects">
              <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
              Back to projects
            </a>
            <a className={styles.pagerNext} href={`#/case-studies/${next.id}`}>
              <span>
                <span className={styles.pagerLabel}>Next case study</span>
                {next.title}
              </span>
              <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
            </a>
          </nav>
        </article>
      </main>

      <Footer />
    </>
  );
}
