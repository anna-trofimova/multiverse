
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { CharacterDetail, Episode } from "../lib/types";

async function fetchEpisodesByUrls(urls: string[]): Promise<Episode[]> {
  if (!urls?.length) return [];
  const ids = urls.map(u => u.split("/").pop()).filter(Boolean).join(",");
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`);
  if (!res.ok) throw new Error("Failed to fetch episodes");
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

export default function CharacterPage() {
  const { id = "" } = useParams();

  const characterQ = useQuery({
    queryKey: ["character", id],
    queryFn: () => api<CharacterDetail>(`/api/characters/${id}`),
    enabled: !!id,
  });

  const episodesQ = useQuery({
    queryKey: ["episodes", id],
    queryFn: () => fetchEpisodesByUrls(characterQ.data?.episode ?? []),
    enabled: !!characterQ.data,
  });

  if (characterQ.isLoading) return <p>Loading character…</p>;
  if (characterQ.isError || !characterQ.data) return <p>Could not load character.</p>;
  const c = characterQ.data;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Link to="/">&larr; Back to list</Link>

      <section style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 16 }}>
        <img src={c.image} alt={c.name} width={160} height={160} style={{ borderRadius: 12 }} />
        <div>
          <h1 style={{ margin: 0 }}>{c.name}</h1>
          <p>{c.status} • {c.species}{c.type ? ` — ${c.type}` : ""}</p>
          <p><strong>Gender:</strong> {c.gender}</p>
          <p><strong>Origin:</strong> {c.origin?.name}</p>
          <p><strong>Location:</strong> {c.location?.name}</p>
        </div>
      </section>

      <section>
        <h2>Episodes</h2>
        {episodesQ.isLoading && <p>Loading episodes…</p>}
        {episodesQ.isError && <p>Could not load episodes.</p>}
        {!episodesQ.isLoading && !episodesQ.isError && (
          <ul>
            {episodesQ.data!.map(e => (
              <li key={e.id}>{e.episode} — {e.name}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
