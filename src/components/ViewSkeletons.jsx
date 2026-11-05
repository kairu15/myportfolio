/**
 * Loading states for the code-split case-study and résumé views: a compact
 * version of the boot loader's terminal, shown by <Suspense> while the route
 * chunk streams in. Same typed-log language as index.html's boot loader, so
 * every loading state in the site reads as one system.
 */

import styles from './ViewSkeletons.module.css';

function ViewLoader({ tag, lines }) {
  return (
    <div className={styles.loader} role="status" aria-label="Loading">
      <div className={styles.term}>
        <div className={styles.bar}>
          <span className={styles.termTitle}>kylle@portfolio:~</span>
          <span className={styles.termTag}>{tag}</span>
        </div>
        <div className={styles.body}>
          <p className={`${styles.line} ${styles.l1}`}>
            <span className={styles.accent}>$</span> {lines[0]}
          </p>
          <p className={`${styles.line} ${styles.l2}`}>
            <span className={styles.mute}>&gt;</span> {lines[1]}
          </p>
          <p className={`${styles.line} ${styles.l3}`}>
            <span className={styles.mute}>&gt;</span> <span className={styles.accent}>ready</span>
            <span className={styles.cursor} />
          </p>
        </div>
      </div>
      <div className={styles.track}>
        <span className={styles.thumb} />
      </div>
    </div>
  );
}

export function CaseStudySkeleton() {
  return (
    <ViewLoader
      tag="case-study"
      lines={['open case-study', 'unpacking repository notes ... ok']}
    />
  );
}

export function ResumeSkeleton() {
  return <ViewLoader tag="resume" lines={['open resume', 'laying out pages ... ok']} />;
}
