//Helper for fetching data from backend

const BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";
export async function api<T>(path:string): Promise<T> {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json() as Promise<T>;
    
}