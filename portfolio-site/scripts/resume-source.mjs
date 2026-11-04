#!/usr/bin/env node
/**
 * Switch what the site serves as "my résumé".
 *
 *   npm run resume:upload -- ~/Downloads/Leo-Mabuku-CV.pdf
 *       Copies your PDF to content/resume-uploaded.pdf, sets resume.json
 *       source="uploaded" and rebuilds. From then on, builds ship your file
 *       untouched — the generator will not overwrite it.
 *
 *   npm run resume:revert
 *       Sets source="generated" and rebuilds the PDF from the site data.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RESUME_JSON = path.join(ROOT, 'src', 'data', 'resume.json');
const UPLOAD_DIR = path.join(ROOT, 'content');
const UPLOAD = path.join(UPLOAD_DIR, 'resume-uploaded.pdf');

const readResume = () => JSON.parse(fs.readFileSync(RESUME_JSON, 'utf8'));
const writeResume = (data) => fs.writeFileSync(RESUME_JSON, `${JSON.stringify(data, null, 2)}\n`);

function rebuild() {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'build-resume.mjs')], {
    stdio: 'inherit',
  });
}

const [, , command, fileArg] = process.argv;

if (command === 'upload') {
  if (!fileArg) {
    console.error('Usage: npm run resume:upload -- /path/to/resume.pdf');
    process.exit(1);
  }
  const source = path.resolve(fileArg.replace(/^~/, process.env.HOME ?? '~'));
  if (!fs.existsSync(source)) {
    console.error(`✖ No file at ${source}`);
    process.exit(1);
  }
  const header = fs.readFileSync(source).subarray(0, 5).toString('latin1');
  if (header !== '%PDF-') {
    console.error('✖ That file is not a PDF. Export your résumé as PDF first.');
    process.exit(1);
  }
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.copyFileSync(source, UPLOAD);

  const resume = readResume();
  resume.source = 'uploaded';
  resume.uploaded = {
    ...resume.uploaded,
    file: 'resume-uploaded.pdf',
    label: 'Uploaded résumé',
    uploadedOn: new Date().toISOString().slice(0, 10),
  };
  writeResume(resume);
  console.log(`✔ Uploaded ${path.basename(source)} → content/resume-uploaded.pdf`);
  console.log('  resume.json source="uploaded" — builds now ship your file as-is.');
  rebuild();
} else if (command === 'revert') {
  const resume = readResume();
  resume.source = 'generated';
  resume.uploaded = { ...resume.uploaded, uploadedOn: null };
  writeResume(resume);
  console.log('✔ resume.json source="generated" — the PDF is built from the site data again.');
  rebuild();
} else {
  console.log(`Usage:
  npm run resume:upload -- /path/to/resume.pdf   ship your own PDF
  npm run resume:revert                          go back to the generated PDF`);
}
