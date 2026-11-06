/**
 * Case studies for the three repositories that carry real application work.
 * Every claim below was read from the repositories themselves — READMEs,
 * models, migrations, tests, settings and Docker configuration. No usage
 * metrics, user counts or outcomes are stated because none exist publicly;
 * `django-portfolio` and `react-portfolio` are learning exercises and are
 * linked as "earlier experiments" on the Projects section instead.
 *
 * Sections follow the same order for every study:
 * overview → problem → goals → role → technologies → features → process →
 * challenges → results, then the gallery and links rendered by CaseStudy.jsx.
 */

// Screenshots are imported rather than referenced from public/ so Vite
// fingerprints the files and rewrites the URL for the configured base — the
// same import works at a domain root, in a subpath, and on a static host
// after `npm run build` (see profile.js for the same reasoning).
import cvoScreenshot from '../assets/images/CVO.png';
import picklesphereScreenshot from '../assets/images/PickleSphere.png';
import hotelScreenshot from '../assets/images/BayawanBaiHotel.png';

export const caseStudies = [
  {
    id: 'cvo',
    number: '01',
    title: 'CVO Dispersal Tracking System',
    subtitle:
      'A Laravel, React and Expo information system that replaces the paper records behind a City Veterinary Office’s livestock and poultry dispersal programme.',
    year: '2026',
    status: 'Capstone project · In development',
    role: 'Web developer — Laravel API, React web interface, Expo companion app, test suites and Docker setup',
    repo: 'https://github.com/kairu15/CVO',
    demo: '',
    sections: [
      {
        id: 'overview',
        title: 'Project overview',
        paragraphs: [
          'The CVO Dispersal Tracking System is an information system built for a City Veterinary Office in Negros Oriental. It replaces the paper trail behind the office’s livestock and poultry dispersal programme with a single, searchable registry of beneficiaries, animals and dispersal events, together with the dashboards that administrators, veterinarians and field staff use to work with that data.',
          'The codebase is organised as three clients of one Laravel API: a React web interface for office staff, an Expo mobile app for field technicians, and Docker Compose setups that keep development and production reproducible. At the time of writing, the repository holds 49 migrations, 31 controllers, roughly 115 API routes, 24 page-level React modules and a backend test suite of 666 tests.',
        ],
      },
      {
        id: 'problem',
        title: 'The problem',
        paragraphs: [
          'Dispersal programmes place animals with farmer-beneficiaries across many barangays, and the office must be able to trace each animal’s offspring and subsequent re-dispersals for compliance. On paper, that history is scattered across logbooks, spreadsheets and field notes — answering a question as basic as “where did this animal come from, and where did its offspring go?” means stitching records together by hand.',
          'Field technicians need to capture visits and locations on site rather than transcribe them afterwards, while administrators and veterinarians each need a view of the programme that matches what they are actually responsible for.',
        ],
      },
      {
        id: 'goals',
        title: 'Project goals',
        bullets: [
          'Replace paper beneficiary and animal records with one structured, searchable registry.',
          'Record dispersal locations down to the barangay so activity can be mapped and summarised.',
          'Track the full dispersal lifecycle, including re-dispersals and offspring lineage.',
          'Enforce role-based access for administrators, veterinarians and field technicians in both the API and the interfaces.',
          'Give field staff a mobile companion that works against the same API as the web app.',
          'Keep local and production environments reproducible for a small team.',
        ],
      },
      {
        id: 'role',
        title: 'My role',
        paragraphs: [
          'I built the entire system as this capstone’s developer: the Laravel API — controllers, service classes, form requests, policies and migrations — the React web interface, the Expo companion app, the PHPUnit and Vitest suites, and the Docker Compose configuration for both development and production.',
          'Because the requirements came from a real office and its dispersal programme, the work was shaped by field workflows rather than by a generic feature list. The repository remains under active development and is not a finished deployment.',
        ],
      },
      {
        id: 'technologies',
        title: 'Technologies used',
        groups: [
          {
            label: 'API',
            items: ['Laravel 13', 'PHP 8.4', 'Laravel Sanctum', 'MySQL 8.4', 'REST routes under /api/v1'],
          },
          {
            label: 'Web interface',
            items: [
              'React 19',
              'Vite',
              'Tailwind CSS 4',
              'React Router 7',
              'TanStack Query',
              'MapLibre GL',
              'Recharts',
              'i18next',
            ],
          },
          {
            label: 'Mobile',
            items: ['Expo 57', 'React Native 0.86', 'React Navigation', 'Bearer token auth'],
          },
          {
            label: 'Tooling and testing',
            items: [
              'Docker Compose (development + production)',
              'PHPUnit — 666 tests',
              'Vitest + Testing Library',
              'oxlint',
              'Node end-to-end scripts that run against Docker',
            ],
          },
        ],
      },
      {
        id: 'features',
        title: 'Key features',
        bullets: [
          'A beneficiary and animal registry with ownership events and a lineage view.',
          'Barangay- and purok-level geo-tagging, an interactive dispersal map and a public transparency summary built on MapLibre GL.',
          'Dispersal and re-dispersal events, monitoring records, vaccination schedules, health records and case notes.',
          'Field visits captured with photo evidence and a verification step.',
          'Role and permission management, an audit log, staff user management and system settings.',
          'Notifications, reports with Excel import/export, and technician assignments.',
          'An Expo mobile app with login, geo-tagging and project screens for field use.',
          'One API rule set shared by the web and mobile clients across roughly 115 routes.',
        ],
      },
      {
        id: 'process',
        title: 'Development process',
        paragraphs: [
          'I started from the domain rather than the screens. Beneficiaries, animals, ownership events and dispersal events are modelled as separate entities, with barangays and puroks as first-class location records. Business rules live in service classes under app/Services, controllers stay thin, validation is handled by form requests, and responses are shaped by API resources.',
          'The React app mirrors those modules one page at a time — beneficiaries, the dispersal map, health, field visits, monitoring, reports, roles — with React Query keeping server state out of component state. Access control is enforced by API policies and reflected in the interface routes, so the UI never becomes the security boundary.',
          'Tests were written alongside each module: 56 feature test files covering the registry, dispersal, health, field visits, reports, roles and settings, plus Vitest component tests and scripted end-to-end flows that run against Docker. A separate production compose file serves the built frontend through nginx and proxies /api to the API, so production runs on a single origin.',
        ],
      },
      {
        id: 'challenges',
        title: 'Challenges and solutions',
        bullets: [
          {
            title: 'Cross-origin SPA sessions.',
            text: 'Sanctum’s cookie authentication is origin-locked, and the frontend on :5173 talking to the API on :8005 produced 419 and CORS errors until VITE_API_URL, SANCTUM_STATEFUL_DOMAINS and CORS_ALLOWED_ORIGINS were kept in step. The production setup removes this class of bug entirely by serving a single origin and proxying /api.',
          },
          {
            title: 'Tests that reached the wrong database.',
            text: 'Inside the development container, MySQL environment variables took precedence during php artisan test. phpunit.xml now forces an in-memory SQLite connection in both $_ENV and $_SERVER, so the suite can never touch the compose database.',
          },
          {
            title: 'A PHP version trap.',
            text: 'composer.lock resolves Symfony 8.1, which requires PHP 8.4.1 despite the looser ^8.3 constraint. The Docker image therefore runs PHP 8.4, and the setup notes record the reasoning so nobody has to repeat the investigation.',
          },
          {
            title: 'Roles that cannot be bypassed by URL.',
            text: 'Permissions are enforced by API policies and reflected in the interface rather than hidden in the UI, with dedicated role and permission tests covering the boundary.',
          },
          {
            title: 'Beneficiaries are not user accounts.',
            text: 'Modelling farmers as logins created a registration lifecycle the office never asked for. A migration removed the farmer accounts, beneficiaries became admin-entered records, and the registry, admin screens and tests all follow that rule.',
          },
          {
            title: 'Coordinates for existing records.',
            text: 'Imported beneficiaries arrived without geo-tags, so a backfill command and the geocoding service fill in missing coordinates — both covered by their own tests.',
          },
        ],
      },
      {
        id: 'results',
        title: 'Results and learnings',
        paragraphs: [
          'The repository contains a working, containerised system backed by 666 backend tests and a mobile client on the same API. The README still lists the core registry, geo-tagging and dispersal-tracking modules as in progress, alongside reporting and settings work, so the honest summary is “functional and under active development”.',
          'Three lessons stand out: enforce permissions above the interface rather than inside it; test against an isolated database whenever the development environment carries production-shaped credentials; and design identity so programme records never double as logins. The project also reinforced that reproducible environments are a feature in their own right — the Docker Compose setup is what makes onboarding and the end-to-end scripts possible.',
          'Limitations at the time of writing: the system has no public deployment and no production usage data, because the office has not rolled it out yet.',
        ],
      },
    ],
    gallery: [
      {
        src: cvoScreenshot,
        alt: 'Public transparency homepage of the CVO geo-tagging site: a barangay-level dispersal map of Bayawan City beside counters for animals dispersed, barangays covered and re-dispersals',
      },
    ],
    galleryNote:
      'Only the public transparency homepage has been captured so far; the office dashboards, field-visit screens and Expo mobile app can be added to this gallery as they are captured.',
  },
  {
    id: 'picklesphere',
    number: '02',
    title: 'PickleSphere',
    subtitle:
      'A complete pickleball facility platform in one Django application — court reservations, payments, equipment rental, tournaments and live scoring over WebSockets.',
    year: '2026',
    status: 'Portfolio project · No public deployment',
    role: 'Django developer — data model, role-scoped URL structure, templates, payment flows, WebSocket scoring and CI',
    repo: 'https://github.com/kairu15/django-project-picklesphere',
    demo: '',
    sections: [
      {
        id: 'overview',
        title: 'Project overview',
        paragraphs: [
          'PickleSphere is a Django 4.2 application for running a pickleball facility end to end: a court catalogue, hourly reservations, equipment rental, payments and refunds, tournaments, live scoring, notifications and four role-specific dashboards.',
          'It is organised as ten Django apps — accounts, organizations, courts, reservations, payments, scoring, notifications, dashboard, equipment and tournaments — with 64 migrations and 229 templates covering the public site and the admin, staff and player areas.',
        ],
      },
      {
        id: 'problem',
        title: 'The problem',
        paragraphs: [
          'A facility with several courts takes bookings by the hour, for several hours at a time, across walk-ins, online reservations and tournaments. Without a shared system, double bookings surface at the front desk, cancellation fees are applied inconsistently, equipment availability is guesswork, and tournament brackets live in spreadsheets.',
          'Players need a reliable view of what is genuinely open before they travel, and staff need to reconcile payments and refunds without matching screenshots by hand.',
        ],
      },
      {
        id: 'goals',
        title: 'Project goals',
        bullets: [
          'Build one reservation engine that understands multi-hour bookings and rejects overlaps.',
          'Handle money properly: deposits, cancellations within a policy window, and fully tracked refunds.',
          'Give players, staff, organization admins and the super admin separate surfaces and permissions.',
          'Run tournaments end to end — registration, brackets, leaderboards and live scores.',
          'Keep equipment, notifications and court availability in a single source of truth.',
        ],
      },
      {
        id: 'role',
        title: 'My role',
        paragraphs: [
          'I built the application in this repository end to end: the ten Django apps, the role-based URL structure, the templates, the Stripe and manual payment flows, the Channels scoring consumer, and the GitHub Actions test workflow.',
          'That includes the model-level rules described below and the 296 tests spread across the apps and the shared test base.',
        ],
      },
      {
        id: 'technologies',
        title: 'Technologies used',
        groups: [
          {
            label: 'Backend',
            items: [
              'Python',
              'Django 4.2',
              'Django ORM',
              'Django Channels',
              'Redis (channel layer, cache, sessions)',
              'django-axes',
              'django-filter',
              'crispy forms',
              'Pillow',
              'staticmap',
            ],
          },
          {
            label: 'Integrations',
            items: ['Stripe Checkout and webhooks', 'Anymail with Elastic Email'],
          },
          {
            label: 'Front end',
            items: ['Django templates', '229 templates', 'WhiteNoise manifest static files'],
          },
          {
            label: 'Testing and CI',
            items: ['296 tests', 'GitHub Actions', 'Django deployment checks'],
          },
        ],
      },
      {
        id: 'features',
        title: 'Key features',
        bullets: [
          'A court catalogue with hourly slots; multi-hour reservations expand into grid segments and round-trip back into the edit form.',
          'Availability checks that reject overlapping bookings on both the create and edit paths.',
          'A waitlist with queue positions and automatic notification when a slot frees up.',
          'A cancellation policy with a time window, deduction percentage and refund method details.',
          'Equipment rental attached to reservations, with fees rolled into the booking total.',
          'Payments via Stripe Checkout and webhooks, GCash reference with proof upload, cash, and refunds with a full audit log.',
          'Tournaments in five formats, with registration review, teams, brackets, leaderboards and court rotation for King/Queen of the Court.',
          'Live match scoring through a WebSocket consumer.',
          'Role-scoped areas for the public site, super admin, organization admins, staff and players.',
          'Notifications with sidebar badges, maintenance mode, session timeout with refresh endpoints, and a slow-query monitor.',
        ],
      },
      {
        id: 'process',
        title: 'Development process',
        paragraphs: [
          'I began with the models, because most of the business rules belong there: a reservation owns its duration, pricing and status; cancellation policy and waitlist ordering are explicit records; and a tournament decomposes into Tournament, Registration, Team, Match, Leaderboard and CourtRotation.',
          'URLs are namespaced by audience — /super-admin/, /org-admin/, /staff/, /user/ and /accounts/ — and each app exposes separate URL modules for those prefixes, so every view belongs to exactly one audience instead of checking roles inline.',
          'Payments support an automated Stripe path and a manual GCash proof path that both write to the same Payment record, with refunds tracked separately and every action logged. Static files are served through WhiteNoise with hashed manifest storage, and the cache, session and channel layers switch to Redis when CACHE_BACKEND=redis, falling back to local memory otherwise.',
          'GitHub Actions runs migrations, the role access-control suite and Django’s deployment checks on every push to main.',
        ],
      },
      {
        id: 'challenges',
        title: 'Challenges and solutions',
        bullets: [
          {
            title: 'An hourly grid over arbitrary times.',
            text: 'Reservations are stored as start and end times but booked through one-hour slots. A slot-expansion helper rebuilds the segmented grid whenever a booking is edited, and deliberately falls back to a single segment when a range crosses midnight or does not align to the grid.',
          },
          {
            title: 'The last slot of the day.',
            text: 'The 23:00 slot is stored ending at 23:59 but should read as 12:00 AM, so the display helper converts that boundary — a three-hour booking reads “9:00 PM – 12:00 AM” rather than ending at a confusing 11:59 PM.',
          },
          {
            title: 'Double bookings on edit, not just create.',
            text: 'Overlap queries guard both paths, because moving an existing booking onto an occupied slot is the same failure as creating one there.',
          },
          {
            title: 'Two payment realities in one model.',
            text: 'Automated Stripe webhooks and manual GCash proof uploads coexist behind a single Payment model, with deductions and refunds recorded explicitly rather than inferred from a status field.',
          },
          {
            title: 'Redis that is optional.',
            text: 'The same settings file has to work on a laptop and in production, so the cache, session and channel layers degrade gracefully to local memory and database storage when Redis is not configured.',
          },
          {
            title: 'Sessions that end mid-task.',
            text: 'A 30-minute idle timeout is paired with heartbeat, info and extend endpoints so the interface can warn a user before their session expires instead of failing on submit.',
          },
        ],
      },
      {
        id: 'results',
        title: 'Results and learnings',
        paragraphs: [
          'The repository holds ten apps, 64 migrations and 229 templates that carry the facility workflow in code, with 296 tests and CI gating role access and system checks. There is no public deployment, so it is presented as a portfolio project rather than a live product.',
          'What I learned: express booking rules in the data model before writing any screens; separate role surfaces by URL rather than by conditionals inside templates; and design a human reconciliation path beside an automated payment flow, because real facilities still take GCash screenshots at the counter.',
          'Limitations at the time of writing: no public demo or usage data. The repository also has no README, so this study was written directly from the code and configuration.',
        ],
      },
    ],
    gallery: [
      {
        src: picklesphereScreenshot,
        alt: 'Public homepage of PickleSphere, the pickleball reservation platform: a hero banner above a court search bar with location and date fields and a Check Availability button',
      },
    ],
    galleryNote:
      'Only the public booking homepage has been captured so far; the role dashboards, tournament brackets and live-scoring screens can be added to this gallery as they are captured.',
  },
  {
    id: 'hotel',
    number: '03',
    title: 'Bayawan Bai Hotel Management System',
    subtitle:
      'A PHP and MySQL hotel management prototype built for portfolio demonstration — guest bookings, front-desk operations and a 46-page administration panel.',
    year: '2026',
    status: 'Portfolio project · Demonstration prototype',
    role: 'Web developer — MySQL schema, PHP modules, and guest, staff and admin interfaces',
    repo: 'https://github.com/kairu15/Project-Hotel-Management-System',
    demo: '',
    sections: [
      {
        id: 'overview',
        title: 'Project overview',
        paragraphs: [
          'The Bayawan Bai Hotel Management System is a database-driven PHP application built as a portfolio prototype for demonstration rather than as a fully operational production system. It serves four audiences: a guest-facing site, a guest account area, front-desk tools for staff, and an administration panel.',
          'The schema is committed as a single SQL file defining 51 tables, and the application comprises 151 PHP files organised by audience rather than by a framework’s conventions — a deliberate constraint, since the project uses plain PHP and MySQL.',
        ],
      },
      {
        id: 'problem',
        title: 'The problem',
        paragraphs: [
          'A hotel front desk juggles room availability, walk-ins, check-ins and check-outs, food orders and event bookings all at once. When that work lives in a paper log or a workbook, double bookings are discovered at arrival, and no one has a reliable view of a room’s current state.',
          'Guests, meanwhile, need to see what is genuinely available before they travel, and managers need the numbers behind the front desk’s day.',
        ],
      },
      {
        id: 'goals',
        title: 'Project goals',
        bullets: [
          'Keep one room inventory whose availability always accounts for existing bookings.',
          'Give guests a complete path from browsing rooms to a confirmed, manageable booking.',
          'Equip the front desk with check-in, check-out, walk-in and extra-charge tools.',
          'Give administrators control over rooms, staff, content, payments and reports.',
          'Separate guest, receptionist, manager and admin access cleanly.',
        ],
      },
      {
        id: 'role',
        title: 'My role',
        paragraphs: [
          'I designed the MySQL schema and built the PHP modules behind all three interfaces: the guest site and account area, the staff operations pages, and the admin panel. That includes the availability logic, session handling, the per-page staff permission checks and the email verification flow.',
        ],
      },
      {
        id: 'technologies',
        title: 'Technologies used',
        groups: [
          {
            label: 'Backend',
            items: ['PHP 7.4+', 'PDO with prepared statements', 'bcrypt password hashing', 'PHPMailer over SMTP'],
          },
          {
            label: 'Data',
            items: ['MySQL / MariaDB', 'InnoDB, utf8mb4', '51-table schema'],
          },
          {
            label: 'Front end',
            items: ['HTML and CSS', 'Vanilla JavaScript', 'Font Awesome', 'Google Fonts'],
          },
          {
            label: 'Tooling',
            items: ['Composer', 'Dotenv environment files', 'Manual test checklist in the README'],
          },
        ],
      },
      {
        id: 'features',
        title: 'Key features',
        bullets: [
          'A room catalogue with category, price and occupancy filters, plus individual room detail pages.',
          'An availability checker that excludes rooms with confirmed, reserved or checked-in stays overlapping the requested dates.',
          'A booking flow that calculates nights and totals and generates a booking reference.',
          'Guest accounts with email OTP verification, login, profile management, booking history, food orders and event bookings.',
          'Front-desk tools for check-in, check-out, booking confirmation, walk-ins, extra charges, inventory and maintenance.',
          'A 46-page admin panel covering rooms, bookings, payments, staff permissions and schedules, menus, event spaces, promotions, reviews, FAQs, reports and analytics.',
          'Food ordering, event space pages with virtual tours, ratings, a translation engine and chatbot endpoints wired to environment-held API keys.',
          'A 30-minute session timeout with advance warning, plus per-page staff permissions.',
        ],
      },
      {
        id: 'process',
        title: 'Development process',
        paragraphs: [
          'The application is organised by audience. includes/ holds the configuration together with the guest, user, staff and admin headers and footers; auth/ holds the registration, OTP and password flows; admin/, staff/ and user/ hold their own pages; and api/ exposes small JSON endpoints for notifications, calendar events, ratings, promos and the chatbot.',
          'All database access goes through a small PDO wrapper using prepared statements, while shared helpers in includes/config.php centralise price and date formatting, session checks and permission checks, so every page starts from the same rules instead of repeating them.',
          'The schema ships as one importable SQL file, and the README documents setup, default roles and test accounts. Verification at the time was the manual checklist in the README — the repository has no automated test suite.',
        ],
      },
      {
        id: 'challenges',
        title: 'Challenges and solutions',
        bullets: [
          {
            title: 'Availability that holds up.',
            text: 'The availability query rejects any room with a stay in confirmed, reserved or checked-in status whose dates overlap the requested range. Getting that rule right came before building the booking screens, because everything else depends on it.',
          },
          {
            title: 'Four audiences in one codebase.',
            text: 'Guest, user, staff and admin pages share includes but not navigation or permissions, so each folder pairs its own header and footer with role guards at the top of the page.',
          },
          {
            title: 'Permissions finer than a role.',
            text: 'Beyond the role check, individual staff accounts can be granted access per page, with a global override per page. A single check combines the global setting with the per-user row before a page is allowed to render.',
          },
          {
            title: 'Sessions that expire safely.',
            text: 'A 30-minute inactivity window with a five-minute warning is backed by database bookkeeping that marks the user offline and removes their session row when the timeout fires.',
          },
          {
            title: 'Email verification without committed credentials.',
            text: 'One-time codes are sent through PHPMailer using SMTP settings read from the environment, so the repository contains only a .env.example rather than live credentials.',
          },
        ],
      },
      {
        id: 'results',
        title: 'Results and learnings',
        paragraphs: [
          'The repository holds a demonstration prototype spanning 51 tables and 151 PHP files across booking, front-desk operations and administration — a portfolio piece rather than a fully operational production system. It is not deployed publicly, and the README’s production-scale figures are targets rather than measurements, so this study makes no performance claims.',
          'What I learned: get the availability query right before building any screens; design a schema that supports guest and staff workflows without duplicating records; and how much discipline a framework-less PHP codebase needs to stay navigable.',
          'Limitations at the time of writing: no automated tests and no consistent CSRF protection across the application. Both are the obvious next steps, along with a deployment.',
        ],
      },
    ],
    gallery: [
      {
        src: hotelScreenshot,
        alt: 'Guest-facing homepage of the Bayawan Bai Hotel site: a poolside hero banner reading Escape to Paradise above Book Now and Our Amenities calls to action',
      },
    ],
    galleryNote:
      'Only the guest-facing homepage has been captured so far; the front-desk tools and the 46-page administration panel can be added to this gallery as they are captured.',
  },
];

export const caseStudyIds = caseStudies.map((study) => study.id);
