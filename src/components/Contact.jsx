import { ArrowUpRight, Check, Clipboard, FileText, Mail, TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FacebookIcon, GithubIcon, InstagramIcon } from './BrandIcons.jsx';
import { profile } from '../data/profile.js';
import Section from './Section.jsx';
import styles from './Contact.module.css';

const TILES = [
  {
    id: 'github',
    label: 'GitHub',
    meta: 'Projects & source code',
    href: profile.github.url,
    Icon: GithubIcon,
    color: 'var(--text)',
    external: true,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    meta: "Let's connect",
    href: profile.facebookUrl,
    Icon: FacebookIcon,
    color: '#1877F2',
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    meta: 'Follow the day to day',
    href: profile.instagramUrl,
    Icon: InstagramIcon,
    color: '#E4405F',
    external: true,
  },
];

const SOCIALS = [
  { id: 'facebook', label: 'Facebook', href: profile.facebookUrl, Icon: FacebookIcon, color: '#1877F2' },
  { id: 'instagram', label: 'Instagram', href: profile.instagramUrl, Icon: InstagramIcon, color: '#E4405F' },
];

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | copied | error

  useEffect(() => {
    if (status === 'idle') return;
    const timer = setTimeout(() => setStatus('idle'), 2600);
    return () => clearTimeout(timer);
  }, [status]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }

  return (
    <Section
      id="contact"
      index="06"
      label="Say hello"
      title="Good things start with a conversation."
      description={`${profile.availability}. If you have a project, a question, or a role in mind, I'd love to hear what you're working on.`}
      aside={
        <div className={styles.card}>
          <p className={styles.cardLabel}>The best way to reach me</p>
          <a className={styles.email} href={`mailto:${profile.email}`}>
            <span className={styles.emailText}>{profile.email}</span>
            <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
          </a>

          <div className={styles.actions}>
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <Mail size={17} strokeWidth={1.9} aria-hidden="true" />
              Write an email
            </a>
            <button type="button" className={styles.copy} onClick={copyEmail}>
              {status === 'copied' ? (
                <Check size={16} strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <Clipboard size={16} strokeWidth={1.9} aria-hidden="true" />
              )}
              {status === 'copied' ? 'Copied' : 'Copy email'}
            </button>
          </div>

          <p className={styles.hint}>Tell me a little about your idea and how I can help.</p>

          <p className={styles.status} role="status" aria-live="polite">
            {status === 'copied' ? 'Email address copied to your clipboard.' : null}
            {status === 'error' ? (
              <>
                <TriangleAlert size={14} strokeWidth={2} aria-hidden="true" />
                Copying failed — select the address above and copy it manually.
              </>
            ) : null}
          </p>
        </div>
      }
    >
      <ul className={styles.tiles}>
        {TILES.map(({ id, label, meta, href, Icon, color, external }) => (
          <li key={id} className={styles.tileItem}>
            <a
              className={styles.tile}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className={styles.tileIcon} style={{ color }}>
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className={styles.tileText}>
                <span className={styles.tileLabel}>{label}</span>
                <span className={styles.tileMeta}>{meta}</span>
              </span>
              <ArrowUpRight className={styles.tileArrow} size={16} strokeWidth={2} aria-hidden="true" />
              {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
            </a>
          </li>
        ))}

        <li className={styles.tileItem}>
          {profile.resumeUrl ? (
            <a className={styles.tile} href={profile.resumeUrl} download>
              <span className={styles.tileIcon}>
                <FileText size={21} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className={styles.tileText}>
                <span className={styles.tileLabel}>Résumé</span>
                <span className={styles.tileMeta}>Experience at a glance</span>
              </span>
              <ArrowUpRight className={styles.tileArrow} size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          ) : (
            <span
              className={`${styles.tile} ${styles.tileTodo}`}
              title="TODO: add your résumé PDF to public/ and set profile.resumeUrl"
            >
              <span className={styles.tileIcon}>
                <FileText size={21} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className={styles.tileText}>
                <span className={styles.tileLabel}>Résumé</span>
                <span className={styles.tileMeta}>Experience at a glance</span>
              </span>
              <span className={styles.todoTag}>TODO</span>
            </span>
          )}
        </li>
      </ul>

      <div className={styles.elsewhere}>
        <h3 className={styles.elsewhereTitle}>Find me elsewhere</h3>
        <ul className={styles.elsewhereList}>
          {SOCIALS.map(({ id, label, href, Icon, color }) => (
            <li key={id}>
              <a
                className={styles.elsewhereLink}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--brand': color }}
              >
                <Icon size={19} aria-hidden="true" />
                {label}
                <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
