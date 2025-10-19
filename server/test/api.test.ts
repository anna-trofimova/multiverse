import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

test("GET /health", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

test("GET /api/characters", async () => {
  const res = await request(app).get("/api/characters?page=1");
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("results");
});

test("GET /api/stats/species", async () => {
  const res = await request(app).get("/api/stats/species");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
