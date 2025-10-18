import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Character, RMPaginated } from "../lib/types";

export default function CharactersPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters", "rick", "alive", 1],
    queryFn: () => api<RMPaginated<Character>>(`/api/characters?name=rick&status=alive&page=1`)
  });

  if (isLoading) return <div style={{padding:16}}>Loading…</div>;
  if (isError)   return <div style={{padding:16}}>Error loading characters</div>;

  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16,padding:16}}>
      {data!.results.map(c => (
        <div key={c.id} style={{border:"1px solid #eee",borderRadius:12,padding:12}}>
          <img src={c.image} alt={c.name} style={{width:"100%",borderRadius:8}}/>
          <div style={{marginTop:8,fontWeight:600}}>{c.name}</div>
          <div style={{fontSize:12,opacity:.7}}>{c.species} — {c.status}</div>
        </div>
      ))}
    </div>
  );
}
