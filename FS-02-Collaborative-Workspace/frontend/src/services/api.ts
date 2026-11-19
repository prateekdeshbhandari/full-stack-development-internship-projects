export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}
