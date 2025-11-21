import { Hono } from 'hono';
import { auth } from './lib/auth';
import { cors } from 'hono/cors';
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());
app.use(
  "/*",
  cors({
    origin: [
      'https://getalawyer-frontend.up.railway.app',
      'https://getalawyer-frontend.vercel.app',
      'http://localhost:3000',
    ],
    // origin: process.env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ['Content-Length'],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
