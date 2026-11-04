import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { activity, profile } from '../data/profile.js';
import Section from './Section.jsx';
import styles from './Activity.module.css';

export default function Activity() {
  const [chartFailed, setChartFailed] = useState(false);

  return (
    <Section
      id="activity"
      index="03"
      label="Activity"
      title="Developer activity"
      description="Most of my work is public. This is where it lives."
    >
      <div className={styles.card}>
        <div className={styles.summary}>
          <span className={styles.icon} aria-hidden="true">
            <GithubIcon size={22} />
          </span>

          <div>
            <p className={styles.handle}>@{profile.github.handle}</p>
            <p className={styles.stats}>
              {activity.repoCount} public repositories · on GitHub since {activity.joinedYear}
            </p>
          </div>

          <a
            className={styles.profileLink}
            href={profile.github.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit GitHub profile
            <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className={styles.chartWrap}>
          {chartFailed ? (
            <p className={styles.fallback}>
              The contribution chart could not load.{' '}
              <a href={profile.github.url} target="_blank" rel="noopener noreferrer">
                Open the GitHub profile
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{' '}
              to see recent activity.
            </p>
          ) : (
            <img
              className={styles.chart}
              src={activity.chartUrl}
              alt={activity.chartAlt}
              loading="lazy"
              decoding="async"
              onError={() => setChartFailed(true)}
            />
          )}
        </div>
      </div>
    </Section>
  );
}
