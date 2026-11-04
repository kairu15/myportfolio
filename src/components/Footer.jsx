import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile.js';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>Designed and built by {profile.name} · 2026</p>
        <a className={styles.top} href="#home">
          Back to top
          <ArrowUp size={15} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
