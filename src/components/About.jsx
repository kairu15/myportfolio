import { MapPin, GraduationCap, Target, Mail } from 'lucide-react';
import { profile } from '../data/profile.js';
import Section from './Section.jsx';
import SocialLinks from './SocialLinks.jsx';
import Pets from './Pets.jsx';
import Cats from './Cats.jsx';
import { SkeletonImage } from './Skeleton.jsx';
import styles from './About.module.css';

/** Renders `**text**` in the bio as <strong>, leaving other text untouched. */
function withEmphasis(text) {
  return text.split('**').map((chunk, index) =>
    index % 2 === 1 ? <strong key={index}>{chunk}</strong> : chunk,
  );
}

export default function About() {
  const [first, ...rest] = profile.bio;

  return (
    <Section
      id="about"
      index="01"
      label="About"
      title="A little more about me"
      description={first}
    >
      <div className={styles.grid}>
        <div className={styles.bio}>
          <figure className={styles.identity}>
            <SkeletonImage
              className={styles.avatarFrame}
              imageClassName={styles.avatar}
              src={profile.photo}
              alt={profile.photoAlt}
              width="2316"
              height="3088"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className={styles.identityName}>{profile.name}</span>
              <span className={styles.identityRole}>{profile.role}</span>
            </figcaption>
          </figure>

          {rest.map((paragraph) => (
            <p key={paragraph}>{withEmphasis(paragraph)}</p>
          ))}
        </div>

        {/* The quick-facts card sits beside the bio as a narrow aside; the pet
            illustrations live in a centered row below the grid instead, where
            they have the full section width to spread out. */}
        <div className={styles.side}>
          <aside className={styles.card} aria-label="Quick facts">
            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt>
                  <MapPin size={15} strokeWidth={1.8} aria-hidden="true" />
                  Location
                </dt>
                <dd>{profile.location}</dd>
              </div>
              <div className={styles.fact}>
                <dt>
                  <GraduationCap size={15} strokeWidth={1.8} aria-hidden="true" />
                  Studying
                </dt>
                <dd>{profile.university}</dd>
              </div>
              <div className={styles.fact}>
                <dt>
                  <Target size={15} strokeWidth={1.8} aria-hidden="true" />
                  Current focus
                </dt>
                <dd>{profile.focus.join(' · ')}</dd>
              </div>
              <div className={styles.fact}>
                <dt>
                  <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
                  Email
                </dt>
                <dd>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </dd>
              </div>
            </dl>

            <div className={styles.socials}>
              <SocialLinks showLabels />
            </div>
          </aside>

        </div>
      </div>

      <div className={styles.companionsRow}>
        <Pets />
        <Cats />
      </div>
    </Section>
  );
}
