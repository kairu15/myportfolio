import { useEffect, useRef, useState } from 'react';
import {
  Activity as ActivityIcon,
  Briefcase,
  FolderGit2,
  Home,
  Layers,
  Mail,
  Menu,
  Moon,
  Palette,
  PanelLeftClose,
  Sun,
  User,
} from 'lucide-react';
import { profile } from '../data/profile.js';
import ThemePanel from './ThemePanel.jsx';
import styles from './Nav.module.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'activity', label: 'Activity', icon: ActivityIcon },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const DESKTOP = '(min-width: 900px)';

export default function Nav({ appearance }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [active, setActive] = useState('home');
  // Desktop starts with the rail open (icons only); mobile starts collapsed.
  const [railOpen, setRailOpen] = useState(
    () => typeof window === 'undefined' || window.matchMedia(DESKTOP).matches,
  );
  const panelTriggerRef = useRef(null);
  const railRef = useRef(null);
  const openerRef = useRef(null);

  // Highlight the section in view.
  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.28;
      let current = 'home';
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= probe) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Follow the breakpoint: expanded rail on desktop, drawer on mobile. The
  // attribute lets base.css offset the page content while the rail is open.
  useEffect(() => {
    document.documentElement.dataset.rail = railOpen ? 'open' : 'closed';
  }, [railOpen]);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP);
    const onChange = (event) => {
      setRailOpen(event.matches);
      setPanelOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Escape closes the mobile drawer (the panel handles its own Escape).
  useEffect(() => {
    if (!railOpen || panelOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (!window.matchMedia(DESKTOP).matches) setRailOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [railOpen, panelOpen]);

  const isDark = appearance.theme === 'dark';
  const themeLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  const closeRail = () => {
    setRailOpen(false);
    setPanelOpen(false);
  };

  // Move focus into the rail, onto the section that is currently in view.
  const openRail = () => {
    setRailOpen(true);
    requestAnimationFrame(() => {
      const rail = railRef.current;
      const target = rail?.querySelector('a[aria-current="location"]') || rail?.querySelector('nav a');
      target?.focus();
    });
  };

  // Collapsing removes the focused control, so hand focus to the opener.
  const collapseRail = () => {
    closeRail();
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  const onNavigate = () => {
    if (!window.matchMedia(DESKTOP).matches) closeRail();
  };

  return (
    <>
      {railOpen ? (
        <button
          type="button"
          className={styles.scrim}
          tabIndex={-1}
          aria-hidden="true"
          onClick={closeRail}
        />
      ) : null}

      {railOpen ? (
        <aside className={styles.rail} id="site-rail" ref={railRef} aria-label="Primary">
          <a
            className={styles.brand}
            href="#home"
            aria-label={`${profile.name} — home`}
            data-tooltip={profile.name}
            onClick={onNavigate}
          >
            <span className={styles.mark} aria-hidden="true">
              <img src={profile.photo} alt="" width="2316" height="3088" decoding="async" />
            </span>
          </a>

          <nav className={styles.links} aria-label="Sections">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const current = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`${styles.link} ${current ? styles.linkActive : ''}`}
                  aria-label={item.label}
                  aria-current={current ? 'location' : undefined}
                  data-tooltip={item.label}
                  onClick={onNavigate}
                >
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </a>
              );
            })}
          </nav>

          <div className={styles.controls}>
            <button
              type="button"
              className={`icon-btn ${styles.control}`}
              onClick={appearance.toggleTheme}
              aria-label={themeLabel}
              data-tooltip={themeLabel}
            >
              {isDark ? (
                <Sun size={18} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Moon size={18} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>

            <button
              ref={panelTriggerRef}
              type="button"
              className={`icon-btn ${styles.control} ${
                panelOpen ? styles.controlActive : ''
              }`}
              onClick={() => setPanelOpen((open) => !open)}
              aria-expanded={panelOpen}
              aria-controls="appearance-panel"
              aria-label="Appearance settings"
              data-tooltip="Appearance"
            >
              <Palette size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>

            <button
              type="button"
              className={`icon-btn ${styles.control}`}
              onClick={collapseRail}
              aria-expanded="true"
              aria-controls="site-rail"
              aria-label="Collapse navigation"
              data-tooltip="Collapse"
            >
              <PanelLeftClose size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          ref={openerRef}
          className={styles.opener}
          onClick={openRail}
          aria-expanded="false"
          aria-controls="site-rail"
          aria-label="Open navigation"
          title="Open navigation"
        >
          <Menu size={20} strokeWidth={1.9} aria-hidden="true" />
        </button>
      )}

      {panelOpen ? (
        <ThemePanel
          appearance={appearance}
          onClose={() => setPanelOpen(false)}
          triggerRef={panelTriggerRef}
        />
      ) : null}
    </>
  );
}
