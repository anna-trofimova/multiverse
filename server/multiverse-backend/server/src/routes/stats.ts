import { Router } from "express";
import { Cache } from "../lib/cache.js";
import { rmGet } from "../lib/rmClient.js";

type RMCharacter = { species?: string | null };
type RMPaginated<T> = { info: { next: string | null } ; results: T[] };

const router = Router();
const cache = new Cache<any>(Number(process.env.CACHE_TTL_MS ?? 600_000));

// GET /api/stats/species
router.get("/species", async (_req, res, next) => {
  try {
    const key = "stats:species";
    const hit = cache.get(key);
    if (hit) return res.json(hit);

    let page = 1;
    let all: RMCharacter[] = [];
    // Fetch all pages sequentially 
    while (true) {
      const data = (await rmGet(`/character?page=${page}`)) as RMPaginated<RMCharacter>;
      all = all.concat(data.results || []);
      if (!data.info?.next) break;
      page++;
    }

    // Aggregate species counts defensively
    const counts = Object.values(
      all.reduce<Record<string, { species: string; count: number }>>((acc, ch) => {
        const k = (ch?.species ?? "Unknown").toString().trim() || "Unknown";
        acc[k] = acc[k] || { species: k, count: 0 };
        acc[k].count += 1;
        return acc;
      }, {})
    ).sort((a, b) => b.count - a.count);

    cache.set(key, counts);
    res.json(counts);
  } catch (e) {
    next(e);
  }
});

export const statsRouter = router;
