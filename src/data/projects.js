/**
 * Project content, written from each repository's README, folder structure,
 * languages and dependency files (see README.md → "Where this content came
 * from"). No live demo links exist for these repositories, so none are shown.
 */

// Screenshots are imported rather than referenced from public/ so Vite
// fingerprints the files and rewrites the URL for the configured base — the
// same import works at a domain root, in a subpath, and on a static host
// after `npm run build` (see profile.js for the same reasoning).
import cvoScreenshot from '../assets/images/CVO.png';
import picklesphereScreenshot from '../assets/images/PickleSphere.png';
import hotelScreenshot from '../assets/images/BayawanBaiHotel.png';

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
      'A web-based system for a City Veterinary Office in Negros Oriental that replaces paper records for livestock and poultry dispersal. It holds the beneficiary and animal registry, barangay-level geo-tags, dispersal and re-dispersal history, and role-based dashboards for administrators, veterinarians and field technicians. A separate Expo app gives field staff a mobile view.',
    stack: ['Laravel', 'MySQL', 'React', 'Vite', 'Tailwind CSS', 'MapLibre GL', 'Expo'],
    repo: 'https://github.com/kairu15/CVO',
    demo: '',
    screenshot: cvoScreenshot,
    screenshotAlt:
      'Public transparency homepage of the CVO geo-tagging site: a barangay-level dispersal map of Bayawan City beside counters for animals dispersed, barangays covered and re-dispersals',
  },
  {
    id: 'picklesphere',
    number: '02',
    title: 'PickleSphere',
    short: 'PickleSphere',
    subtitle: 'Portfolio project · Pickleball facility platform',
    year: '2026',
    featured: true,
    category: 'Backend systems',
    categories: ['Backend systems', 'Django', 'Web apps'],
    description:
      'A Django pickleball facility platform built as a portfolio project: court reservations with conflict checks, Stripe payments, tournaments with live scoring over Django Channels and Redis, equipment inventory, and in-app notifications. Guests, staff and administrators each get their own area, and the codebase ships with 296 automated tests and a CI job that boots the app. Not deployed publicly.',
    stack: ['Django', 'Python', 'MySQL', 'Channels', 'Redis', 'Stripe'],
    repo: 'https://github.com/kairu15/django-project-picklesphere',
    demo: '',
    screenshot: picklesphereScreenshot,
    screenshotAlt:
      'Public homepage of PickleSphere, the pickle ball reservation platform: a hero banner above a court search bar with location and date fields and a Check Availability button',
  },
  {
    id: 'hotel',
    number: '03',
    title: 'Bayawan Bai Hotel Management System',
    short: 'Bayawan Bai Hotel',
    subtitle: 'Portfolio project · Hotel management prototype',
    year: '2026',
    featured: false,
    category: 'PHP',
    categories: ['Web apps', 'PHP'],
    description:
      'A PHP and MySQL hotel management prototype built for portfolio demonstration, not a fully operational production system. Guests can check room availability, book a stay, order food and reserve event spaces; staff handle check-in, check-out, walk-ins and inventory; administrators manage rooms, payments, promotions, reviews and reports. Sessions and role checks separate the three areas.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML & CSS'],
    repo: 'https://github.com/kairu15/Project-Hotel-Management-System',
    demo: '',
    screenshot: hotelScreenshot,
    screenshotAlt:
      'Guest-facing homepage of the Bayawan Bai Hotel site: a poolside hero banner reading Escape to Paradise above Book Now and Our Amenities calls to action',
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
