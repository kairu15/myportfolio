import { Mail } from 'lucide-react';
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from './BrandIcons.jsx';
import { profile } from '../data/profile.js';
import styles from './SocialLinks.module.css';

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  email: Mail,
};

export default function SocialLinks({ showLabels = false }) {
  return (
    <ul className={`${styles.list} ${showLabels ? styles.withLabels : ''}`}>
      {profile.socials.map((social) => {
        const Icon = ICONS[social.id] ?? Mail;

        if (!social.href) {
          return (
            <li key={social.id}>
              <span className={styles.todo} title={social.todo} aria-label={`${social.label} (link TODO)`}>
                <Icon size={18} aria-hidden="true" />
                {showLabels ? <span>{social.label}</span> : null}
                <span className="sr-only"> — link TODO</span>
              </span>
            </li>
          );
        }

        const isExternal = social.href.startsWith('http');

        return (
          <li key={social.id}>
            <a
              className={styles.link}
              href={social.href}
              aria-label={social.label}
              title={social.label}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon size={18} aria-hidden="true" />
              {showLabels ? <span>{social.label}</span> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
