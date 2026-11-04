import { useEffect, useRef, useState } from 'react';
import SectionDivider from './SectionDivider.jsx';
import styles from './Section.module.css';

/**
 * Shared section shell: eyebrow with a number, heading, description and a
 * one-shot fade-up when the section scrolls into view. The hidden state lives
 * inside a `prefers-reduced-motion: no-preference` media query, so content is
 * always visible when motion is reduced or animations are unavailable.
 */
export default function Section({ id, index, label, title, description, aside, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <SectionDivider />
      <div className="container">
        <div className={aside ? styles.split : undefined}>
          <header className={styles.head}>
            <p className={styles.eyebrow}>
              <span className={styles.index} aria-hidden="true">
                {index}
              </span>
              {label}
            </p>
            <h2 id={`${id}-title`} className={styles.title}>
              {title}
            </h2>
            {description ? <p className={styles.description}>{description}</p> : null}
          </header>
          {aside ?? null}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
