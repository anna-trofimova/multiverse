// CharactersPage that uses backend API with filters

import { useQuery, keepPreviousData } from "@tanstack/react-query"; 
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../lib/api";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import type { Character, RMPaginated } from "../lib/types";

export default function CharactersPage() {
  const [sp, setSp] = useSearchParams();

  // Read filters and page number from URL
  const page = Number(sp.get("page") || 1);
  const name = sp.get("name") || "";
  const status = sp.get("status") || "";
  const species = sp.get("species") || "";
  
  // Build a query string from current filters
  const qs = new URLSearchParams();
  qs.set("page", String(page));          
  if (name)    qs.set("name", name);
  if (status)  qs.set("status", status);
  if (species) qs.set("species", species);

  // Fetch character data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["characters", qs.toString()],
    queryFn: () => api<RMPaginated<Character>>(`/api/characters?${qs.toString()}`),
    placeholderData: keepPreviousData,
  });

  const handleFilterChange = (next: Partial<{ name: string; status: string; species: string }>) => {
    const nextSp = new URLSearchParams(sp);
    nextSp.set("page", "1");
    if (next.name !== undefined)   setOrDelete(nextSp, "name", next.name);
    if (next.status !== undefined) setOrDelete(nextSp, "status", next.status);
    if (next.species !== undefined)setOrDelete(nextSp, "species", next.species);
    setSp(nextSp);
  };

  const handlePage = (p: number) => {
    const nextSp = new URLSearchParams(sp);
    nextSp.set("page", String(p));
    setSp(nextSp);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Characters</h1>
      <Filters name={name} status={status} species={species} onChange={handleFilterChange} />

      {isLoading && <div style={{ padding: 20 }}>Loading...</div>}
      {isError && <div style={{ padding: 20, color: "crimson" }}>
        Error loading characters: {(error as any)?.message || ""}
      </div>}

      {data && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginTop: 16 }}>
            {data.results.map((c) => (
              <Link key={c.id} to={`/character/${c.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 12, background: "#fff" }}>
                  <img src={c.image} alt={c.name} style={{ width: "100%", borderRadius: 8 }} />
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>{c.species} — {c.status}</div>
                </div>
              </Link>
            ))}
          </div>
          <Pagination page={page} pages={data.info.pages} onPage={handlePage} />
        </>
      )}
    </div>
  );
}

function setOrDelete(sp: URLSearchParams, key: string, val: string) {
  if (val) sp.set(key, val);
  else sp.delete(key);
}
