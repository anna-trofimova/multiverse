// Helper to talk to the RM API.

const BASE = process.env.RICK_API_BASE ?? "https://rickandmortyapi.com/api";

export async function rmGet(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`RM API ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}
