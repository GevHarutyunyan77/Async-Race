import { API_BASE_URL } from '../constants/app';

const buildUrl = (path: string): string => `${API_BASE_URL}${path}`;

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    (error as Error & { status: number }).status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
};

export const apiGet = async <T>(path: string): Promise<{ data: T; totalCount: number | null }> => {
  const response = await fetch(buildUrl(path));
  const totalHeader = response.headers.get('X-Total-Count');
  const data = await parseResponse<T>(response);

  return {
    data,
    totalCount: totalHeader ? Number(totalHeader) : null,
  };
};

export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return parseResponse<T>(response);
};

export const apiPut = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(buildUrl(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return parseResponse<T>(response);
};

export const apiDelete = async (path: string): Promise<void> => {
  const response = await fetch(buildUrl(path), { method: 'DELETE' });
  await parseResponse<Record<string, never>>(response);
};

export const apiPatch = async <T>(path: string): Promise<T> => {
  const response = await fetch(buildUrl(path), { method: 'PATCH' });
  return parseResponse<T>(response);
};

export const apiPatchSafe = async <T>(
  path: string,
): Promise<{ ok: true; data: T } | { ok: false; status: number }> => {
  const response = await fetch(buildUrl(path), { method: 'PATCH' });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const data = (await response.json()) as T;
  return { ok: true, data };
};
