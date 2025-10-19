import { Router } from "express";
import { Cache } from '../lib/cache.js';
import z from "zod";
import { rmGet } from "../lib/rmClient";
import { Character, RMPaginated } from "../types.js";


const router = Router();
const cache = new Cache<any>(Number(process.env.CACHE_TTL_MS ?? 600_000));


// ----- Query validation & normalization --------------------------------------
// Normalize: trim strings, lowercase status, treat "" as undefined.

const Query = z.object({
    page: z.string().regex(/^\d+$/).optional(),
    name: z.string().optional(),
    status: z.enum(['alive', 'dead', 'unknown']).optional(),
    species: z.string().optional()
})


//------Routers------------

router.get('/', async (req, res, next) => {
  try {
    const q = Query.parse(req.query);
    const key = `chars:${new URLSearchParams(q as any).toString()}`;
    const hit = cache.get(key); if (hit) return res.json(hit);

    const qs = new URLSearchParams(q as any).toString();
    const data = await rmGet(`/character${qs ? `?${qs}` : ''}`) as RMPaginated<Character>;
    cache.set(key, data);
    res.json(data);
  } catch (e: any) {
    if (e?.name === 'ZodError') return res.status(400).json({ error: 'Invalid query params' });
    if (e?.message?.includes('404')) return res.status(404).json({ error: 'Not found' });
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const key = `char:${id}`;
    const hit = cache.get(key); if (hit) return res.json(hit);

    const data = await rmGet(`/character/${id}`) as Character;
    cache.set(key, data);
    res.json(data);
  } catch (e: any) {
    if (e?.message?.includes('404')) return res.status(404).json({ error: 'Not found' });
    next(e);
  }
});

export const charactersRouter = router;
