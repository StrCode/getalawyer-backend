import { Hono } from 'hono';
import { auth } from './lib/auth';
import { cors } from 'hono/cors';
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: [
      'https://getalawyer-frontend.up.railway.app',
      'https://getalawyer-frontend.vercel.app',
      'http://localhost:3000',
    ],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
