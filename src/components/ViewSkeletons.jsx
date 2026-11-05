/**
 * Layout skeletons shown by <Suspense> while the code-split case-study and
 * résumé view chunks stream in. Each one mirrors its page's real structure —
 * top bar, hero, prose sections, gallery or résumé sheet — so the page grows
 * into place instead of appearing from blank space.
 */

import Skeleton from './Skeleton.jsx';
import styles from './ViewSkeletons.module.css';

export function CaseStudySkeleton() {
  return (
    <>
      <header className={styles.bar}>
        <Skeleton className={styles.barBack} />
        <Skeleton className={styles.barMeta} />
      </header>
      <main className={`container ${styles.article}`}>
        <header className={styles.hero}>
          <Skeleton className={styles.heroEyebrow} />
          <Skeleton className={styles.heroTitle} />
          <Skeleton className={`${styles.heroTitle} ${styles.heroTitleShort}`} />
          <Skeleton className={styles.heroLede} />
          <span className={styles.heroPills}>
            <Skeleton className={styles.heroPill} />
            <Skeleton className={`${styles.heroPill} ${styles.heroPillShort}`} />
          </span>
        </header>

        <div className={styles.layout}>
          <div>
            {[0, 1, 2].map((group) => (
              <div key={group} className={styles.prose} style={{ marginBottom: '1.5rem' }}>
                <Skeleton className={styles.sheetHeading} />
                <Skeleton className={styles.line} />
                <Skeleton className={`${styles.line} ${styles.lineIndent}`} />
                <Skeleton className={`${styles.line} ${styles.lineIndent}`} />
                <Skeleton className={`${styles.line} ${styles.lineShort}`} />
              </div>
            ))}
            <div className={styles.gallery}>
              <Skeleton style={{ aspectRatio: '16 / 9' }} />
              <Skeleton style={{ aspectRatio: '16 / 9' }} />
            </div>
          </div>

          <div className={styles.asideCard} aria-hidden="true">
            <Skeleton className={styles.asideTitle} />
            <Skeleton className={styles.asideRow} />
            <Skeleton className={`${styles.asideRow} ${styles.asideRowShort}`} />
            <Skeleton className={styles.asideRow} />
            <Skeleton className={styles.button} />
          </div>
        </div>
      </main>
    </>
  );
}

export function ResumeSkeleton() {
  return (
    <>
      <header className={styles.bar}>
        <Skeleton className={styles.barBack} />
        <Skeleton className={styles.barMeta} />
      </header>
      <main className={`container ${styles.article}`}>
        <header className={styles.hero}>
          <Skeleton className={styles.heroEyebrow} />
          <Skeleton className={styles.heroTitle} />
          <Skeleton className={styles.heroLede} />
          <Skeleton className={styles.button} />
        </header>

        <div className={styles.sheet} aria-hidden="true">
          <div className={styles.sheetHeader}>
            <Skeleton className={styles.sheetName} />
            <Skeleton className={styles.sheetRole} />
            <Skeleton className={styles.sheetContact} />
          </div>
          {[0, 1, 2].map((group) => (
            <div key={group} className={styles.prose}>
              <Skeleton className={styles.sheetHeading} />
              <div className={styles.sheetRows}>
                <Skeleton className={styles.sheetRow} />
                <Skeleton className={`${styles.sheetRow} ${styles.sheetRowShort}`} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
