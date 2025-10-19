// Pagination 

type Props = {
  page: number;
  pages: number;
  onPage: (page: number) => void;
};

export default function Pagination({ page, pages, onPage }: Props) {
  if (pages <= 1) return null;
  const prev = Math.max(1, page - 1);
  const next = Math.min(pages, page + 1);

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "16px 0" }}>
      <button disabled={page <= 1} onClick={() => onPage(prev)} style={btn}>
        ← Prev
      </button>
      <span style={{ fontSize: 13, opacity: 0.8 }}>
        Page {page} / {pages}
      </span>
      <button disabled={page >= pages} onClick={() => onPage(next)} style={btn}>
        Next →
      </button>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "white",
  cursor: "pointer"
};

