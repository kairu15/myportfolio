import { useEffect, useRef } from 'react';
import { Check, Palette, X } from 'lucide-react';
import styles from './ThemePanel.module.css';

const ACCENT_OPTIONS = [
  { id: 'indigo', label: 'Indigo' },
  { id: 'teal', label: 'Teal' },
  { id: 'clay', label: 'Clay' },
];

const BACKDROP_OPTIONS = [
  { id: 'waves', label: 'Waves' },
  { id: 'slats', label: 'Slats' },
  { id: 'dots', label: 'Dots' },
  { id: 'plain', label: 'None' },
];

export default function ThemePanel({ appearance, onClose, triggerRef }) {
  const panelRef = useRef(null);

  // Close on outside click (ignoring the trigger, which toggles itself).
  useEffect(() => {
    const onPointerDown = (event) => {
      const panel = panelRef.current;
      const trigger = triggerRef?.current;
      if (!panel) return;
      if (panel.contains(event.target) || trigger?.contains(event.target)) return;
      onClose();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [onClose, triggerRef]);

  // Close on Escape and move focus back to the trigger.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      onClose();
      triggerRef?.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, triggerRef]);

  useEffect(() => {
    panelRef.current?.querySelector('button')?.focus();
  }, []);

  return (
    <div
      className={styles.panel}
      id="appearance-panel"
      ref={panelRef}
      role="dialog"
      aria-label="Appearance settings"
    >
      <div className={styles.header}>
        <p className={styles.title}>
          <Palette size={15} strokeWidth={1.9} aria-hidden="true" />
          Appearance
        </p>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close appearance settings"
        >
          <X size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Theme</legend>
        <div className={styles.segmented}>
          <button
            type="button"
            className={`${styles.segment} ${
              appearance.theme === 'light' ? styles.segmentActive : ''
            }`}
            onClick={() => appearance.setTheme('light')}
            aria-pressed={appearance.theme === 'light'}
          >
            Light
          </button>
          <button
            type="button"
            className={`${styles.segment} ${
              appearance.theme === 'dark' ? styles.segmentActive : ''
            }`}
            onClick={() => appearance.setTheme('dark')}
            aria-pressed={appearance.theme === 'dark'}
          >
            Dark
          </button>
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Accent</legend>
        <div className={styles.swatches}>
          {ACCENT_OPTIONS.map((option) => {
            const selected = appearance.accent === option.id;
            return (
              <button
                key={option.id}
                type="button"
                className={`${styles.swatch} ${styles[option.id]} ${
                  selected ? styles.swatchActive : ''
                }`}
                onClick={() => appearance.setAccent(option.id)}
                aria-pressed={selected}
                aria-label={`${option.label} accent`}
                title={`${option.label} accent`}
              >
                {selected ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Backdrop</legend>
        <div className={styles.backdrops}>
          {BACKDROP_OPTIONS.map((option) => {
            const active = appearance.backdrop === option.id;
            return (
              <button
                key={option.id}
                type="button"
                className={`${styles.backdrop} ${active ? styles.backdropActive : ''}`}
                onClick={() => appearance.setBackdrop(option.id)}
                aria-pressed={active}
                aria-label={`${option.label} background`}
              >
                <span
                  className={`${styles.preview} ${styles[option.id]}`}
                  aria-hidden="true"
                />
                <span className={styles.backdropLabel}>
                  {option.label}
                  {active ? <Check size={11} strokeWidth={3} aria-hidden="true" /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className={styles.note}>Saved on this device only.</p>
    </div>
  );
}
