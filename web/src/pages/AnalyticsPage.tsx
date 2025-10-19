import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type SpeciesCount = { species: string; count: number };

export default function AnalyticsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stats", "species"],
    queryFn: () => api<SpeciesCount[]>("/api/stats/species"),
  });

  if (isLoading) return <p>Loading analytics…</p>;
  if (isError || !data) return <p>Could not load analytics.</p>;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1>Species distribution</h1>

      <div style={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="species" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <details>
        <summary>Raw data</summary>
        <table>
          <thead><tr><th>Species</th><th>Count</th></tr></thead>
          <tbody>{data.map(d => <tr key={d.species}><td>{d.species}</td><td>{d.count}</td></tr>)}</tbody>
        </table>
      </details>
    </div>
  );
}
