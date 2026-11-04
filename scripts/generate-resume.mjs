/**
 * Generates public/resume.pdf from src/data/resume.js — the same data module
 * the résumé page (src/components/Resume.jsx) renders, so the PDF and the
 * page cannot drift apart.
 *
 * The data is rendered into a standalone, print-styled HTML file and printed
 * to PDF with headless Chrome or Edge. The result is real selectable text
 * with working links (ATS-friendly), not an image.
 *
 * Usage: npm run resume
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resume } from '../src/data/resume.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPdf = join(root, 'public', 'resume.pdf');

/* --- Candidate browsers, first existing one wins (Windows + PATH) --------- */
const candidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA
    ? join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe')
    : null,
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean);

const browser = candidates.find((path) => existsSync(path));
if (!browser) {
  console.error(
    'No Chrome or Edge found. Install one, or add its executable path to scripts/generate-resume.mjs.',
  );
  process.exit(1);
}

/* --- The print document --------------------------------------------------- */
/* Colours mirror the on-page sheet (Resume.module.css): near-black ink on
   white with the indigo accent for headings and links. */
const INK = '#14171c';
const INK_SOFT = '#414a57';
const INK_MUTE = '#67707e';
const INK_BORDER = '#e3e0d8';
const ACCENT = '#4f46e5';

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(resume.name)} — Résumé</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Sora:wght@600&display=swap"
  rel="stylesheet"
/>
<style>
  @page { size: A4; margin: 10mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #ffffff;
    color: ${INK};
    font-family: 'IBM Plex Sans', 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.42;
  }
  h1, h2, h3, h4, p, dl, dd, ul { margin: 0; }
  ul { padding: 0; list-style: none; }
  a { color: ${ACCENT}; text-decoration: underline; text-underline-offset: 2px; }

  .name { font-family: 'Sora', 'IBM Plex Sans', sans-serif; font-size: 19pt; font-weight: 600; letter-spacing: -0.01em; }
  .role { margin-top: 2pt; color: ${INK_SOFT}; font-size: 10.5pt; font-weight: 500; }
  .contact { margin-top: 4pt; color: ${INK_MUTE}; font-size: 9pt; }
  .header { padding-bottom: 6pt; border-bottom: 1.6pt solid ${INK}; }

  .section { margin-top: 9pt; }
  .heading {
    padding-bottom: 3pt;
    border-bottom: 0.6pt solid ${INK_BORDER};
    color: ${ACCENT};
    font-family: 'IBM Plex Mono', monospace;
    font-size: 8pt;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .text { margin-top: 4pt; color: ${INK_SOFT}; }

  .entry { margin-top: 4.5pt; }
  .entry.first { margin-top: 4pt; }
  .entry-head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 2pt 8pt; }
  .entry-title { font-size: 10pt; font-weight: 600; }
  .entry-period { color: ${INK_MUTE}; font-family: 'IBM Plex Mono', monospace; font-size: 7.5pt; white-space: nowrap; }
  .entry-org { margin-top: 1pt; color: ${INK_SOFT}; font-size: 9.25pt; }
  .entry-meta { margin-top: 2pt; color: ${INK_MUTE}; font-family: 'IBM Plex Mono', monospace; font-size: 7.5pt; }

  .skills { margin-top: 4pt; }
  .skill-row { display: grid; grid-template-columns: minmax(72mm, auto) 1fr; gap: 2pt 7pt; padding: 0.5pt 0; }
  .skill-label { font-weight: 600; }
  .skill-label.note { color: ${INK_MUTE}; font-weight: 500; }
  .skill-items { color: ${INK_SOFT}; }
</style>
</head>
<body>
  <header class="header">
    <h1 class="name">${escapeHtml(resume.name)}</h1>
    <p class="role">${escapeHtml(resume.role)}</p>
    <p class="contact">
      ${escapeHtml(resume.location)} &middot;
      <a href="mailto:${escapeHtml(resume.email)}">${escapeHtml(resume.email)}</a> &middot;
      <a href="${escapeHtml(resume.github.url)}">${escapeHtml(resume.github.label)}</a>
    </p>
  </header>

  <section class="section">
    <h2 class="heading">Professional summary</h2>
    <p class="text">${escapeHtml(resume.summary)}</p>
  </section>

  <section class="section">
    <h2 class="heading">Education</h2>
    <div class="entry first">
      <div class="entry-head">
        <h3 class="entry-title">${escapeHtml(resume.education.degree)}</h3>
        <span class="entry-period">${escapeHtml(resume.education.period)}</span>
      </div>
      <p class="entry-org">${escapeHtml(resume.education.school)}</p>
      <p class="text">${escapeHtml(resume.education.detail)}</p>
    </div>
  </section>

  <section class="section">
    <h2 class="heading">Technical skills</h2>
    <dl class="skills">
      ${resume.skills
        .map(
          (group) => `
      <div class="skill-row">
        <dt class="skill-label${group.note ? ' note' : ''}">${escapeHtml(group.label)}</dt>
        <dd class="skill-items">${escapeHtml(group.items)}</dd>
      </div>`,
        )
        .join('')}
    </dl>
  </section>

  <section class="section">
    <h2 class="heading">Experience and projects</h2>

    <div class="entry first">
      <div class="entry-head">
        <h3 class="entry-title">${escapeHtml(resume.experience.title)}</h3>
        <span class="entry-period">${escapeHtml(`${resume.experience.period} · ${resume.experience.mode}`)}</span>
      </div>
      <p class="entry-org">${escapeHtml(resume.experience.org)}</p>
      <p class="text">${escapeHtml(resume.experience.summary)}</p>
      <p class="entry-meta">${escapeHtml(resume.experience.stack.join(' · '))}</p>
    </div>

    ${resume.projects
      .map(
        (project) => `
    <div class="entry">
      <div class="entry-head">
        <h3 class="entry-title">${escapeHtml(project.name)}</h3>
        <span class="entry-period">${escapeHtml(project.status)}</span>
      </div>
      <p class="entry-meta">${escapeHtml(project.meta)}</p>
      <p class="text">${escapeHtml(project.description)}</p>
    </div>`,
      )
      .join('')}
  </section>
</body>
</html>
`;

/* --- Render and print ------------------------------------------------------ */
const tempDir = mkdtempSync(join(root, 'scripts', '.resume-'));
const tempHtml = join(tempDir, 'resume-print.html');
writeFileSync(tempHtml, page, 'utf8');

try {
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--virtual-time-budget=10000',
      `--print-to-pdf=${outputPdf}`,
      pathToFileURL(tempHtml).href,
    ],
    { stdio: 'ignore', timeout: 60000 },
  );

  if (!existsSync(outputPdf)) {
    console.error('Printing finished but public/resume.pdf was not created.');
    process.exit(1);
  }
  console.log(`Written ${outputPdf}`);
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
