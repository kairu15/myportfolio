import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { profile } from '../data/profile.js';
import { SkeletonImage } from './Skeleton.jsx';
import styles from './Hero.module.css';

export default function Hero() {
  const [before, after] = profile.headline.split(profile.headlineAccent);
  const hasResume = Boolean(profile.resumeUrl);

  return (
    <section className={styles.hero} id="home">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.greeting}>Hello, I&rsquo;m {profile.name}.</p>

            <h1 className={styles.title}>
              {before}
              <span className={styles.accent}>{profile.headlineAccent}</span>
              {after}
            </h1>

            <p className={styles.role}>
              {profile.role}
              <span className={styles.separator} aria-hidden="true">
                /
              </span>
              {profile.location}
            </p>

            <div className={styles.actions}>
              <a className="btn btn-primary" href="#projects">
                View projects
                <ArrowDown size={17} strokeWidth={2} aria-hidden="true" />
              </a>

              {hasResume ? (
                <a className="btn btn-secondary" href="#/resume">
                  View résumé
                  <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled
                  title="TODO: add your résumé PDF to public/ and set profile.resumeUrl"
                >
                  Download résumé
                  <span className={styles.todoTag}>TODO</span>
                </button>
              )}

              <a
                className={styles.githubLink}
                href={profile.github.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={17} />
                {profile.github.handle}
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <ul className={styles.focus} aria-label="Current focus">
              {profile.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <figure className={styles.portrait}>
            <SkeletonImage
              className={styles.portraitFrame}
              imageClassName={styles.photo}
              src={profile.photo}
              alt={profile.photoAlt}
              width="2316"
              height="3088"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
