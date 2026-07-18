import { existsSync } from "fs";
import { join } from "path";

const EXTS = [".jpg", ".jpeg", ".png", ".webp"] as const;

/**
 * Given a public path WITHOUT an extension (e.g. "/images/cohorts/hero-cohorts"),
 * returns the first matching path found in /public with a known image extension.
 * Falls back to ".png" if nothing is found so broken-image state is visible
 * rather than a silent runtime error.
 *
 * Server-side only — uses Node fs. Never import this in a "use client" module.
 */
export function resolvePublicImage(pathWithoutExt: string): string {
  const publicDir = join(process.cwd(), "public");
  for (const ext of EXTS) {
    try {
      if (existsSync(join(publicDir, pathWithoutExt + ext))) {
        return pathWithoutExt + ext;
      }
    } catch (err) {
      console.warn(`[resolvePublicImage] fs error for ${pathWithoutExt + ext}:`, err);
    }
  }
  console.warn(`[resolvePublicImage] No image found for: ${pathWithoutExt}`);
  return pathWithoutExt + ".png";
}
