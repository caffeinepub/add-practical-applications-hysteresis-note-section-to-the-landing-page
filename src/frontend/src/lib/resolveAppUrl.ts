/**
 * Resolves a relative asset path to a full URL using the app's base URL.
 * Preserves already-absolute URLs (http/https).
 */
export function resolveAppUrl(path: string): string {
  // If already absolute (http/https), return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Get the base URL from Vite's environment
  const baseUrl = import.meta.env.BASE_URL || '/';

  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Ensure base URL ends with slash
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${cleanBase}${cleanPath}`;
}
