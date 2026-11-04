#!/usr/bin/env node
/**
 * Builds public/documents/Leo-Mabuku-Resume.pdf from src/data/*.json.
 *
 *   node scripts/build-resume.mjs
 *
 * Two modes, controlled by "source" in src/data/resume.json:
 *   • "generated" — renders the PDF from the same data the website uses.
 *   • "uploaded"  — ships content/resume-uploaded.pdf untouched, so a résumé you
 *                   uploaded yourself is never overwritten by a build.
 *
 * The live file is always public/documents/Leo-Mabuku-Resume.pdf, so every link
 * that has ever been shared keeps working whichever mode is active.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import { computeDataHash } from './resume-hash.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');
const OUT_DIR = path.join(ROOT, 'public', 'documents');
const OUT = path.join(OUT_DIR, 'Leo-Mabuku-Resume.pdf');
const UPLOAD_DIR = path.join(ROOT, 'content');

/** The uploaded résumé can live at content/<file> or anywhere under public/ (CMS uploads). */
function resolveUpload(file) {
  if (!file) return path.join(UPLOAD_DIR, 'resume-uploaded.pdf');
  if (file.startsWith('/')) return path.join(ROOT, 'public', file.replace(/^\//, ''));
  return path.join(UPLOAD_DIR, file);
}

const read = (name) => JSON.parse(fs.readFileSync(path.join(DATA, `${name}.json`), 'utf8'));

const profile = read('profile');
const experience = read('experience');
const education = read('education');
const certifications = read('certifications');
const skillGroups = read('skillGroups');
const hackathons = read('hackathons');
const projects = read('projects');
const resume = read('resume');

const INK = '#111312';
const MUTED = '#5b605d';
const RULE = '#c9cdc6';
const ACCENT = '#4a5600';

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 40;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM = PAGE_H - MARGIN;

const pick = (list, keys) =>
  keys.map((key) => list.find((item) => item.slug === key || item.title === key)).filter(Boolean);

/* ------------------------------------------------------------------ uploaded */

function useUploaded() {
  const upload = resolveUpload(resume.uploaded?.file);
  if (!fs.existsSync(upload)) {
    console.error(
      `\n✖ resume.json says source="uploaded", but ${path.relative(ROOT, upload)} does not exist.\n` +
        '  Add the file, or run: npm run resume:revert\n',
    );
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.copyFileSync(upload, OUT);
  const meta = {
    mode: 'uploaded',
    label: resume.uploaded?.label ?? 'Uploaded résumé',
    uploadedOn: resume.uploaded?.uploadedOn ?? null,
    file: resume.uploaded?.file ?? null,
    fileHash: sha256(fs.readFileSync(upload)),
    builtAt: new Date().toISOString(),
  };
  writeMeta(meta);
  console.log(`✔ Résumé: uploaded file copied → ${path.relative(ROOT, OUT)}`);
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

/** Hash of everything the generated PDF is built from — used by the drift test. */
const dataHash = () => computeDataHash(DATA);

function writeMeta(meta) {
  fs.writeFileSync(
    path.join(OUT_DIR, 'resume-meta.json'),
    `${JSON.stringify(meta, null, 2)}\n`,
  );
}

/* ----------------------------------------------------------------- generated */

function generate() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    info: {
      Title: `${profile.name} — Résumé`,
      Author: profile.name,
      Subject: profile.shortTitle,
      Keywords: 'software developer, computer science, Zambia, Android, IoT',
    },
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stream = fs.createWriteStream(OUT);
  doc.pipe(stream);

  let y = MARGIN;

  const rule = (color = RULE, width = 0.6, gapBefore = 4, gapAfter = 6) => {
    y += gapBefore;
    doc.save().lineWidth(width).strokeColor(color)
      .moveTo(MARGIN, y).lineTo(PAGE_W - MARGIN, y).stroke().restore();
    y += gapAfter;
  };

  const sectionTitle = (text) => {
    if (y > BOTTOM - 60) return false;
    y += 8;
    doc.font('Helvetica-Bold').fontSize(7.6).fillColor(ACCENT)
      .text(text.toUpperCase(), MARGIN, y, { characterSpacing: 0.9 });
    y += 10;
    rule('#b9bdb4', 0.8, 0, 4);
    return true;
  };

  const paragraph = (text, opts = {}) => {
    const size = opts.size ?? 8.4;
    const leading = opts.leading ?? size * 1.32;
    doc.font(opts.bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(size)
      .fillColor(opts.color ?? INK);
    const height = doc.heightOfString(text, { width: opts.width ?? CONTENT_W, leading });
    if (y + height > BOTTOM) return false;
    doc.text(text, opts.x ?? MARGIN, y, { width: opts.width ?? CONTENT_W, leading });
    y += height + (opts.after ?? 2);
    return true;
  };

  const bullet = (text) => {
    const size = 8.3;
    const leading = size * 1.3;
    doc.font('Helvetica').fontSize(size).fillColor(INK);
    const width = CONTENT_W - 12;
    const height = doc.heightOfString(text, { width, leading });
    if (y + height > BOTTOM) return false;
    doc.fillColor('#8f948d').text('•', MARGIN + 1, y, { width: 8 });
    doc.fillColor(INK).text(text, MARGIN + 11, y, { width, leading });
    y += height + 1.2;
    return true;
  };

  /* header */
  doc.font('Helvetica-Bold').fontSize(26).fillColor(INK).text(profile.name, MARGIN, y, { lineBreak: false });
  const nameHeight = 30;
  const contactLines = [
    `${profile.location}`,
    profile.phone,
    profile.email,
    'leo-mabuku-portfolio.pages.dev',
    'linkedin.com/in/leo-mabuku-7a2645330',
  ];
  doc.font('Helvetica').fontSize(7.4).fillColor(MUTED);
  let cy = y + 4;
  for (const line of contactLines) {
    doc.text(line, MARGIN, cy, { width: CONTENT_W, align: 'right', lineBreak: false });
    cy += 9.2;
  }
  y += nameHeight;
  doc.font('Helvetica-Bold').fontSize(8).fillColor(ACCENT)
    .text(profile.shortTitle.toUpperCase(), MARGIN, y, { characterSpacing: 0.7 });
  y += 12;
  rule(INK, 1, 2, 8);

  paragraph(resume.summary, { size: 8.5, leading: 11.6, after: 2 });

  /* experience */
  sectionTitle('Experience');
  for (const role of pick(experience, resume.experienceTitles)) {
    if (y > BOTTOM - 46) break;
    doc.font('Helvetica-Bold').fontSize(9.1).fillColor(INK)
      .text(`${role.title}`, MARGIN, y, { width: CONTENT_W, lineBreak: false });
    const titleWidth = doc.widthOfString(role.title) + 3;
    doc.font('Helvetica').fontSize(9.1).fillColor(MUTED)
      .text(` | ${role.organisation}`, MARGIN + titleWidth, y, { lineBreak: false });
    y += 11.4;
    doc.font('Helvetica').fontSize(7.5).fillColor(MUTED)
      .text(`${role.period} · ${role.location}`, MARGIN, y);
    y += 9.6;
    for (const line of [role.summary, ...(role.bullets ?? []).slice(0, 2)]) {
      if (!bullet(line)) break;
    }
    y += 2.4;
  }

  /* projects */
  if (sectionTitle('Selected projects')) {
    for (const project of pick(projects, resume.projectSlugs)) {
      if (y > BOTTOM - 34) break;
      const desc = project.shortDescription.replace(/\s+/g, ' ');
      doc.font('Helvetica-Bold').fontSize(8.6).fillColor(INK)
        .text(project.name, MARGIN, y, { width: CONTENT_W, lineBreak: false });
      const w = doc.widthOfString(project.name) + 3;
      doc.font('Helvetica').fontSize(8.6).fillColor(MUTED)
        .text(` | ${project.technologies.slice(0, 5).join(', ')}`, MARGIN + w, y, { lineBreak: false });
      y += 10.4;
      if (!paragraph(desc, { size: 8.1, leading: 10.4, color: MUTED, after: 3.4 })) break;
    }
  }

  /* education */
  if (sectionTitle('Education')) {
    const degree = education[0];
    if (degree) {
      doc.font('Helvetica-Bold').fontSize(8.7).fillColor(INK)
        .text(degree.qualification, MARGIN, y, { lineBreak: false });
      const w = doc.widthOfString(degree.qualification) + 3;
      doc.font('Helvetica').fontSize(8.7).fillColor(MUTED)
        .text(` | ${degree.institution} — ${degree.period} (completed; awaiting conferment)`,
          MARGIN + w, y, { width: CONTENT_W - w, lineBreak: false });
      y += 11;
    }
    if (resume.showCertifications) {
      const training = certifications.map((c) => `${c.name}${c.period && c.period !== 'Training' ? ` (${c.period})` : ''}`);
      paragraph(training.join(' · '), { size: 7.8, leading: 10.2, color: MUTED, after: 2 });
    }
  }

  /* hackathon */
  const hackathon = hackathons[0];
  if (resume.showHackathon && hackathon && y < BOTTOM - 26) {
    sectionTitle('Recognition');
    doc.font('Helvetica-Bold').fontSize(8.7).fillColor(INK)
      .text(hackathon.name, MARGIN, y, { lineBreak: false });
    const w = doc.widthOfString(hackathon.name) + 3;
    doc.font('Helvetica').fontSize(8.7).fillColor(MUTED)
      .text(` | ${hackathon.result} of ${hackathon.fieldSize.toLowerCase()} — ${hackathon.period}`,
        MARGIN + w, y, { lineBreak: false });
    y += 11.4;
    paragraph(hackathon.awardSummary, { size: 8, leading: 10.4, color: MUTED, after: 2 });
  }

  /* skills line */
  if (y < BOTTOM - 34) {
    sectionTitle('Toolkit');
    const toolkit = skillGroups
      .slice(0, 4)
      .map((group) => `${group.title}: ${group.items.join(', ')}`)
      .join('   ·   ');
    paragraph(toolkit, { size: 7.8, leading: 10.2, color: MUTED, after: 0 });
  }

  /* footer */
  // Footer is written into the bottom margin, so relax it briefly to avoid a page break.
  doc.page.margins.bottom = 0;
  doc.font('Helvetica').fontSize(7).fillColor('#9aa09a')
    .text(
      `${profile.github.replace('https://', '')}  ·  ${profile.email}  ·  ${profile.phone}`,
      MARGIN,
      PAGE_H - 26,
      { width: CONTENT_W, align: 'center', lineBreak: false },
    );
  doc.page.margins.bottom = MARGIN;

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  }).then(() => {
    writeMeta({
      mode: 'generated',
      label: 'Generated résumé',
      uploadedOn: null,
      dataHash: dataHash(),
      builtAt: new Date().toISOString(),
    });
    console.log(`✔ Résumé: generated from src/data → ${path.relative(ROOT, OUT)}`);
  });
}

function readMeta() {
  const metaPath = path.join(OUT_DIR, 'resume-meta.json');
  if (!fs.existsSync(metaPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  } catch {
    return null;
  }
}

if (resume.source === 'uploaded') {
  useUploaded();
} else {
  const previous = readMeta();
  const unchanged =
    previous?.mode === 'generated' &&
    previous?.dataHash === computeDataHash(DATA) &&
    fs.existsSync(OUT);

  if (unchanged) {
    console.log('✔ Résumé: unchanged — keeping the existing PDF');
  } else {
    await generate();
  }
}
