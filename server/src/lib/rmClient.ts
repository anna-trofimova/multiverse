// Helper to talk to the RM API.

import fetch, { RequestInit as NodeFetchInit } from 'node-fetch';

const BASE = process.env.RICK_API_BASE ?? 'https://rickandmortyapi.com/api';

export async function rmGet(path: string, init?: NodeFetchInit) {
  const res = await fetch(`${BASE}${path}`, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`RM API ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}
