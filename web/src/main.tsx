import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharactersPage from "./pages/CharactersPage";
import CharacterPage from "./pages/CharacterPage";
import AnalyticsPage from "./pages/AnalyticsPage";

const client = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
        <header style={{ padding: 16, borderBottom: "1px solid #eee", display: "flex", gap: 12 }}>
          <Link to="/">Characters</Link>
          <Link to="/analytics">Analytics</Link>
      </header>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  </QueryClientProvider>
);
