// Shared allowlist for the `next` redirect param used to send a visitor
// back to the printable/guide/resources page they came from after signing
// in or up — used by the login/signup pages, the OAuth callback route, and
// the download-gate notice. Keeping it in one place avoids the client and
// server copies drifting apart.

const SAFE_NEXT_PREFIXES = ["/resources", "/printables", "/guides"];

export function isSafeResourceNext(path: string | null | undefined): path is string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return false;
  return SAFE_NEXT_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(`${prefix}?`)
  );
}
