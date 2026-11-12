/**
 * Photographs from the Leo M. Suppliers shop.
 *
 * The originals live in `src/assets/leo-m-suppliers`. Astro derives the display
 * sizes from them at build time, and the same import is reused through `?url`
 * so the photo viewer can offer the untouched file.
 *
 * The messaging-app filenames said nothing useful about the pictures, so each
 * file is named after what is actually in the frame. Two uploads were byte-for-byte
 * duplicates of others and were dropped rather than shown twice.
 */
import type { ImageMetadata } from 'astro';

const names = [
  'assembly-parts',
  'chairs-pedestal',
  'dining-set',
  'furniture-clothing',
  'interior-mixed',
  'interior-tv-wall',
  'mirror-portrait',
  'portrait-entrance',
  'portrait-inside',
  'portrait-wide',
  'sign-cabinet',
  'stocked-overview',
  'stocked-shopfront',
  'stools-outside',
  'textiles-clothing',
  'tv-stand-black',
  'tv-stand-white',
] as const;

export type BusinessImageName = (typeof names)[number];

const sources = import.meta.glob<ImageMetadata>('../assets/leo-m-suppliers/*.jpg', {
  eager: true,
  import: 'default',
});

const originals = import.meta.glob<string>('../assets/leo-m-suppliers/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
});

const keyOf = (path: string) => path.split('/').pop()?.replace(/\.jpg$/, '') ?? '';

const images = new Map<string, ImageMetadata>();
const originalUrls = new Map<string, string>();

for (const [path, metadata] of Object.entries(sources)) images.set(keyOf(path), metadata);
for (const [path, url] of Object.entries(originals)) originalUrls.set(keyOf(path), url);

export const businessImageNames = names;

export function businessImage(name: string): ImageMetadata {
  const image = images.get(name);
  if (!image) throw new Error(`Unknown Leo M. Suppliers photograph "${name}". Available: ${[...images.keys()].join(', ')}`);
  return image;
}

export function businessOriginal(name: string): string {
  const url = originalUrls.get(name);
  if (!url) throw new Error(`No original file for Leo M. Suppliers photograph "${name}".`);
  return url;
}
