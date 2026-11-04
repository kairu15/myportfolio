/**
 * Project content, written from each repository's README, folder structure,
 * languages and dependency files (see README.md → "Where this content came
 * from"). No live demo links exist for these repositories, so none are shown.
 */

export const projectFilters = [
  'All',
  'Web apps',
  'Backend systems',
  'Django',
  'React',
  'PHP',
];

export const projects = [
  {
    id: 'cvo',
    number: '01',
    title: 'CVO Dispersal Tracking System',
    short: 'CVO',
    subtitle: 'Capstone project · In development',
    year: '2026',
    featured: true,
    category: 'Web apps',
    categories: ['Web apps', 'Backend systems', 'React'],
    description:
      'A full-stack system for a City Veterinary Office in Negros Oriental that replaces paper records for livestock and poultry dispersal. It holds the beneficiary and animal registry, barangay-level geo-tags, dispersal and re-dispersal history, and role-based dashboards for administrators, veterinarians and field technicians. A separate Expo app gives field staff a mobile view.',
    stack: ['Laravel', 'MySQL', 'React', 'Vite', 'Tailwind CSS', 'MapLibre GL', 'Expo'],
    repo: 'https://github.com/kairu15/CVO',
    demo: '',
    // TODO: add a screenshot to public/projects/cvo.png and reference it here.
    screenshot: '',
  },
  {
    id: 'picklesphere',
    number: '02',
    title: 'PickleSphere',
    short: 'PickleSphere',
    subtitle: 'Pickleball facility management',
    year: '2026',
    featured: true,
    category: 'Backend systems',
    categories: ['Backend systems', 'Django', 'Web apps'],
    description:
      'A Django platform that runs a pickleball facility end to end: court reservations with conflict checks, Stripe payments, tournaments with live scoring over Django Channels and Redis, equipment inventory, and in-app notifications. Guests, staff and administrators each get their own area, and the project ships with production settings, static file compression and a CI job that boots the app.',
    stack: ['Django', 'Python', 'MySQL', 'Channels', 'Redis', 'Stripe'],
    repo: 'https://github.com/kairu15/django-project-picklesphere',
    demo: '',
    // TODO: add a screenshot to public/projects/picklesphere.png and reference it here.
    screenshot: '',
  },
  {
    id: 'hotel',
    number: '03',
    title: 'Bayawan Bai Hotel Management System',
    short: 'Bayawan Bai Hotel',
    subtitle: 'Hotel operations · PHP and MySQL',
    year: '2026',
    featured: false,
    category: 'PHP',
    categories: ['Web apps', 'PHP'],
    description:
      'A PHP and MySQL hotel management system for a hotel in Bayawan City. Guests can check room availability, book a stay, order food and reserve event spaces; staff handle check-in, check-out, walk-ins and inventory; administrators manage rooms, payments, promotions, reviews and reports. Sessions and role checks separate the three areas.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML & CSS'],
    repo: 'https://github.com/kairu15/Project-Hotel-Management-System',
    demo: '',
    // TODO: add a screenshot to public/projects/hotel.png and reference it here.
    screenshot: '',
  },
];

/**
 * Earlier portfolio attempts (django-portfolio, react-portfolio). Kept out of
 * the project cards on purpose: they exist to learn the stack, not to demo a
 * product. Link them here if you want them listed.
 */
export const earlierRepos = [
  { label: 'django-portfolio', href: 'https://github.com/kairu15/django-portfolio' },
  { label: 'react-portfolio', href: 'https://github.com/kairu15/react-portfolio' },
];
