import { describe, expect, it } from 'vitest';

import { leoMSuppliers } from '../src/data/site';
import { businessImage, businessImageNames, businessOriginal } from '../src/data/business-images';

const allPhotos = [
  leoMSuppliers.hero,
  ...leoMSuppliers.chapters.flatMap((chapter) => chapter.photos),
  ...leoMSuppliers.archive,
];

describe('Leo M. Suppliers story', () => {
  it('never shows the same photograph twice', () => {
    const used = allPhotos.map((photo) => photo.image);
    expect(new Set(used).size).toBe(used.length);
  });

  it('resolves every photograph to a real file and its original', () => {
    for (const photo of allPhotos) {
      expect(businessImageNames, `unexpected image "${photo.image}"`).toContain(photo.image);
      expect(businessImage(photo.image), `no file for "${photo.image}"`).toBeTruthy();
      expect(businessOriginal(photo.image), `no original for "${photo.image}"`).toMatch(/\.jpg/);
    }
  });

  it('describes every photograph for screen readers and captions', () => {
    for (const photo of allPhotos) {
      expect(photo.alt.length).toBeGreaterThan(30);
      expect(photo.caption.length).toBeGreaterThan(20);
      expect(photo.caption).not.toBe(photo.alt);
    }
  });

  it('keeps the dated milestones separate from the undated photographs', () => {
    const dates = leoMSuppliers.milestones.map((milestone) => milestone.date);
    expect(dates).toEqual(['February 2022', 'June 2022', '14 September 2022', 'Late 2022', 'April 2026']);
    // No photograph caption may carry a fabricated date.
    for (const photo of allPhotos) expect(photo.caption).not.toMatch(/\b(19|20)\d{2}\b/);
  });

  it('does not claim sales, revenue or customer numbers', () => {
    const copy = JSON.stringify(leoMSuppliers).toLowerCase();
    // The disclaimer paragraph names revenue and profit only to rule them out,
    // so the guard looks for claims rather than for the words themselves.
    for (const pattern of [
      /revenue (of|was|grew|reached)/,
      /profit (of|was|grew|reached)/,
      /\d+\s*%/,
      /\d+\s+customers/,
      /doubled|tripled|exponential/,
      /market leader|best.selling/,
    ]) {
      expect(copy).not.toMatch(pattern);
    }
  });

  it('writes in the site voice', () => {
    const copy = JSON.stringify(leoMSuppliers);
    expect(copy).not.toContain('—');
    for (const banned of ['repository metadata', 'audited at commit', 'evidence you can inspect']) {
      expect(copy.toLowerCase()).not.toContain(banned);
    }
  });

  it('links only to routes that exist', () => {
    for (const link of leoMSuppliers.next) expect(link.href).toMatch(/^\/(work|about|resume)\//);
    expect(leoMSuppliers.facebook.url).toMatch(/^https:\/\/www\.facebook\.com\//);
    expect(leoMSuppliers.facebook.label.toLowerCase()).not.toContain('verified');
  });
});
