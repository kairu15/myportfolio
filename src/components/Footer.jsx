import { ArrowUp, Compass } from 'lucide-react';
import { profile } from '../data/profile.js';
import styles from './Footer.module.css';

export default function Footer({ onTour }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>Designed and built by {profile.name} · 2026</p>
        <div className={styles.links}>
          <button type="button" className={styles.tour} onClick={onTour}>
            <Compass size={15} strokeWidth={2} aria-hidden="true" />
            Take the tour again
          </button>
          <a className={styles.top} href="#home">
            Back to top
            <ArrowUp size={15} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
