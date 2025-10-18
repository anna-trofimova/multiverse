import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharactersPage from "./pages/CharactersPage";

const client = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharactersPage />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
