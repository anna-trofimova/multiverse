import express from 'express';
import cors from 'cors';
import { charactersRouter } from './routes/characters.js';
import { statsRouter } from './routes/stats.js';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use('/api/characters', charactersRouter);
  app.use('/api/stats', statsRouter);

  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}
