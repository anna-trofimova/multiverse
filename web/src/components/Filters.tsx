// Filters that controls for name/status/species.
import { useEffect, useMemo, useState } from "react";

type Props = {
  name: string;
  status: string;   
  species: string;
  onChange: (p: Partial<{ name: string; status: string; species: string }>) => void;
};

export default function Filters({ name, status, species, onChange }: Props) {
  const [nameInput, setNameInput] = useState(name);

  // Wait 300ms after typing before triggering a fetch
  useEffect(() => {
    const t = setTimeout(() => {
      if (nameInput !== name) onChange({ name: nameInput.trim() });
    }, 300);
    return () => clearTimeout(t);
  }, [nameInput, name, onChange]);

  const STATUS = useMemo(() => ["", "alive", "dead", "unknown"], []);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <input
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        placeholder="Search by name…"
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd", minWidth: 220 }}
      />
      <select
        value={status}
        onChange={(e) => onChange({ status: e.target.value })}
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
      >
        {STATUS.map((s) => (
          <option key={s} value={s}>
            {s ? s : "any status"}
          </option>
        ))}
      </select>
      <input
        value={species}
        onChange={(e) => onChange({ species: e.target.value.trim() })}
        placeholder="Species (e.g. Human)"
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd", minWidth: 180 }}
      />
    </div>
  );
}
