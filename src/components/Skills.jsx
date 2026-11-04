import { ArrowUpRight, Database, MonitorSmartphone, Server, Terminal } from 'lucide-react';
import { skillGroups, toolboxSkills } from '../data/skills.js';
import { projects } from '../data/projects.js';
import Section from './Section.jsx';
import SkillLogo from './SkillLogos.jsx';
import styles from './Skills.module.css';

const ICONS = {
  server: Server,
  database: Database,
  monitor: MonitorSmartphone,
  terminal: Terminal,
};

const projectById = new Map(projects.map((project) => [project.id, project]));

function GroupLink({ id }) {
  const project = projectById.get(id);
  if (!project) return null;

  return (
    <a
      className={styles.projectLink}
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
    >
      In {project.short}
      <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      label="Skills"
      title="Skills and tools"
      description="The stack I use to build, test and deploy the systems in the projects above."
    >
      <ul className={styles.grid}>
        {skillGroups.map((group) => {
          const Icon = ICONS[group.icon] ?? Server;
          return (
            <li key={group.id} className={styles.card}>
              <h3 className={styles.title}>
                <span className={styles.mark}>
                  <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                </span>
                {group.title}
              </h3>
              <p className={styles.description}>{group.description}</p>
              <ul className={styles.chips} aria-label={`${group.title} tools`}>
                {group.items.map((item) => (
                  <li key={item} className={styles.chip}>
                    <SkillLogo name={item} />
                    <span className={styles.chipLabel}>{item}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.links}>
                {group.projects.map((id) => (
                  <GroupLink key={id} id={id} />
                ))}
              </p>
            </li>
          );
        })}
      </ul>

      <div className={styles.toolbox}>
        <h3 className={styles.toolboxTitle}>Also in the toolbox</h3>
        <ul className={styles.toolboxList}>
          {toolboxSkills.map((item) => (
            <li key={item} className={styles.toolboxItem}>
              <SkillLogo name={item} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
