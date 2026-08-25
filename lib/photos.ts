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

const TEAM_PHOTO_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

/**
 * Resolves a team portrait from `public/team/<slug>.<ext>` at build time.
 * Returns null when no file exists yet — the roster then falls back to a
 * monogram plate, so portraits can be dropped into the folder without a
 * code change; the next build picks them up.
 */
export function getTeamPhoto(slug: string): string | null {
  for (const ext of TEAM_PHOTO_EXTENSIONS) {
    const file = path.join(process.cwd(), "public", "team", `${slug}${ext}`);
    try {
      if (fs.statSync(file).isFile()) return `/team/${slug}${ext}`;
    } catch {
      /* keep looking */
    }
  }
  return null;
}
