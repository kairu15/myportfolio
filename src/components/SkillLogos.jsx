/**
 * Brand marks for the Skills section. lucide-react carries no technology
 * logos, so the official outlines come from Simple Icons via react-icons.
 *
 * Every mark declares a light and a dark colour: Simple Icons ships single
 * hues, and several brands (SQLite, GitHub, JavaScript) are invisible on one of
 * the two themes, so the darker or lighter tone is swapped by CSS.
 * Technologies without an official mark fall back to a lucide glyph.
 */
import {
  SiBootstrap,
  SiCss,
  SiDjango,
  SiDocker,
  SiExpo,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMaplibre,
  SiMysql,
  SiPhp,
  SiPython,
  SiReact,
  SiReactrouter,
  SiSqlite,
  SiTailwindcss,
  SiVite,
} from 'react-icons/si';
import { ArrowRightLeft, Network, Radio } from 'lucide-react';
import styles from './Skills.module.css';

const mark = (Icon, color, dark = color) => ({ Icon, color, dark });

const LOGOS = {
  // Backend
  Django: [mark(SiDjango, '#2E8B6E', '#44B78B')],
  Laravel: [mark(SiLaravel, '#FF2D20')],
  PHP: [mark(SiPhp, '#6D74A8', '#A5ADE0')],
  Python: [mark(SiPython, '#3776AB', '#5C9FD6')],
  'Django Channels': [mark(Radio, '#2E8B6E', '#44B78B')],

  // Data
  MySQL: [mark(SiMysql, '#4479A1', '#5FA9D6')],
  SQLite: [mark(SiSqlite, '#0F80CC', '#5ABDF0')],
  'Database design': [mark(Network)],
  Migrations: [mark(ArrowRightLeft)],

  // Front end
  React: [mark(SiReact, '#087EA4', '#61DAFB')],
  JavaScript: [mark(SiJavascript, '#9A8400', '#F7DF1E')],
  'HTML & CSS': [mark(SiHtml5, '#E34F26', '#F06529'), mark(SiCss, '#1572B6', '#3B9BE8')],
  'Tailwind CSS': [mark(SiTailwindcss, '#0891B2', '#38BDF8')],
  Bootstrap: [mark(SiBootstrap, '#7952B3', '#A98BDB')],
  'MapLibre GL': [mark(SiMaplibre, '#295DAA', '#5A8AD6')],
  'React Router': [mark(SiReactrouter, '#CA4245', '#F26D70')],

  // Workflow
  Git: [mark(SiGit, '#F05032')],
  GitHub: [mark(SiGithub, '#181717', '#E6E9EF')],
  'GitHub Actions': [mark(SiGithubactions, '#1B74D8', '#4FA8FF')],
  Docker: [mark(SiDocker, '#1D7BC4', '#38A6F5')],
  Vite: [mark(SiVite, '#5B5FE8', '#747BFF')],
  Expo: [mark(SiExpo, '#1B1F23', '#E6E9EF')],
};

const FALLBACK = [mark(Network)];

export default function SkillLogo({ name }) {
  const parts = LOGOS[name] ?? FALLBACK;

  return (
    <span className={styles.logos}>
      {parts.map(({ Icon, color, dark }, index) => (
        <Icon
          key={`${name}-${index}`}
          size={15}
          className={styles.logo}
          aria-hidden="true"
          focusable="false"
          style={color ? { '--brand': color, '--brand-dark': dark } : undefined}
        />
      ))}
    </span>
  );
}
