import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { projectFilters, projects, earlierRepos } from '../data/projects.js';
import { caseStudyIds } from '../data/caseStudies.js';
import Section from './Section.jsx';
import styles from './Projects.module.css';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const visible =
    filter === 'All' ? projects : projects.filter((project) => project.categories.includes(filter));

  return (
    <Section
      id="projects"
      index="02"
      label="Projects"
      title="Things I've built"
      description="Each card links to the repository it came from. The details are written from those repositories, not from a pitch deck."
    >
      <div className={styles.filters} role="group" aria-label="Filter projects by category">
        {projectFilters.map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.chip} ${filter === option ? styles.chipActive : ''}`}
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
          >
            {option}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty} role="status">
          Nothing in this category yet.
        </p>
      ) : (
        <ul className={styles.grid}>
          {visible.map((project) => (
            <li key={project.id}>
              <article className={styles.card}>
                <div className={styles.shot}>
                  {project.screenshot ? (
                    <img
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className={styles.shotPlaceholder}>
                      <ImageIcon size={20} strokeWidth={1.6} aria-hidden="true" />
                      Screenshot
                      <span className={styles.todoTag}>TODO</span>
                    </span>
                  )}
                  <span className={styles.number} aria-hidden="true">
                    {project.number}
                  </span>
                </div>

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <span className={styles.category}>{project.category}</span>
                    <span className={styles.year}>{project.year}</span>
                  </div>

                  <h3 className={styles.title}>
                    {project.title}
                    {project.featured ? <span className={styles.featured}>Featured</span> : null}
                  </h3>
                  <p className={styles.subtitle}>{project.subtitle}</p>
                  <p className={styles.description}>{project.description}</p>

                  <ul className={styles.stack} aria-label={`${project.title} tech stack`}>
                    {project.stack.map((tech) => (
                      <li key={tech} className={styles.tag}>
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.links}>
                    {caseStudyIds.includes(project.id) ? (
                      <a className={styles.caseLink} href={`#/case-studies/${project.id}`}>
                        Read case study
                        <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                      </a>
                    ) : null}

                    <a
                      className={styles.repoLink}
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon size={16} />
                      Repository
                      <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>

                    {project.demo ? (
                      <a
                        className={styles.repoLink}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live demo
                        <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className={styles.noDemo} title="No deployed demo for this repository">
                        No live demo
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.earlier}>
        Earlier experiments, kept for the record:{' '}
        {earlierRepos.map((repo, index) => (
          <span key={repo.href}>
            {index > 0 ? ' · ' : ''}
            <a href={repo.href} target="_blank" rel="noopener noreferrer">
              {repo.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        ))}
      </p>
    </Section>
  );
}
