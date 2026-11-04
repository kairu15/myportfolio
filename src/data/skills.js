/**
 * Skills grouped by area. Every item is backed by something in the GitHub
 * repositories or by the internship and coursework in experience.js; see the
 * README for the evidence behind each group.
 *
 * Each card highlights three core items and links the projects that actually
 * use them (`projects` points at ids in projects.js). Everything else lives in
 * `toolboxSkills`, shown below the cards.
 */

export const skillGroups = [
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    description:
      'Business logic, authentication and the server-side work behind the projects above.',
    items: ['Django', 'Laravel', 'PHP'],
    projects: ['cvo', 'picklesphere'],
  },
  {
    id: 'data',
    title: 'Data',
    icon: 'database',
    description: 'Relational schemas, queries and migrations that keep records consistent.',
    items: ['MySQL', 'SQLite', 'Database design'],
    projects: ['cvo', 'picklesphere'],
  },
  {
    id: 'frontend',
    title: 'Front end',
    icon: 'monitor',
    description: 'Responsive interfaces and the interactions that make them feel right.',
    items: ['React', 'JavaScript', 'Tailwind CSS'],
    projects: ['cvo', 'hotel'],
  },
  {
    id: 'workflow',
    title: 'Workflow',
    icon: 'terminal',
    description: 'Version control, builds and the checks that keep changes shippable.',
    items: ['Git', 'GitHub', 'Docker'],
    projects: ['cvo', 'picklesphere'],
  },
];

export const toolboxSkills = [
  'Python',
  'Django Channels',
  'Migrations',
  'HTML & CSS',
  'Bootstrap',
  'MapLibre GL',
  'React Router',
  'GitHub Actions',
  'Vite',
  'Expo',
];
