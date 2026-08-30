export const STORAGE_KEY = 'jibsolar_attribution_v1';

export const ALLOWLIST = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'platform',
  'gclid',
  'fbclid',
  'fbp',
  'fbc',
  'matchtype',
  'network',
  'device',
  'keyword',
  'placement',
  'campaignid',
  'adgroupid',
] as const;

export type AllowlistedKey = (typeof ALLOWLIST)[number];

export function getAttributionFromQuery(queryString?: string): Record<string, string> {
  const query =
    typeof queryString === 'string'
      ? queryString
      : typeof window !== 'undefined'
        ? window.location.search
        : '';

  if (!query) return {};

  const params = new URLSearchParams(query);
  const result: Record<string, string> = {};

  for (const key of ALLOWLIST) {
    const val = params.get(key);
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (trimmed.length > 0) {
        result[key] = trimmed.slice(0, 200);
      }
    }
  }

  return result;
}

export function clearAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors safely
  }
}

export function getStoredAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      clearAttribution();
      return {};
    }

    const validated: Record<string, string> = {};
    for (const key of ALLOWLIST) {
      const val = parsed[key];
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed.length > 0) {
          validated[key] = trimmed.slice(0, 200);
        }
      }
    }

    return validated;
  } catch {
    clearAttribution();
    return {};
  }
}

export function saveAttribution(data: Record<string, string>): void {
  if (typeof window === 'undefined') return;

  const sanitized: Record<string, string> = {};
  for (const key of ALLOWLIST) {
    const val = data[key];
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (trimmed.length > 0) {
        sanitized[key] = trimmed.slice(0, 200);
      }
    }
  }

  if (Object.keys(sanitized).length === 0) return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  } catch {
    // Ignore storage errors safely
  }
}

export function getAttributionWithFallback(queryString?: string): Record<string, string> {
  const fromQuery = getAttributionFromQuery(queryString);
  if (Object.keys(fromQuery).length > 0) {
    return fromQuery;
  }
  return getStoredAttribution();
}

export function captureAndPersistAttribution(queryString?: string): void {
  const fromQuery = getAttributionFromQuery(queryString);
  if (Object.keys(fromQuery).length > 0) {
    saveAttribution(fromQuery);
  }
}
