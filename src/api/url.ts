const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const resolvePathname = (url?: string) => {
  if (!url) {
    return '';
  }

  try {
    return new URL(url, API_BASE_URL).pathname;
  } catch {
    return url;
  }
};

export const urlMatchesAnyPath = (url: string | undefined, endpoints: readonly string[]) => {
  const pathname = resolvePathname(url);
  return endpoints.some(endpoint => pathname.endsWith(endpoint));
};
