import { Briefcase, GraduationCap } from 'lucide-react';
import { experience } from '../data/experience.js';
import Section from './Section.jsx';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <Section
      id="experience"
      index="05"
      label="Experience"
      title="Experience and education"
      description="Professional development, project-based work, and formal training."
    >
      <ol className={styles.timeline}>
        {experience.map((entry) => {
          const Icon = entry.type === 'education' ? GraduationCap : Briefcase;
          return (
            <li className={styles.item} key={entry.id}>
              <span className={styles.marker} aria-hidden="true">
                <Icon size={15} strokeWidth={1.9} />
              </span>

              <div className={styles.content}>
                <div className={styles.head}>
                  <span className={styles.period}>{entry.period}</span>
                  <span className={styles.mode}>{entry.mode}</span>
                </div>
                <h3 className={styles.title}>{entry.title}</h3>
                <p className={styles.org}>{entry.org}</p>
                <p className={styles.description}>{entry.description}</p>
                <ul className={styles.tags}>
                  {entry.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
