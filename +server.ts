import "./server/load";
import vike, { toFetchHandler } from "@vikejs/express";
import express from "express";
import type { Server } from "vike/types";

// The site itself is prerendered (see pages/+config.ts) and deploys as static
// files from dist/client — no server is required to serve it. This Express
// server exists for local dev/preview and as the future home of a real API
// (NestJS + Prisma + PostgreSQL are already wired up, see server/load.ts and
// DATABASE_URL); register future API middlewares in the array below.
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

function getHandler() {
  const app = express();

  vike(app, []);

  return toFetchHandler(app);
}

// https://vike.dev/server
export default {
  fetch: getHandler(),
  prod: { port },
} as Server;
