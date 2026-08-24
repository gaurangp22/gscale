import fs from "node:fs";
import path from "node:path";

const PHOTO_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

/**
 * Lists images dropped into `public/photos/<slug>/` (build-time, server only).
 * Returns [] when the folder doesn't exist yet - the carousel simply renders
 * nothing until photos are added.
 */
export function getPhotos(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "photos", slug);
  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return entries
    .filter((f) => PHOTO_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/photos/${slug}/${f}`);
}
