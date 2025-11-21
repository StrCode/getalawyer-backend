import { Hono } from 'hono';
import { auth } from './lib/auth';
import { cors } from 'hono/cors';
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

// app.use("*", async (c, next) => {
//   const session = await auth.api.getSession({ headers: c.req.raw.headers });
//   if (!session) {
//     c.set("user", null);
//     c.set("session", null);
//     await next();
//     return;
//   }
//   c.set("user", session.user);
//   c.set("session", session.session);
//   await next();
// });


app.use(
  "/*",
  cors({
    origin: [
      'https://getalawyer-frontend.vercel.app',
      'http://localhost:3000',
    ],
    // origin: process.env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "OPTIONS"],
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
