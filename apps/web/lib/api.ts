const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002/api/v1';
const MEDIA_URL = API_URL.replace('/api/v1', '');

type FetchOptions = {
  token?: string | null;
  revalidate?: number | false;
};

async function apiFetch<T>(path: string, init: RequestInit = {}, opts: FetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts.token) headers['Authorization'] = `Bearer ${opts.token}`;

  const next: NextFetchRequestConfig =
    opts.revalidate === false
      ? { revalidate: 0 }
      : { revalidate: opts.revalidate ?? 60 };

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: { ...headers, ...(init.headers as Record<string, string> ?? {}) },
    next,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function apiGet<T>(path: string, opts?: FetchOptions) {
  return apiFetch<T>(path, { method: 'GET' }, opts);
}

export function apiPost<T>(path: string, body: unknown, opts?: FetchOptions) {
  return apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) }, { revalidate: false, ...opts });
}

export function apiPut<T>(path: string, body: unknown, opts?: FetchOptions) {
  return apiFetch<T>(path, { method: 'PUT', body: JSON.stringify(body) }, { revalidate: false, ...opts });
}

export function apiPatch<T>(path: string, body: unknown, opts?: FetchOptions) {
  return apiFetch<T>(path, { method: 'PATCH', body: JSON.stringify(body) }, { revalidate: false, ...opts });
}

export function apiDelete<T>(path: string, opts?: FetchOptions) {
  return apiFetch<T>(path, { method: 'DELETE' }, { revalidate: false, ...opts });
}

export async function apiUpload<T>(path: string, formData: FormData, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export { API_URL, MEDIA_URL };
