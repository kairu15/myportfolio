/**
 * Résumé content — the single source of truth shared by the résumé page
 * (Resume.jsx) and the PDF generator (scripts/generate-resume.mjs), so the
 * page and the downloaded PDF can never drift apart.
 *
 * Every claim is verified against the repositories and the rest of the
 * portfolio (profile.js, experience.js, skills.js, caseStudies.js):
 * - Skills match skills.js and the language stats of github.com/kairu15.
 * - Java and C++ are framed as university coursework — they appear in no
 *   repository, per the owner's instruction to verify before including.
 * - Project numbers (routes, tests, migrations, tables, pages) come from the
 *   case studies, which were read from the repositories themselves.
 * - Statuses are stated honestly: CVO is a capstone in development, and the
 *   PickleSphere and hotel systems are portfolio projects (the hotel one a
 *   demonstration prototype), not deployed production systems.
 * - The internship wording matches experience.js. Nothing is invented.
 * There is no LinkedIn profile, so none is listed.
 */

export const resume = {
  name: 'Kylle Ian D. Acibron',
  role: 'Aspiring Web Developer',
  tagline: 'Experience at a glance.',
  location: 'Bayawan City, Negros Oriental, Philippines',
  email: 'kylleacibron@gmail.com',
  github: {
    label: 'github.com/kairu15',
    url: 'https://github.com/kairu15',
  },

  summary:
    'BS Information Technology student at Negros Oriental State University (NORSU-BSC) and aspiring web developer. Builds practical web systems end to end — from MySQL schemas and application logic to responsive interfaces — using Django, Laravel, React, PHP and JavaScript. Current work includes an internship contributing to university web systems, a capstone dispersal tracking system for a City Veterinary Office, and portfolio projects for a pickleball facility and a hotel.',

  education: {
    school: 'Negros Oriental State University – Bayawan–Sta. Catalina Campus (NORSU-BSC)',
    degree: 'Bachelor of Science in Information Technology',
    period: '2023 – Present',
    detail:
      'A degree program focused on software development, database systems, web technologies, and software engineering.',
  },

  skills: [
    { label: 'Programming languages', items: 'Python, PHP, JavaScript' },
    { label: 'Frameworks', items: 'Django, Laravel, React' },
    { label: 'Databases', items: 'MySQL, SQLite' },
    { label: 'Front end', items: 'HTML, CSS, Tailwind CSS, Bootstrap' },
    { label: 'Tools and technologies', items: 'Git, GitHub, Docker, Vite' },
    // Coursework only — not used in any repository, so it is labelled as such.
    { label: 'University coursework', items: 'Java, C++', note: true },
  ],

  experience: {
    title: 'Intern Developer',
    org: 'NORSU-BSC (Negros Oriental State University)',
    period: '2026',
    mode: 'On-site',
    summary:
      'Contributed to university web systems while gaining hands-on experience in software development, database management, and system administration.',
    stack: ['Python', 'Django', 'PHP', 'Laravel', 'MySQL', 'JavaScript'],
  },

  projects: [
    {
      name: 'CVO Dispersal Tracking System',
      meta: 'Laravel · React · MySQL · MapLibre GL · Docker · Expo',
      status: 'Capstone project · in development',
      description:
        'A livestock and poultry dispersal tracker for a City Veterinary Office, built end to end: a Laravel REST API of roughly 115 routes backed by 666 PHPUnit tests, a React staff interface with barangay-level geo-tagging on MapLibre GL, an Expo field companion and Docker Compose stacks.',
    },
    {
      name: 'PickleSphere',
      meta: 'Django · MySQL · Channels · Redis · Stripe',
      status: 'Portfolio project · no public deployment',
      description:
        'A Django pickleball facility platform built as a portfolio project: hourly court reservations with overlap protection, Stripe and GCash payments with tracked refunds, and tournaments with live WebSocket scoring over Channels and Redis — ten apps, 64 migrations and 296 automated tests.',
    },
    {
      name: 'Bayawan Bai Hotel Management System',
      meta: 'PHP · MySQL · JavaScript',
      status: 'Portfolio project · demonstration prototype',
      description:
        'A PHP and MySQL hotel management prototype built for portfolio demonstration, not a fully operational production system: a guest booking flow with an availability checker, front-desk operations and a 46-page administration panel over a 51-table schema.',
    },
  ],
};
